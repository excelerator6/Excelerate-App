import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

// Import the tab views
import AchievementTabView from './TabView/TabView';

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
          {children}
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
  const {
    articlesRead,
    audiobooksRead,
    bookSummaries,
    booksRead,
    coursesCompleted,
    levelsObtained,
    podcastsFinished,
    videosWatched,
    xpEarned
  } = useSelector(store => store.achievements.allAchievementsReducer)

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
          sx={{mt:2}}
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

      {/* Xp Earned Tab */}
      <TabPanel value={value} index={0}>
        <AchievementTabView
          pageAchievements={xpEarned}
          pageHeader='XP Earned'
        />
      </TabPanel>

      {/* Levels Obtained Tab */}
      <TabPanel value={value} index={1}>
        <AchievementTabView 
          pageAchievements={levelsObtained}
          pageHeader='Levels Obtained'
        />
      </TabPanel>

      {/* Videos Watched Tab */}
      <TabPanel value={value} index={2}>
        <AchievementTabView 
          pageAchievements={videosWatched}
          pageHeader='Videos Watched'
        />
      </TabPanel>

      {/* Podcasts Finished Tab */}
      <TabPanel value={value} index={3}>
        <AchievementTabView 
          pageAchievements={podcastsFinished}
          pageHeader='Podcasts Finished'
        />
      </TabPanel>

      {/* Audiobooks Read Tab */}
      <TabPanel value={value} index={4}>
        <AchievementTabView
          pageAchievements={audiobooksRead}
          pageHeader='Audiobooks Read'
        />
      </TabPanel>

      {/* Books Read Tab */}
      <TabPanel value={value} index={5}>
        <AchievementTabView
          pageAchievements={booksRead}
          pageHeader='Books Read'
        />
      </TabPanel>

      {/* Book Summaries Tab */}
      <TabPanel value={value} index={6}>
        <AchievementTabView
          pageAchievements={bookSummaries}
          pageHeader='Book Summaries'
        />
      </TabPanel>

      {/* Articles Read Tab */}
      <TabPanel value={value} index={7}>
        <AchievementTabView
          pageAchievements={articlesRead}
          pageHeader='Articles Read'
        />
      </TabPanel>

      {/* Courses Completed Tab */}
      <TabPanel value={value} index={8}>
        <AchievementTabView
          pageAchievements={coursesCompleted}
          pageHeader='Courses Completed'
        />
      </TabPanel>
    </Box>
  );
}