import {create} from "react-test-renderer";
import {Post} from "pages/Profile/MyPosts/Post/Post";

describe('Post component', ()=>{
    test('message should be displayed', ()=>{
        const component = create(<Post id={0} message={'Nice weather'} likeCounter={0}  />)
        const spanWithMessage = component.root.findAllByType('span')[0]
        expect(spanWithMessage.props.children).toBe('Nice weather')
    })

    test('likes counter should be displayed', ()=>{
        const component = create(<Post id={0} message={''} likeCounter={19}  />)
        const spanWithMessage = component.root.findAllByType('span')[1]
        expect(spanWithMessage.props.children[1]).toBe(19)
    })
})