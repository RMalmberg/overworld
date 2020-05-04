import { GET_POPULAR_GAMES } from "./actionTypes";

const initialState = {
  popularGames: [],
  isLoadingPopularGames: true
};

export default function(state = initialState, action) {
  if (action.type === GET_POPULAR_GAMES) {
    return {
      ...state,
      popularGames: action.payload,
      isLoadingPopularGames: false
    };
  } else {
    return state;
  }
}
