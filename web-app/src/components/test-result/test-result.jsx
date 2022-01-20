import React, { useEffect, useState } from 'react';
import Chart from "react-apexcharts";
import styled, { css } from 'styled-components';

const selectionStyle = css`
    font-weight: 700;
    color: rgb(78, 154, 241) !important;
  `;

const ChartButton = styled.button`
  border: none;
  text-align: left;
  margin: 0 10px;
  :active,:focus {
      outline: none;
  };
  ${props => props.selected && selectionStyle}
  `;
const ButtonContainer = styled.div`
        flex: 1;
    `;

const TestResult = (props) => {


  const chartData = {
    series: [2, 4],
    options: {
      chart: {
        width: 380,
        type: 'donut',
        animations: {
          enabled: true,
          easing: 'linear',
          speed: 1000,
          animateGradually: {
            enabled: false,
            delay: 5
          },
          dynamicAnimation: {
            enabled: false,
            speed: 850
          }
        }

      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 270,
          donut: {
            size: '85%',
            labels: {
              show: false
            }
          }
        }
      },
      dataLabels: {
        enabled: false
      },
      fill: {
        type: 'gradient',
      },
      tooltip: {
        style: {
          fontSize: '12px',
          color: '#AAA',
          fontFamily: undefined
        },
        enabled: true,
      },
      colors: [
        '#228B22',
        '#ff2c0f'
      ],
      labels: ['Passed', 'Failed'],
      dataLabels: {
        enabled: false,
        value: {
          color: '#AAA',
          fontSize: '36px',
          show: false,
        }
      },
      legend: {
        show: true,
        labels: {
          colors: '#787878',
          useSeriesColors: false
        },
        formatter: function (seriesName, opts) {
          return [seriesName, " - ", opts.w.globals.series[opts.seriesIndex]]
        },
        offsetX: -20,
        offsetY: 30,
        markers: {
          width: 20,
          height: 5,
          strokeWidth: 0,
          strokeColor: '#fff',
          fillColors: undefined,
          radius: 0,
          customHTML: undefined,
          onClick: undefined,
          offsetX: 0,
          offsetY: 0
        },
      },
      stroke: {
        show: true,
        curve: 'smooth',
        colors: 'transparent',
        width: 2,
        dashArray: 0,
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    },


  };


  return (
    <div style={{ height: '100%', width: '100%', display: 'flex', displayDirection: 'row' }}>
      <div style={{ width: '100%' }}>
        <Chart
          options={chartData.options} series={[props.success, props.failure]} type="donut" height={'90%'}
        />
      </div>
    </div>

  )
}

export default TestResult;