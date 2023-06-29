/**
 * LevelBadge is a component that returns the corresponding badge when
 * a user achieves different levels within a given skill
 * @param {number} currentLevel - the current level for a given skill
 * @returns a string for the corresponding badge
 */
export default function LevelBadge(currentLevel) {
  switch (true) {
    case currentLevel === 50:
      return "҉ | 50 | ҉";
    case currentLevel === 49:
      return "««| 49 |»»";
    case currentLevel === 48:
      return "««| 48 |»»";
    case currentLevel === 47:
      return "««| 47 |»»";
    case currentLevel === 46:
      return "««| 46 |»»";
    case currentLevel === 45:
      return "««| 45 |»»";
    case currentLevel === 44:
      return "««| 44 |»»";
    case currentLevel === 43:
      return "««| 43 |»»";
    case currentLevel === 42:
      return "««| 42 |»»";
    case currentLevel === 41:
      return "««| 41 |»»";
    case currentLevel === 40:
      return "««| 40 |»»";
    case currentLevel === 39:
      return "‹«| 39 |»›";
    case currentLevel === 38:
      return "‹«| 38 |»›";
    case currentLevel === 37:
      return "‹«| 37 |»›";
    case currentLevel === 36:
      return "‹«| 36 |»›";
    case currentLevel === 35:
      return "‹«| 35 |»›";
    case currentLevel === 34:
      return "‹«| 34 |»›";
    case currentLevel === 33:
      return "‹«| 33 |»›";
    case currentLevel === 32:
      return "‹«| 32 |»›";
    case currentLevel === 31:
      return "‹«| 31 |»›";
    case currentLevel === 30:
      return "‹«| 30 |»›";
    case currentLevel === 29:
      return "‹«| 29 |»›";
    case currentLevel === 28:
      return "‹«| 28 |»›";
    case currentLevel === 27:
      return "‹«| 27 |»›";
    case currentLevel === 26:
      return "‹«| 26 |»›";
    case currentLevel === 25:
      return "‹«| 25 |»›";
    case currentLevel === 24:
      return "«| 24 |»";
    case currentLevel === 23:
      return "«| 23 |»";
    case currentLevel === 22:
      return "«| 22 |»";
    case currentLevel === 21:
      return "«| 21 |»";
    case currentLevel === 20:
      return "«| 20 |»";
    case currentLevel === 19:
      return "«| 19 |»";
    case currentLevel === 18:
      return "«| 18 |»";
    case currentLevel === 17:
      return "«| 17 |»";
    case currentLevel === 16:
      return "«| 16 |»";
    case currentLevel === 15:
      return "«| 15 |»";
    case currentLevel === 14:
      return "‹| 14 |›";
    case currentLevel === 13:
      return "‹| 13 |›";
    case currentLevel === 12:
      return "‹| 12 |›";
    case currentLevel === 11:
      return "‹| 11 |›";
    case currentLevel === 10:
      return "‹| 10 |›";
    case currentLevel === 9:
      return "‹| 9 |›";
    case currentLevel === 8:
      return "‹| 8 |›";
    case currentLevel === 7:
      return "‹| 7 |›";
    case currentLevel === 6:
      return "‹| 6 |›";
    case currentLevel === 5:
      return "‹| 5 |›";
    case currentLevel === 4:
      return "‹| 4 |›";
    case currentLevel === 3:
      return "‹| 3 |›";
    case currentLevel === 2:
      return "‹| 2 |›";
    case currentLevel === 1:
      return "‹| 1 |›";
    case currentLevel === 0:
      return "‹| 0 |›";
    default:
      return "🤘";
  }
}
