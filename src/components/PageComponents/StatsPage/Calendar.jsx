import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

// calendar plugins
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Paper, Box, Popover } from "@mui/material";

function Calendar() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: "FETCH_USER_ACTIVITIES",
    });
  }, []);

  const [anchorEl, setAnchorEl] = useState(null);
  const [popupText, setPopupText] = useState("");

  const userActivities = useSelector((store) => store.userActivities);

  const formatDate = (date) => {
    const year = date.slice(-4); // -4 starts 4 from the end of the string and extracts that to the end.
    const month = date.slice(0, 2);
    const day = date.slice(3, 5);
    return `${year}-${month}-${day}`;
  };

  const formattedActivities = userActivities.map((item) => {
    return {
      id: `${item.id}`,
      date: `${formatDate(item.date)}`,
      title: `${item.activity} // ${item.source}`,
    };
  });

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const openPopover = (event) => {
    setAnchorEl(event.el);
    const popupText = userActivities.filter((item) => {
      if (event.event._def.publicId == item.id) {
        return item;
      }
    });
    const text = (
      <>
        <p>Skill: {popupText[0].skill}</p>
        <p>Activity: {popupText[0].activity}</p>
        <p>Source: {popupText[0].source}</p>
        {/* If there is a takeaway, display that in the popup as well */}
        {popupText[0].takeaways !== null ? (
          <p>Takeaway: {popupText[0].takeaways}</p>
        ) : (
          ""
        )}
      </>
    );
    setPopupText(text);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setPopupText("");
  };

  return (
    <div id="fullCalendar">
      <Paper elevation={0}>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          aspectRatio={2.4}
          events={formattedActivities}
          eventClick={(info) => openPopover(info)}
          eventColor="#90ee90"
          eventTextColor="black"
          eventBorderColor="gray"
        />
      </Paper>
      {anchorEl ? (
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <Paper elevation={1}>
            <Box width={250} p={2}>
              {popupText}
            </Box>
          </Paper>
        </Popover>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Calendar;
