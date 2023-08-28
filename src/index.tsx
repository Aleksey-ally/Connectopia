import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import './index.css';
import { reduxStore } from "redux/reduxStore";



ReactDOM.render(
    <BrowserRouter>
        <Provider store={reduxStore}>
            <App />,
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
);

