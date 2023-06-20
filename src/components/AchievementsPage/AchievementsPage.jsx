import { useEffect } from "react"
import { useDispatch } from "react-redux"
import './AchievementsPage.css'
import AchievementsTabs from "./AchievementsTabs/AchievementsTabs";

export default function AchievementsPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type: 'FETCH_USER_ACTIVITIES'})
    dispatch({type: 'FETCH_ACHIEVEMENTS'})
  }, [])

  return (
    <div className="container">
      <AchievementsTabs />
      <h2>Inside the Achievements Page</h2>
    </div>
  )
}

