import {MyPosts} from "pages/Profile/MyPosts/MyPosts";
import {render} from "@testing-library/react";
import {create} from "react-test-renderer";

let startState = {
    postData: [
        {id: 1, message: "Good luck!", likeCounter: 91}
    ],
    textPost: "",
    profile: {},
    status: ""
}

describe('MyPost component', () => {

    test('Text post should be a changed', () => {

        const {getByPlaceholderText} = render(
            <MyPosts profileData={startState} dispatchNewTextInput={() => {
            }} addPost={() => {
            }}/>
        );

        const textarea = getByPlaceholderText('type text');
        textarea.innerHTML = 'Hey'

        expect(textarea.innerHTML).toBe('Hey')

    })

    test('Post should be an added', () => {

        const newPost = {id: 2, message: "Good bye", likeCounter: 12}

        const addPost = () => {
            return startState = {...startState, postData: [newPost, ...startState.postData]}
        }

        const component = create(<MyPosts profileData={startState} dispatchNewTextInput={() => {
        }} addPost={addPost}/>)

        const button = component.root.findByType('button').props
        button.onClick()

        const componentWithNewPost = create(<MyPosts profileData={startState} dispatchNewTextInput={() => {
        }} addPost={addPost}/>)

        const span = componentWithNewPost.root.findAllByType('span')[0].props;

        expect(span.children).toBe("Good bye")

    })

})