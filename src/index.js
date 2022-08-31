import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
// import App from "./components/App";
import configureStore from "./services/store";

//Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LinearProgress from '@mui/material/LinearProgress';

const App = lazy(() => import("./components/App"));
const store = configureStore();

const root = ReactDOM.createRoot(document.querySelector("#root"));
const renderLoader = () => <LinearProgress/>;

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <Suspense fallback={renderLoader()}>
                <App />
            </Suspense>
        </Provider>
        <ToastContainer />
    </React.StrictMode>
);
