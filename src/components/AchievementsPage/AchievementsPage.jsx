import { useEffect } from "react"
import { useDispatch } from "react-redux"
import './AchievementsPage.css'
import AchievementsTabs from "./AchievementsTabs";

export default function AchievementsPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type: 'FETCH_USER_ACTIVITIES'})
  }, [])

  return (
    <div className="container">
      <AchievementsTabs />
      <h2>Inside the Achievements Page</h2>
    </div>
  )
}

