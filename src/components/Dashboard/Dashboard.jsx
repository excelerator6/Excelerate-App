import React from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

// material UI grid components
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import "./Dashboard.css";

// dashboard widget components
import SkillTable from "./DashboardWidgets/SkillTable/SkillTable";
import Overall from "./DashboardWidgets/Overall";
import HeatmapChart from "./DashboardWidgets/HeatmapChart/HeatmapChart";
import ConsumedContent from "./DashboardWidgets/ConsumedContent";

function Dashboard() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: "FETCH_USER_ACTIVITIES" });
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="center"
        alignItems="left"
      >
        <Grid item xs={12} sm={12} md={10}>
          <Paper sx={{ mt: 5 }} elevation={6}>
            <Overall />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={7} mt={-2}>
          <Paper id="dboard-skill-table" elevation={6}>
            <SkillTable />
          </Paper>
        </Grid>
        <Grid item xs={8} sm={8} md={4} mr={1} mt={-2}>
          <Paper elevation={6}>
            <HeatmapChart />
          </Paper>
          <Paper elevation={6}>
            <ConsumedContent />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

// this allows us to use <App /> in index.js
export default Dashboard;
