import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

// import profile from '../reducers/profile';

const configureStore = () => {
  return createStore(
    reducers,
    compose(applyMiddleware(thunk))
  );
};

export default configureStore;
