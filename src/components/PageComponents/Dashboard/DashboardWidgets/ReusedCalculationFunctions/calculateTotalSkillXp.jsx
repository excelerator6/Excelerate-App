export default function calculateTotalSkillXp(skill, userActivities) {
  // Use .filter to filter through the user's logged activites,
  //  returning any activity that used the same skill as the skill we're checking for.
  // If it matches, it copies that into the resulting array
  const actInstances = userActivities.filter(
    (item) => skill.skill_name === item.skill
  );

  return actInstances
    // Loop through activitiesArray and extract ONLY the xp_value using .map
    .map((activity) => activity.xp)
    // Then use .reduce to add each XP amount to the last (acc + current) to get our total XP.
    .reduce((acc, current) => acc + current, 0);
}