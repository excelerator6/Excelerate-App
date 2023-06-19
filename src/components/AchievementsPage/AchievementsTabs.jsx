import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

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

export default function AchievementsTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant='fullWidth'
        >
          <Tab label="XP Earned" {...a11yProps(0)} />
          <Tab label="Levels Achieved" {...a11yProps(1)} />
          <Tab label="Videos" {...a11yProps(2)} />
          <Tab label="Podcasts" {...a11yProps(3)} />
          <Tab label="Audiobooks" {...a11yProps(4)} />
          <Tab label="Books" {...a11yProps(5)} />
          <Tab label="Book Summaries" {...a11yProps(6)} />
          <Tab label="Articles" {...a11yProps(7)} />
          <Tab label="Courses" {...a11yProps(8)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        XP Earned Achievements go here
      </TabPanel>
      <TabPanel value={value} index={1}>
        Levels Achievements go here
      </TabPanel>
      <TabPanel value={value} index={2}>
        Video Achievements go here
        <br />
        <button>Test</button>
      </TabPanel>
      <TabPanel value={value} index={3}>
        Podcast Achievements go here
      </TabPanel>
      <TabPanel value={value} index={4}>
        Audiobook Achievements go here
      </TabPanel>
      <TabPanel value={value} index={5}>
        Book Achievements go here
      </TabPanel>
      <TabPanel value={value} index={6}>
        Book Summary Achievements go here
      </TabPanel>
      <TabPanel value={value} index={7}>
        Article Achievements go here
      </TabPanel>
      <TabPanel value={value} index={8}>
        Course Achievements go here
      </TabPanel>
    </Box>
  );
}