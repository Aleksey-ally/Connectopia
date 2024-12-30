import './styles/index.scss';
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/700.css'
import {createRoot} from 'react-dom/client'
import {Provider} from "react-redux";
import 'i18n/i18n';
import {reduxStore} from "redux/reduxStore";
import {ToastContainer} from "react-toastify";
import {Router} from "router";

const root = createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <Provider store={reduxStore}>
        <Router/>
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
)