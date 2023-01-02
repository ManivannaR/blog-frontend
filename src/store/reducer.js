import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState = {
  user: {},
  isLogged: false,
  token: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "REGISTER":
      return {
        ...state,
        token: action.payload.token,
        isLogged: !state.isLogged,
        user: { ...state.user, ...action.payload.user },
      };
    case "LOGIN":
      return {
        ...state,
        token: action.payload.token,
        isLogged: !state.isLogged,
        user: { ...state.user, ...action.payload },
      };
    case "LOGOUT":
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
};

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

let store = createStore(persistedReducer);
let persistor = persistStore(store);

export { store, persistor };
