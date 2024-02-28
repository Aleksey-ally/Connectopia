import {MyPosts} from "pages/Profile/MyPosts/MyPosts";
import {render} from "@testing-library/react";
import {Provider} from "react-redux";
import {reducers} from "redux/reduxStore";
import {legacy_createStore} from "redux";


describe('MyPost component', () => {
    const startState = {
        postData: [
            {id: 1, message: "Good luck!", likeCounter: 91}
        ],
        textPost: "",
        profile: {},
        status: ""
    }


    test('Text post should be a changed', () => {
        const store = legacy_createStore(reducers);

        const {getByPlaceholderText} = render(
            <Provider store={store}>
                <MyPosts profileData={startState} dispatchNewTextInput={() => {
                }} addPost={() => {
                }}/>
            </Provider>
        );

        const textarea = getByPlaceholderText('type text');
        textarea.innerHTML = 'Hey'

        expect(textarea.innerHTML).toBe('Hey')

    })

})