import { combineReducers, createStore } from "redux";
// import { countReducer, phoneReducer } from "./reducers/index";
// import { countReducer, phoneReducer } from "./reducers"; //viet gon
import * as reducer from "./reducers";

// lowerCase
const rootReducer = combineReducers({
  ...reducer,
});

export const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
