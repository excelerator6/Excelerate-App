import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// Import the tab views
import XpEarnedTab from './TabViews/XpEarnedTab';
import LevelsObtainedTab from './TabViews/LevelsObtainedTab';
import VideosWatchedTab from './TabViews/VideosWatchedTab';
import PodcastsFinishedTab from './TabViews/PodcastsFinishedTab';
import AudiobooksReadTab from './TabViews/AudiobooksReadTab';
import BooksReadTab from './TabViews/BooksReadTab';
import BooksSummariesTab from './TabViews/BookSummariesTab';
import ArticlesReadTab from './TabViews/ArticlesReadTab';
import CoursesCompletedTab from './TabViews/CoursesCompletedTab';

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
          <Tab label="Experience (XP) Earned" {...a11yProps(0)} />
          <Tab label="Levels Obtained" {...a11yProps(1)} />
          <Tab label="Videos Watched" {...a11yProps(2)} />
          <Tab label="Podcasts Finished" {...a11yProps(3)} />
          <Tab label="Audiobooks Read" {...a11yProps(4)} />
          <Tab label="Books Read" {...a11yProps(5)} />
          <Tab label="Book Summaries" {...a11yProps(6)} />
          <Tab label="Articles Read" {...a11yProps(7)} />
          <Tab label="Courses Completed" {...a11yProps(8)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <XpEarnedTab />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <LevelsObtainedTab />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <VideosWatchedTab />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <PodcastsFinishedTab />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <AudiobooksReadTab />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <BooksReadTab />
      </TabPanel>
      <TabPanel value={value} index={6}>
        <BooksSummariesTab />
      </TabPanel>
      <TabPanel value={value} index={7}>
        <ArticlesReadTab />
      </TabPanel>
      <TabPanel value={value} index={8}>
        <CoursesCompletedTab />
      </TabPanel>
    </Box>
  );
}