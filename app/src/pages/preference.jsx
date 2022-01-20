import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import { faCopyright, faPaintRoller } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ThemedHeader, ThemedPrimaryButton, ThemedSecondarySimpleButton } from '../components/styled';

import { ThemedCard } from '../components/styled';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-force-tabpanel-${index}`}
            aria-labelledby={`scrollable-force-tab-${index}`}
            className="p-1 w-full h-full"
            {...other}
        >
            {value === index && (
                <Box p={3} className='w-full h-full'>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-force-tab-${index}`,
        'aria-controls': `scrollable-force-tabpanel-${index}`,
    };
}


function Preference(props) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className='w-full h-full'>
            <ThemedHeader>
                <h1>
                    Preferences
                    <span>Setup you branding and themeting</span>
                </h1>
            </ThemedHeader>
            <ThemedCard className='p-1 w-full h-full'>
                <div className='p-1 w-full h-full'>
                    <AppBar position="static" color="default">
                        <Tabs
                            value={value}
                            inkBarStyle={{ background: 'blue' }}
                            onChange={handleChange}
                            variant="scrollable"
                            scrollButtons="on"
                            indicatorColor="primary"
                            textColor="primary"
                            aria-label="scrollable force tabs example"
                        >
                            <Tab label="Branding" icon={<FontAwesomeIcon icon={faCopyright} />} />
                            <Tab label="Themes" icon={<FontAwesomeIcon icon={faPaintRoller} />} />
                        </Tabs>
                    </AppBar>
                    <TabPanel value={value} index={0}>
                        Item One
        </TabPanel>
                    <TabPanel value={value} index={1}>
                        Item Two
        </TabPanel>
                </div>
            </ThemedCard>

        </div>
    );
}


const mapStateToProps = (state) => {
    return {
        user: state.userReducer.user
    }
}

export default connect(mapStateToProps)(Preference);