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
// import logger from "redux-logger";


const middleware = [thunk];

const configureStore = () => {
    return createStore(
        rootReducer,
        composeWithDevTools(
            applyMiddleware(...middleware)
        )
    );
};

export default configureStore;
