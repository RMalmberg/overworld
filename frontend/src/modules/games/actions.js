import axios from "axios";
import { GET_POPULAR_GAMES } from "./actionTypes";

export const getPopularGames = (limit = 42, offset = 0, filters = {}) => dispatch => {
  axios
    .get("/api/games/popular/", {
      params: { limit: limit, offset: offset, filters: filters }
    })
    .then(res => {
      dispatch({
        type: GET_POPULAR_GAMES,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};
