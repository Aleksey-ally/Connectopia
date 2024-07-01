import './styles/index.scss';
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/700.css'
import {createRoot} from 'react-dom/client'
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";

import {reduxStore} from "redux/reduxStore";

import App from "./App";
import {ToastContainer} from "react-toastify";

const root = createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <BrowserRouter basename={`/`}>
        <Provider store={reduxStore}>
            <App/>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                limit={5}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
                theme="dark"
            />
        </Provider>
    </BrowserRouter>
)