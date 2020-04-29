import { GET_POPULAR_GAMES } from "./actionTypes";

const initialState = {
  popularGames: [],
  gameData: [],
  isLoadingPopular: true
};

export default function(state = initialState, action) {
  if (action.type === GET_POPULAR_GAMES) {
    return {
      ...state,
      popularGames: action.payload,
      isLoadingPopular: false
    };
  } else {
    return state;
  }
}
