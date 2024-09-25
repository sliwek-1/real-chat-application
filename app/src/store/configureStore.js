import { createStore, applyMiddleware } from "redux";
import { rootReducer} from "./store";
import { thunk } from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(
    persistedReducer,
    applyMiddleware(thunk)
)

export const persistor = persistStore(store)
