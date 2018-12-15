import * as actionTypes from '../actions/actionTypes';

export const initialState = {
  cheats: [],
  searchResult: [],
  keywords: '',
  error: null
};

const cheats = ( state = initialState, action) => {
  switch(action.type) {
    case actionTypes.FETCH_CHEATS_SUCCESS:
      return {
        ...state,
        cheats: action.payload,
        error: null
      };
    case actionTypes.FETCH_CHEATS_FAILURE:
      return {
        ...state,
        error: action.payload,
      }
    case actionTypes.SEARCH_CHEATS: {
      const keywords = action.payload.toLowerCase().trim();
      const cheats = state.cheats.filter(
        cheat => cheat.category.toLowerCase().includes(keywords)
        || cheat.description.toLowerCase().includes(keywords)
        || cheat.keywords.some(keyword => keyword.toLowerCase()
        .includes(keywords)));

      return {
        ...state,
        searchResult: cheats,
        keywords: action.payload,
        error: null
      }
    }
    default:
      return state
  }
};

export default cheats;
