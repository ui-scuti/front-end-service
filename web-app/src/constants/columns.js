export const Columns = [
    {
        field: 'ts',
        header: 'Timestamp',
        visible: ['event','schedule'],
        sortable: true
    },
    {
        field: 'buildingName',
        header: 'Building',
        filterable: true,
        sortable: true,
        visible: ['live', 'trend','event','schedule','levelOneTwo','levelTwoThree','levelOneThree','allLevels']
    },{
        field: 'roomName',
        header: 'Room Name',
        filterable: true,
        sortable: true,
        visible: ['live', 'trend','event','schedule']
    },{
        field: 'zoneName',
        header: 'Zone Name',
        filterable: true,
        sortable: true,
        visible: ['live', 'trend','event','schedule']
    },{
        field: 'levelOneTag',
        header: 'Criteria 1',
        visible: ['levelOneTwo','levelOneThree','allLevels'],
        sortable: true
    },{
        field: 'levelTwoTag',
        header: 'Criteria 2',
        visible: ['levelOneTwo','levelTwoThree','allLevels'],
        sortable: true
    },{
        field: 'levelThreeTag',
        header: 'Criteria 3',
        visible: ['levelOneThree','levelTwoThree','allLevels'],
        sortable: true
    }, {
        field: 'totalAssets',
        header: 'Total Assets',
        visible: ['levelOneTwo','levelTwoThree','levelOneThree','allLevels'],
        sortable: true
    }, {
        field: 'pointValue',
        header: 'Live',
        visible: ['live'],
        sortable: true,
        template: {
            name: 'live'
        }
    }, {
        field: 'percentage',
        header: 'Occupancy',
        visible: ['trend'],
        sortable: true,
        template: {
            name: 'percentage'
        }
    }, {
        field: 'totalOccupiedMinutes',
        header: 'Occupied',
        visible: ['trend'],
        sortable: true,
        template: {
            name: 'minutes'
        }
    }, {
        field: 'totalMinutes',
        header: 'Total',
        visible: ['trend'],
        sortable: true,
        template: {
            name: 'minutes'
        }
    }, {
        field: 'avgUtilPercentage',
        header: 'Avg. Utilization(%)',
        visible: ['levelOneTwo','levelTwoThree','levelOneThree','allLevels'],
        sortable: true,
        template: {
            name: 'percentage'
        }
    }, {
        field: 'peakUtilPercentage',
        header: 'Peak Utilization(%)',
        visible: ['levelOneTwo','levelTwoThree','levelOneThree','allLevels'],
        sortable: true,
        template: {
            name: 'percentage'
        }
    }, {
        field: 'peakUtilDay',
        header: 'Peak Utilization %(Day)',
        visible: ['levelOneTwo','levelTwoThree','levelOneThree','allLevels'],
        sortable: true
    }, {
        field: 'avgOccupied',
        header: 'Avg. Assets Occupied',
        visible: ['levelOneTwo','levelTwoThree','levelOneThree','allLevels'],
        sortable: true
    }, {
        field: 'peakOccupiedAssetCount',
        header: 'Max. Assets Occupied',
        visible: ['levelOneTwo','levelTwoThree','levelOneThree','allLevels'],
        sortable: true
    }, {
        field: 'peakOccupiedDay',
        header: 'Max. Assets Occupied(Day)',
        visible: ['levelOneTwo','levelTwoThree','levelOneThree','allLevels'],
        sortable: true
    }, {
        field: 'temperature',
        header: 'Temperature (°C)',
        visible: ['live','schedule'],
        sortable: true,
        template: {
            name: 'extras'
        }
    }, {
        field: 'humidity',
        header: 'Humidity (% RH)',
        visible: ['live','schedule'],
        sortable: true,
        template: {
            name: 'extras'
        }
    }, {
        field: 'lux',
        header: 'Lux',
        visible: ['live','schedule'],
        sortable: true,
        template: {
            name: 'extras'
        }
    }
    , {
        field: 'pointValue',
        header: 'Status',
        visible: ['event'],
        sortable: true,
        template: {
            name: 'live'
        }
    }
    
];

export const AnalyticsColumns = [
    {
        field: 'buildingName',
        header: 'Building',
        filterable: true,
        sortable: true,
        visible: ['levelOneTwo','levelTwoThree','levelOneThree','allLevels']
    },{
        field: 'levelOneTag',
        header: 'Criteria 1',
        visible: ['levelOneTwo','levelOneThree','allLevels'],
        sortable: true
    },{
        field: 'levelTwoTag',
        header: 'Criteria 2',
        visible: ['levelOneTwo','levelTwoThree','allLevels'],
        sortable: true
    },{
        field: 'levelThreeTag',
        header: 'Criteria 3',
        visible: ['levelOneThree','levelTwoThree','allLevels'],
        sortable: true
    },{
        field: 'roomName',
        header: 'Room',
        filterable: true,
        sortable: true,
        visible: ['levelOneTwo','levelTwoThree','levelOneThree','allLevels']
    },{
        field: 'avgUtilPercentage',
        header: 'Avg. Utilization(%)',
        visible: ['levelOneTwo','levelTwoThree','levelOneThree','allLevels'],
        sortable: true,
        template: {
            name: 'percentage'
        }
    }, {
        field: 'peakUtilPercentage',
        header: 'Peak Utilization(%)',
        visible: ['levelOneTwo','levelTwoThree','levelOneThree','allLevels'],
        sortable: true,
        template: {
            name: 'percentage'
        }
    }, {
        field: 'peakUtilDay',
        header: 'Peak Utilization %(Day)',
        visible: ['levelOneTwo','levelTwoThree','levelOneThree','allLevels'],
        sortable: true
    }, {
        field: 'occupiedAssets',
        header: 'Days Occupied',
        visible: ['levelOneTwo','levelTwoThree','levelOneThree','allLevels'],
        sortable: true
    }, 
    {
        field: 'actualcost',
        header: 'Actual Cost',
        visible: ['levelOneTwo','levelTwoThree','levelOneThree','allLevels'],
        sortable: true
    }
    // , 
    // {
    //     field: 'cost',
    //     header: 'Utilized Cost',
    //     visible: ['levelOneTwo','levelTwoThree','levelOneThree','allLevels'],
    //     sortable: true
    // }
    , {
        field: 'target',
        header: 'Target Utilization %',
        visible: ['levelOneTwo','levelTwoThree','levelOneThree','allLevels'],
        sortable: true,
        template: {
            name: 'percentage'
        }
    }, {
        field: 'savings',
        header: 'Potential Cost Savings',
        visible: ['levelOneTwo','levelTwoThree','levelOneThree','allLevels'],
        sortable: true
    }
    
];

export const AlarmColumns = [
    {
        field: 'ts',
        header: 'Timestamp',
        filterable: true,
        sortable: true,
        visible: ['trend',]
    }, {
        field: 'pointName',
        header: 'Point Name',
        filterable: true,
        sortable: true,
        visible: ['trend']
    }, {
        field: 'status',
        header: 'Alarm Status',
        filterable: true,
        sortable: true,
        visible: ['trend'],
        template: {
            name: 'alarmStatus'
        }
    }, {
        field: 'alarmType',
        header: 'Alarm Type',
        filterable: true,
        sortable: true,
        visible: ['trend']
    }, {
        field: 'sourceState',
        header: 'Source State',
        filterable: true,
        sortable: true,
        visible: ['trend']
    }, {
        field: 'BMSsource',
        header: 'BMS Source',
        filterable: true,
        sortable: true,
        visible: ['trend']
    }, {
        field: 'duration',
        header: 'Duration',
        visible: ['trend'],
        filterable: true,
        sortable: true
    }, {
        field: 'priority',
        header: 'Priority',
        visible: ['trend'],
        sortable: true,
        filterable: true,
    }
    // , {
    //     field: 'pointValue',
    //     header: 'value',
    //     visible: ['trend'],
    //     sortable: true,
    //     filterable: true,
    // }
    // ,{
    //     field: 'user',
    //     header: 'User',
    //     visible: ['trend'],
    //     sortable: true,
    //     filterable: true,
    // },{
    //     field: 'notes',
    //     header: 'Notes',
    //     filterable: true,
    //     sortable: true,
    //     visible: ['trend']
    // }
];


export const EMSColumns = [
    {
        field: 'ts',
        header: 'Timestamp',
        filterable: true,
        sortable: true,
        visible: ['trend']
    },
    {
        field: 'lastUpdatedDate',
        header: 'Timestamp',
        filterable: true,
        sortable: true,
        visible: ['live']
    },
    {
        field: 'buildingName',
        header: 'Building Name',
        filterable: true,
        sortable: true,
        visible: ['trend','live']
    },
    {
        field: 'zoneName',
        header: 'Zone Name',
        filterable: true,
        sortable: true,
        visible: ['trend','live']
    },
    {
        field: 'roomName',
        header: 'Room Name',
        filterable: true,
        sortable: true,
        visible: ['trend','live']
    },  
    {
        field: 'pointName',
        header: 'Point Name',
        filterable: true,
        sortable: true,
        visible: ['trend','live']
    }, {
        field: 'pointValue',
        header: 'Value',
        filterable: true,
        sortable: true,
        visible: ['trend','live'],
        template: {
            name: 'unit'
        }
    }, 
    {
        field: '',
        header: 'Details',
        filterable: false,
        sortable: false,
        visible: ['live']
    }
];

export const OccPointColumns = [
    {
        field: 'buildingName',
        header: 'Building',
        filterable: true,
        sortable: true
    },
    {
        field: 'zoneName',
        header: 'Zone',
        filterable: true,
        sortable: true
    },
    {
        field: 'roomName',
        header: 'Room',
        filterable: true,
        sortable: true
    },  
    {
        field: 'pointName',
        header: 'Point',
        filterable: true,
        sortable: true
    },  
    {
        field: 'device',
        header: 'Device',
        filterable: true,
        sortable: true
    },  
    {
        field: 'tags',
        header: 'Tag',
        filterable: true,
        sortable: true
    }
];

export const OccDisplayPointColumns = [
    {
        field: 'buildingName',
        header: 'Building',
        filterable: true,
        sortable: true
    },
    {
        field: 'zoneName',
        header: 'Zone',
        filterable: true,
        sortable: true
    },
    {
        field: 'roomName',
        header: 'Room',
        filterable: true,
        sortable: true
    },  
    {
        field: 'pointName',
        header: 'Point',
        filterable: true,
        sortable: true
    },  
    {
        field: 'device',
        header: 'Device',
        filterable: true,
        sortable: true
    },  
    {
        field: 'tags',
        header: 'Tag',
        filterable: true,
        sortable: true
    },  
    {
        field: '',
        header: '',
        filterable: false,
        sortable: false,
        template: {
            name: 'delete'
        }
    },  
    {
        field: '',
        header: '',
        filterable: false,
        sortable: false,
        template: {
            name: 'update'
        }
    }
];