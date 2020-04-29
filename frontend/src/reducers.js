import { combineReducers } from "redux";
import landing from "./modules/landing/reducers";
import game from "./modules/game/reducers";
import games from "./modules/games/reducers";
import auth from "./modules/app/reducers";
import profile from "./modules/profile/reducers";
import settings from "./modules/settings/reducers";

export default combineReducers({
  landing,
  game,
  games,
  auth,
  profile,
  settings
});
