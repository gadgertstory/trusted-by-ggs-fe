// import { createStore, compose, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
// import reducers from '../reducers';

// // import profile from '../reducers/profile';

// import logger from 'redux-logger'

// const configureStore = () => {
//   return createStore(
//     reducers,
//     compose(applyMiddleware(thunk,logger)),
//   );
// };

// export default configureStore;

import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "../reducers";
import logger from "redux-logger";

// import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const middleware = [thunk,logger];

const persistConfig = {
    key: "root",
    storage,
};

// const persistedReducer = persistReducer(persistConfig, rootReducer);

const configureStore = () => {
    return createStore(
        rootReducer,
        composeWithDevTools(
            // persistedReducer,
            // initialState,
            applyMiddleware(...middleware)
        )
    );
    // let persistor = persistStore(store);
};

export default configureStore;
