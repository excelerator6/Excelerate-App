import { useDispatch } from "react-redux"
import { useEffect } from "react"
import XpLogDataGrid from "./XpLogDataGrid/XpLogDataGrid.jsx";

export default function XpLogPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type: 'FETCH_USER_ACTIVITIES'})
  }, [])

  return (
    <div className="container">
      <h2>Inside XpLogPage</h2>

      {/*
        // The current version we are utilizing to display the XpLog
        // - We will want to rename this if this is the option we place
        //   into our production build.
      */}
      <XpLogDataGrid />
    </div>
  )
}