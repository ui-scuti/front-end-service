
import React, { useEffect, useState } from "react";
import './timeline.css';
import Chart from "react-apexcharts";
import moment from 'moment';


function Timeline(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const series = [];
    if (props.data && props.data.length) {
      props.data.forEach((d) => {
        if (d.endDate) {
          const co = d;
          const user = co.userid;
          const psObject = series.filter((f) => { return f.name === user });
          let sObject = {};
          let found = false;
          if (psObject && psObject.length) {
            sObject = psObject[0];
            found = true;
          } else {
            sObject = {}
          }
          sObject.data = sObject.data || [];
          const startY = moment(co.startDate).unix();
          const endY = moment(co.endDate).unix();

          sObject.data.push({
            x: co.title,
            y: [
              startY,
              endY,
            ]
          })
          if (!found) {
            sObject.name = user;
            series.push(sObject);
          }
        }
      })
      setData(series);
      setLoading(false);
    }
  }, [props.data]);

  const config = {

    series: [
      {
        name: 'Bob',
        data: [
          {
            x: 'Design',
            y: [
              new Date('2019-03-05').getTime(),
              new Date('2019-03-08').getTime()
            ]
          },
          {
            x: 'Code',
            y: [
              new Date('2019-03-02').getTime(),
              new Date('2019-03-05').getTime()
            ]
          },
          {
            x: 'Code',
            y: [
              new Date('2019-03-05').getTime(),
              new Date('2019-03-07').getTime()
            ]
          },
          {
            x: 'Test',
            y: [
              new Date('2019-03-03').getTime(),
              new Date('2019-03-09').getTime()
            ]
          },
          {
            x: 'Test',
            y: [
              new Date('2019-03-08').getTime(),
              new Date('2019-03-11').getTime()
            ]
          },
          {
            x: 'Validation',
            y: [
              new Date('2019-03-11').getTime(),
              new Date('2019-03-16').getTime()
            ]
          },
          {
            x: 'Design',
            y: [
              new Date('2019-03-01').getTime(),
              new Date('2019-03-03').getTime()
            ]
          }
        ]
      },
      {
        name: 'Joe',
        data: [
          {
            x: 'Design',
            y: [
              new Date('2019-03-02').getTime(),
              new Date('2019-03-05').getTime()
            ]
          },
          {
            x: 'Test',
            y: [
              new Date('2019-03-06').getTime(),
              new Date('2019-03-16').getTime()
            ]
          },
          {
            x: 'Code',
            y: [
              new Date('2019-03-03').getTime(),
              new Date('2019-03-07').getTime()
            ]
          },
          {
            x: 'Deployment',
            y: [
              new Date('2019-03-20').getTime(),
              new Date('2019-03-22').getTime()
            ]
          },
          {
            x: 'Design',
            y: [
              new Date('2019-03-10').getTime(),
              new Date('2019-03-16').getTime()
            ]
          }
        ]
      },
      {
        name: 'Dan',
        data: [
          {
            x: 'Code',
            y: [
              new Date('2019-03-10').getTime(),
              new Date('2019-03-17').getTime()
            ]
          },
          {
            x: 'Validation',
            y: [
              new Date('2019-03-05').getTime(),
              new Date('2019-03-09').getTime()
            ]
          },
        ]
      }
    ],
    options: {
      chart: {
        height: 450,
        type: 'rangeBar',
        toolbar: {
          show: false
        }
      },
      grid: {
        show: false
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: '80%'
        }
      },
      xaxis: {
        type: 'datetime'
      },
      stroke: {
        width: 1
      },
      fill: {
        type: 'solid',
        opacity: 0.6
      },
      legend: {
        show: false,
        position: 'top',
        horizontalAlign: 'left'
      }
    },


  };
  return (
    <> {
      loading ? (null) : (
        <Chart
          options={config.options} series={data} type="rangeBar" height={250}
        />)
    }
    </>


  );
}

export default Timeline;
