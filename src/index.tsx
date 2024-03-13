import './styles/index.scss';
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/700.css'
import {createRoot} from 'react-dom/client'
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";

import {reduxStore} from "redux/reduxStore";

import App from "./App";

const root = createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <BrowserRouter basename={`/`}>
        <Provider store={reduxStore}>
            <App/>
        </Provider>
    </BrowserRouter>
)