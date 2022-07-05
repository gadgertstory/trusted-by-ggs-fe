import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./components/App";
// import store from "./services/store";
import configureStore from "./services/store";
// import { PersistGate } from "redux-persist/integration/react";

//Toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// const { persistor } = configureStore(window.__INITIAL_STATE__);

const store = configureStore()

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            {/* <PersistGate loading={null} persistor={persistor}> */}
                <App />
            {/* </PersistGate> */}
        </Provider>
        <ToastContainer />
    </React.StrictMode>
);
