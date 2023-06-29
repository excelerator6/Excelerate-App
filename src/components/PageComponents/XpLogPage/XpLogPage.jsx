import XpLogDataGrid from "./XpLogDataGrid/XpLogDataGrid.jsx"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import RenderExpandCellGrid from "./XpLogDataGrid/RenderExpandCellGrid.jsx";

export default function XpLogPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type: 'FETCH_USER_ACTIVITIES'})
  }, [])

  return (
    <div className="container">
      <h2>Inside XpLogPage</h2>
      
      {/*
        // The 2nd version of the XpLog view,
        //  Still available as there are portions of this that I like better
        //  than the current RenderExpandCellGrid version
        //  - Includes the starting code to be able to select rows to delete
        <XpLogDataGrid />
      */}

      {/*
        // The current version we are utilizing to display the XpLog
        // - We will want to rename this if this is the option we place
        //   into our production build.
      */}
      <RenderExpandCellGrid />
    </div>
  )
}