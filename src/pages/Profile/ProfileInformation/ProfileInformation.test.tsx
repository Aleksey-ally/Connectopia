import {create} from "react-test-renderer";
import {ProfileInformation} from "pages/Profile/ProfileInformation/ProfileInformation";

describe("ProfileInformation component", ()=>{

    test('Status should be a props',()=>{
        const component = create(<ProfileInformation status={'Check status'} changeStatusHandler={() => {}} edit={false} toggleEditHandler={() => {}}/>)
        expect(component.root.props.status).toBe('Check status')
    })

    test('<Input/> should not be displayed ',()=>{
        const component = create(<ProfileInformation status={'Check status'} changeStatusHandler={() => {}} edit={false} toggleEditHandler={() => {}}/>)
        expect(()=>{
            component.root.findByType('input');
        }).toThrow()
    })

    test('<Input/> should be displayed with text ',()=>{
        const component = create(<ProfileInformation status={'Check status'} changeStatusHandler={() => {}} edit={true} toggleEditHandler={() => {}}/>)
        const Input = component.root.findByType('input').props
        expect(Input.value).toBe('Check status')
    })
})