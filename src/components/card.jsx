import * as _ from "lodash";
import * as request from "../services/request";

import { BuildingService, LocalStorage } from "../services";
import {
  ButtonHighlight,
  ButtonLink,
  ThemedMenu,
  ThemedVerticalDivider,
  ToolbarButton,
} from "../styles";
import { Divider, MenuItem } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import {
  faArrowsAlt,
  faBan,
  faBars,
  faCircle,
  faSortNumericDown,
  faSortNumericUp,
  faSyncAlt,
  faTimes,
  faTint,
  faTintSlash,
} from "@fortawesome/free-solid-svg-icons";

import { Card } from "react-bootstrap";
import { Dashlets } from "../dashlets";
import FilterDialog from "./filter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MainSpinner from "./main-spinner";
import NoDataTemplate from "./no-data";
import { StorageKeys } from "../constants";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { withTranslation } from "react-i18next";

const ThemedCard = styled(Card)`
  background-image: linear-gradient(to right, ${({ theme }) =>
    theme.colors.card.start}, ${({ theme }) =>
  theme.colors.card.end}) !important;
  border: thin solid;
  background: transparent;
  border-radius: 8px;
  height: 100%;
  width: 100%;
  border-color: ${({ theme }) => theme.colors.card.border} !important;
  -webkit-box-shadow:: 0px 1px 14px -8px  ${({ theme }) =>
    theme.colors.card.shadow};
  -moz-box-shadow: 0px 1px 14px -8px ${({ theme }) => theme.colors.card.shadow};
  box-shadow: 0px 1px 14px -8px ${({ theme }) => theme.colors.card.shadow};
`;

const CardTitle = styled(Card.Title)`
  color: ${({ theme }) => theme.colors.card.title} !important;
  font-weight: 300;
  font-size: 15px;
  margin: 8px;
`;

const areEqual = (prevProps, nextProps) => {
  const eq = _.isEqual(prevProps, nextProps);
  return eq;
};

// eslint-disable-next-line react/display-name
const CardBoxWOT = React.memo((props) => {
  const [conf] = useState(props.conf);
  const [loading, setLoading] = useState(true);
  const [localFilter, setFilter] = useState();
  const [error, setError] = useState();
  const [currentElement, setCurrentElement] = useState();
  const [noData, setNoData] = useState(false);
  const [contentEditable, setContentEditable] = useState(false);
  const [anchorSortEl, setAnchorSortEl] = React.useState(null);
  const [anchorTopEl, setAnchorTopEl] = React.useState(null);
  const [localViewOptions, setLocalViewOptions] = useState({});

  const { t } = props;

  const history = useHistory();

  const style = {
    grab: {
      cursor: "move",
    },
  };

  const getLocalTag = () => {
    const STORAGE_KEY = `${StorageKeys.TYPE_TAGS}_${props.buildingSelection.site}_${props.buildingSelection.building}`;
    return LocalStorage.getFromLocalStorage(STORAGE_KEY, true);
  };

  const getInitialTypeTags = () => {
    let sTags = getLocalTag();
    if (sTags) {
      sTags = JSON.parse(sTags);
    }
    return sTags;
  };

  const getType = () => {
    if (getLocalTag()) {
      return { type: "pt", tags: getInitialTypeTags() };
    }
    if (conf.toolbar.typeSelector) {
      return conf.toolbar.typeSelector;
    }
    return { type: "fl", tags: [] };
  };

  const getFilter = () => {
    const filter = {};
    if (conf.toolbar) {
      if (conf.toolbar.floorSelector) {
        filter.floor = BuildingService.getZones(
          props.buildingSelection.site,
          props.buildingSelection.building
        )[0];
      }
      if (conf.toolbar.typeSelector) {
        filter.type = conf.toolbar.typeSelector ? getType() : undefined;
        filter.ANDing = conf.toolbar.typeSelector.defaultAND || false;
      }
      if (conf.toolbar.dateRangeSelector) {
        filter.date = { ...conf.toolbar.dateRangeSelector };
      }
      if (conf.toolbar.tagSelector) {
        filter.tags = getInitialTags(conf.toolbar.tagSelector);
        // if (conf.toolbar.tagSelector.defaultAND) {
        filter.ANDing = conf.toolbar.tagSelector.defaultAND || false;
        // }
      }
      if (conf.toolbar.topNSelector) {
        if (
          conf.toolbar.topNSelector.value &&
          conf.toolbar.topNSelector.value.length
        ) {
          filter.topN = conf.toolbar.topNSelector.value;
        }
        if (
          conf.toolbar.topNSelector.range &&
          conf.toolbar.topNSelector.range.length
        ) {
          filter.topRange = conf.toolbar.topNSelector.range;
        }
      }
    }
    // TODO : Keeping below snippet for reference until we feel the above object preparation is absolute
    // {
    //   type: conf.toolbar.typeSelector ? getType() : undefined,
    //   date: { ...conf.toolbar.dateRangeSelector },
    //   tags: getInitialTags(conf.toolbar.tagSelector),
    //   topN: !conf.toolbar.topNSelector || !conf.toolbar.topNSelector.value.length ? [] : conf.toolbar.topNSelector.value,
    //   topRange: !conf.toolbar.topNSelector || !conf.toolbar.topNSelector.range.length ? [] : conf.toolbar.topNSelector.range,
    //   ANDing: conf.toolbar.tagSelector ? (conf.toolbar.tagSelector.defaultAND || false) : conf.toolbar.typeSelector ? (conf.toolbar.typeSelector.defaultAND || false) : false,
    //   floor: BuildingService.getZones(props.buildingSelection.site, props.buildingSelection.building)[0]
    // };
    return filter;
  };

  useEffect(() => {
    if (
      (!props.filter || !_.isEqual(props.filter, localFilter)) &&
      !props.loading
    ) {
      let fl = props.filter;
      if (conf.toolbar) {
        if (!fl) {
          fl = getFilter();
        }
        setFilter(_.clone(fl));
      }
      if (fl || !conf.toolbar) {
        loadData(fl);
      }
    }
  }, [props.filter, props.buildingSelection]);

  const getInitialTags = (tagselector) => {
    if (!tagselector) {
      return undefined;
    }
    if (tagselector.defaultAllSelected) {
      if (!props.buildingSelection.site || !props.buildingSelection.building) {
        return "";
      }
      return BuildingService.getTags(
        props.buildingSelection.site,
        props.buildingSelection.building
      )
        .map((tag) => {
          return tag.tagName;
        })
        .join(",");
    }
    if (!tagselector.value || !tagselector.value.length) {
      return [];
    }
    return tagselector.value;
  };

  const getData = (inFilter, viewoptions) => {
    return request.submit(
      "data",
      props.module,
      conf.dataurl.node,
      conf.dataurl.action,
      {},
      {
        site: props.buildingSelection.site,
        building: props.buildingSelection.building,
        startdate: getDate("start", inFilter),
        enddate: getDate("end", inFilter),
        filter: inFilter,
        viewoptions: viewoptions,
      }
    );
  };
  const loadData = (inFilter, viewoptions) => {
    setError();
    setLoading(true);

    if (!conf.dataurl) {
      setLoading(false);
      // console.log('Empty');
      setCurrentElement(getElement(conf.name, {}, conf));
    } else if (props.buildingSelection.building) {
      if (inFilter || !conf.toolbar) {
        getData(inFilter, viewoptions)
          .then((res) => {
            if (!res) {
              res = { noData: true };
            }
            setNoData(res.noData);
            // console.log('Has data', res, conf.name);
            setCurrentElement(getElement(conf.name, res, conf));
          })
          .catch((err) => {
            if (err != null && err.message != null) {
              setError(err.message);
            }
          })
          .finally(() => {
            setLoading(false);
          });

        if (conf.autoRefresh) {
          // clearTimeout(
          //   JSON.parse(
          //     LocalStorage.getFromLocalStorage(`${conf.id}_timeoutId`)
          //   )
          // );
          // clearTimeout(interval);
          // LocalStorage.removeFromLocalStorage(`${conf.id}_timeoutId`);
          // var interval = setTimeout(
          //   loadData,
          //   conf.autoRefresh.interval * 1000,
          //   inFilter
          // );
          // LocalStorage.saveInLocalStorage(
          //   `${conf.id}_timeoutId`,
          //   interval
          // );
          // return () => {
          //   clearTimeout(interval);
          // };

          setTimeout(loadData, conf.autoRefresh.interval * 1000, inFilter);
        }
      }
    }
  };

  const getDate = (key, fil) => {
    if (!props.conf.toolbar || !props.conf.toolbar.dateRangeSelector) {
      return undefined;
    }

    if (fil && fil.date) {
      // return typeof fil.date[key] === 'string' ? new Date(fil.date[key]) : fil.date[key];
      return fil.date[key];
    }
    if (conf.toolbar && conf.toolbar.dateRangeSelector) {
      return conf.toolbar.dateRangeSelector[key];
    }
    return undefined;
  };

  const onDateSelectionChanged = (selection) => {
    // filter.date.start = selection[0];
    // filter.date.end = selection[1];
    // setFilter(filter);
    const fl = {
      ...localFilter,
      date: {
        start: selection.value[0],
        end: selection.value[1],
        hideCalendar: localFilter.date.hideCalendar,
      },
    };
    if (!loading) {
      setFilter(fl);
      loadData(fl);
    }
    filterChanged(fl);
  };

  const refreshData = (viewoptions) => {
    loadData(localFilter, viewoptions || localViewOptions);
  };

  const onTypeChanged = (selection) => {
    const fl = {
      ...localFilter,
      type: {
        type: selection.category,
        tags: selection.tags.join(","),
      },
      ANDing: selection.ANDing,
    };
    if (!loading) {
      setFilter(fl);
      loadData(fl);
    }
    filterChanged(fl);
  };

  const tagSelectionChanged = (tags) => {
    const fl = {
      ...localFilter,
      tags: tags.tags ? tags.tags : [],
      ANDing: tags.ANDing,
    };
    if (!loading) {
      setFilter(fl);
      loadData(fl);
    }
    filterChanged(fl);
  };

  const floorSelectionChanged = (floor) => {
    const fl = _.clone(localFilter);
    fl.floor = floor;
    setFilter(fl);
    loadData(fl);
  };

  const topNSelectionChanged = (tags) => {
    const fl = {
      ...localFilter,
      topN: tags.topN
        ? tags.topN
            .filter((n) => {
              return n.selected;
            })
            .map((n) => {
              return n.n;
            })
        : [],
    };
    if (!loading) {
      setFilter(fl);
      loadData(fl);
    }
    filterChanged(fl);
  };

  const handleTopMentuClicked = (event) => {
    setAnchorTopEl(event ? event.currentTarget : null);
  };

  const handleSortMentuClicked = (event) => {
    setAnchorSortEl(event ? event.currentTarget : null);
  };

  const updateViewOptions = (data, closeCallBack) => {
    const vo = { ...localViewOptions, ...data };
    setLocalViewOptions(vo);
    closeCallBack(null);
    refreshData(vo);
  };

  const getViewOptions = (viewoptions, conf) => {
    const res = [];
    if (viewoptions.sort) {
      res.push(
        <React.Fragment key={`${Math.random()}`}>
          <ToolbarButton
            variant="flat"
            onClick={(e) => handleSortMentuClicked(e)}
          >
            <FontAwesomeIcon
            title="Sorting"
              icon={localViewOptions.sort ? faTint : faTintSlash}
            />
          </ToolbarButton>
          <ThemedMenu
            id="simple-menu"
            anchorEl={anchorSortEl}
            keepMounted
            open={Boolean(anchorSortEl)}
            onClose={() => handleSortMentuClicked(null)}
          >
            <MenuItem
              onClick={() =>
                updateViewOptions({ sort: "asc" }, handleSortMentuClicked)
              }
            >
              <span className="icon-with-text">
                <FontAwesomeIcon icon={faSortNumericDown} /> Ascending
              </span>
            </MenuItem>
            <MenuItem
              onClick={() =>
                updateViewOptions({ sort: "desc" }, handleSortMentuClicked)
              }
            >
              <span className="icon-with-text">
                <FontAwesomeIcon icon={faSortNumericUp} /> Descending
              </span>
            </MenuItem>
            <Divider />
            <MenuItem
              onClick={() =>
                updateViewOptions({ sort: undefined }, handleSortMentuClicked)
              }
            >
              <span className="icon-with-text">
                <FontAwesomeIcon icon={faBan} /> Reset
              </span>
            </MenuItem>
          </ThemedMenu>
        </React.Fragment>
      );
    }
    if (viewoptions.top) {
      res.push(
        <React.Fragment key={`${Math.random()}`}>
          <ToolbarButton
            variant="flat"
            title="Show Top count"
            onClick={(e) => handleTopMentuClicked(e)}
          >
            {localViewOptions.top || "N/A"}
          </ToolbarButton>
          <ThemedMenu
            id="simple-menu"
            anchorEl={anchorTopEl}
            keepMounted
            open={Boolean(anchorTopEl)}
            onClose={() => handleTopMentuClicked(null)}
          >
            {viewoptions.top.map((t, ti) => {
              return (
                <MenuItem
                  key={ti}
                  onClick={() =>
                    updateViewOptions({ top: t }, handleTopMentuClicked)
                  }
                >
                  <span className="icon-with-text">
                    <FontAwesomeIcon icon={faCircle} />
                    Top {t}
                  </span>
                </MenuItem>
              );
            })}

            <Divider />
            <MenuItem
              onClick={() =>
                updateViewOptions({ top: undefined }, handleTopMentuClicked)
              }
            >
              <span className="icon-with-text">
                <FontAwesomeIcon icon={faBan} />
                Reset
              </span>
            </MenuItem>
          </ThemedMenu>
        </React.Fragment>
      );
    }

    if (res.length) {
      res.push(<ThemedVerticalDivider key={`${Math.random()}`} />);
    }
    return res;
  };

  const getFilterComponent = (conf) => {
    if (conf.hideFilter) {
      return <></>;
    }
    return (
      <FilterDialog
        title={`Filter : ${conf.title}`}
        tagselector={{
          key: `ts_${conf.id}`,
          id: `ts_${conf.id}`,
          sourceType: "building",
          showCategory: false,
          showLabel: false,
          defaultAllSelected:
            conf && conf.toolbar && conf.toolbar.tagSelector
              ? !conf.toolbar.tagSelector.disableAllSelect
              : false,
          enableAndOr:
            conf && conf.toolbar && conf.toolbar.tagSelector
              ? conf.toolbar.tagSelector.enableAndOr
              : false,
          selectedTags: localFilter && localFilter.tags ? localFilter.tags : [],
          selectedTagging:
            (localFilter ? localFilter.ANDing : false) ||
            (conf && conf.toolbar && conf.toolbar.tagSelector
              ? conf.toolbar.tagSelector.defaultAND || false
              : false),
          noUpdateOnLoad: true,
          onChange: tagSelectionChanged,
          site: props.buildingSelection.site,
          building: props.buildingSelection.building,
          ANDing:
            conf.toolbar && conf.toolbar.tagSelector
              ? conf.toolbar.tagSelector.defaultAND || false
              : false,
          enable: conf.toolbar && conf.toolbar.tagSelector ? true : false,
        }}
        typeselector={{
          key: `tys_${conf.id}`,
          id: `tys_${conf.id}`,
          name: `tys_${conf.id}`,
          tmpid: `tys_${conf.id}`,
          selectedTags: _.clone(
            localFilter
              ? localFilter.type
              : conf.toolbar && conf.toolbar.typeSelector
              ? conf.toolbar.typeSelector
              : {}
          ),
          showCategory: true,
          sourceType: "building",
          showLabel: true,
          selectedTagging:
            (localFilter ? localFilter.ANDing : false) ||
            (conf && conf.toolbar && conf.toolbar.typeSelector
              ? conf.toolbar.typeSelector.defaultAND || false
              : false),
          enableAndOr:
            conf && conf.toolbar && conf.toolbar.typeSelector
              ? conf.toolbar.typeSelector.enableAndOr
              : false,
          tags: localFilter && localFilter.type ? localFilter.type.tags : [],
          onChange: onTypeChanged,
          site: props.buildingSelection.site,
          defaultAllSelected: false,
          building: props.buildingSelection.building,
          ANDing:
            conf.toolbar && conf.toolbar.typeSelector
              ? conf.toolbar.typeSelector.defaultAND || false
              : false,
          enable: conf.toolbar && conf.toolbar.typeSelector ? true : false,
        }}
        topnselector={{
          key: `tn_${conf.id}`,
          id: `tn_${conf.id}`,
          selectedNums: localFilter && localFilter.topN ? localFilter.topN : [],
          selectionRange:
            localFilter && localFilter.topRange ? localFilter.topRange : [],
          noUpdateOnLoad: true,
          showLabel: false,
          labelText:
            conf.toolbar &&
            conf.toolbar.topNSelector &&
            conf.toolbar.topNSelector.labelText
              ? conf.toolbar.topNSelector.labelText
              : "",
          onChange: topNSelectionChanged,
          enable: conf.toolbar && conf.toolbar.topNSelector ? true : false,
        }}
        daterangeselector={{
          daterange: true,
          start:
            localFilter && localFilter.date && localFilter.date.start
              ? localFilter.date.start
              : conf.toolbar && conf.toolbar.dateRangeSelector
              ? conf.toolbar.dateRangeSelector.start
              : new Date(),
          end:
            localFilter && localFilter.date && localFilter.date.end
              ? localFilter.date.end
              : conf.toolbar && conf.toolbar.dateRangeSelector
              ? conf.toolbar.dateRangeSelector.end
              : new Date(),
          hideCalendar:
            localFilter && localFilter.date && localFilter.date.hideCalendar
              ? localFilter.date.hideCalendar
              : false,
          onChange: (selection) => onDateSelectionChanged(selection),
          enable: conf.toolbar && conf.toolbar.dateRangeSelector ? true : false,
        }}
        custombutton={{
          key: `cb_${conf.id}`,
          site: props.buildingSelection.site,
          building: props.buildingSelection.building,
          buttonText:
            conf.toolbar && conf.toolbar.customButton
              ? conf.toolbar.customButton.buttonText
              : "",
          filter: localFilter,
          module: props.module,
          enable: conf.toolbar && conf.toolbar.customButton ? true : false,
        }}
        floorselector={{
          key: `bs_${conf.id}`,
          noUpdateOnLoad: true,
          onChange: floorSelectionChanged,
          byDefault:
            conf.toolbar && conf.toolbar.floorSelector
              ? conf.toolbar.floorSelector.byDefault - 1
              : 0,
          floorId: localFilter && localFilter.floor ? localFilter.floor.id : 0,
          site: props.buildingSelection.site,
          building: props.buildingSelection.building,
          enable: conf.toolbar && conf.toolbar.floorSelector ? true : false,
        }}
      />
    );
  };

  const getElement = (name, data, conf) => {
    const DashletComp = Dashlets[name];
    // return React.createElement(DashletComp, { ...props})
    return React.createElement(DashletComp, {
      conf: conf,
      data: data,
      buildingSelection: props.buildingSelection,
      module: props.module,
    });
  };

  const showDetails = () => {
    history.push(getAbsoluteDetailsUrl());
  };

  const getAbsoluteDetailsUrl = () => {
    const fieldMap = {
      START_DATE: "date.start",
      END_DATE: "date.end",
      TAGS: "tags",
      TYPE_TAG: "type.tags",
      SITE: "site",
      BUILDING: "building",
      TYPE: "type.type",
      LIVE: "live",
    };

    let templateUrl = `/${props.module}${conf.detailsurltemplate}`;
    Object.keys(fieldMap).forEach((k) => {
      let val = _.get(localFilter, fieldMap[k]);
      if (!val) val = _.get(props.buildingSelection, fieldMap[k]);
      templateUrl = templateUrl.replace(k, val);
    });
    return templateUrl;
  };

  const onClosePressed = () => {
    if (props.onClose) {
      props.onClose(conf.i || conf.id);
    }
  };

  const filterChanged = (fl) => {
    if (props.onFilterChange) {
      props.onFilterChange(conf.i || conf.id, fl);
    }
  };

  const makeEditable = () => {
    setContentEditable(true);
  };

  const Exit = () => {
    setContentEditable(false);
    if (props.onClick) {
      props.onClick(
        conf.i || conf.id,
        document.getElementById(conf.id).innerText
      );
    }
  };

  const convertToCamelCase = (text) => {
    //converting labeltext to camelcase
    if (text == null) return ""; //to check against undefined error
    var str = text.split(" "); //splitting the label
    str[0] = str[0].toLowerCase(); //making first word lowercase
    //console.log("ERROR MAIN2: "+str.join(""))
    return str.join(""); //joining and returning camelCase label
  };

  const translateAndSendError = (error) => {
    if (error) {
      // if(i18next.language!='en'&&i18next.language!='en-US')
      return t(
        `common:errormessages.${convertToCamelCase(error.toString())}`,
        error
      );
    }
    return `${t(`common:errormessages.no`, "No")} ${t(
      `common:module.${props.module}.${conf.name}.title`,
      conf.title
    )} ${t(`common:errormessages.dataAvailable`, "data available")}`;
  };

  return (
    <ThemedCard className="dashlet-border">
      <CardTitle>
        <div style={{ display: "flex" }}>
          <div style={{ flex: 1 }} className="form-inline">
            <div
              id={conf.id}
              contentEditable={contentEditable && conf.titleEditable}
              onMouseDown={() => makeEditable()}
            >
              {conf.title}
            </div>
            <ButtonHighlight
              hidden={!(contentEditable && conf.titleEditable)}
              onClick={(e) => Exit(e)}
              style={{ paddingLeft: "10px" }}
            >
              Save
            </ButtonHighlight>
            <div style={{ display: "inline-flex", paddingLeft: "16px" }}>
              {/* {getFilters()} */}
            </div>
          </div>

          <div key={`${Math.random()}`}>
            {conf.showViewOptions && getViewOptions(conf.showViewOptions, conf)}
            {getFilterComponent(conf)}
            <ToolbarButton title="Refresh" onClick={() => refreshData()} variant="flat">
              <FontAwesomeIcon icon={faSyncAlt} />
            </ToolbarButton>
            {conf.showDetails && (
              <ButtonLink variant="flat" onClick={() => showDetails()}>
                <FontAwesomeIcon icon={faBars} />
              </ButtonLink>
            )}
            {!conf.static && (
              <ToolbarButton
                variant="flat"
                title="Drag and Drop"
                className="drag-handle"
                style={style.grab}
              >
                <FontAwesomeIcon icon={faArrowsAlt} />
              </ToolbarButton>
            )}
            {props.closable && conf.closable && !conf.static && (
              <ToolbarButton onClick={() => onClosePressed()} variant="flat">
                <FontAwesomeIcon title="Delete" icon={faTimes} />
              </ToolbarButton>
            )}
          </div>
        </div>
      </CardTitle>
      <Card.Body
        style={{
          overflowX: "hidden",
          overflowY: `${conf.fixedsize ? "hidden" : "auto"}`,
        }}
      >
        {loading && (
          <MainSpinner
            size="lg"
            text={`${t(`common:basic.loading`, "Loading")} ${t(
              `common:module.${props.module}.${conf.name}.title`,
              conf.title
            )} ${t(`common:basic.data`, "data")}`}
          />
        )}
        {!loading && (noData || error) && (
          <NoDataTemplate text={translateAndSendError(error)} />
        )}
        {!loading && !noData && !error && currentElement}
      </Card.Body>
    </ThemedCard>
  );
}, areEqual);

const CardBox = withTranslation("common")(CardBoxWOT);
export default CardBox;
