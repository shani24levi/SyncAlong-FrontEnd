import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Scheduled from './Scheduled';
import Activities from './Activities';
import Notifications from './Notifications';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function ContextTrainee(props) {
    const tabs = ['Scheduled', 'Activities', 'Notifications']
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange}
                    textColor="secondary"
                    indicatorColor="secondary"
                    aria-label="basic tabs example">
                    <Tab label="Scheduled" {...a11yProps(0)} />
                    <Tab label="Activities" {...a11yProps(1)} />
                    <Tab label="Notifications" {...a11yProps(2)} />
                </Tabs>
            </Box>

            <TabPanel value={value} index={0}>
                0
                {/* <Scheduled /> */}
            </TabPanel>
            <TabPanel value={value} index={1}>1
                {/* <Activities /> */}
            </TabPanel>
            <TabPanel value={value} index={2}>2
                {/* <Notifications /> */}
            </TabPanel>
        </Box>
    );
}

export default ContextTrainee;