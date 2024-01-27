import './styles/index.scss';
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/700.css'

import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";

import {reduxStore} from "redux/reduxStore";

import App from "./App";


ReactDOM.render(
    <BrowserRouter>
        <Provider store={reduxStore}>
            <App/>
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
);

