import {create} from "react-test-renderer";
import {ProfileInformation} from "pages/Profile/ProfileInformation/ProfileInformation";

describe("ProfileInformation component", ()=>{
    test('Status should be a props',()=>{
        const component = create(<ProfileInformation status={'Check status'} changeStatusHandler={() => {}} edit={false} toggleEditHandler={() => {}}/>)
        expect(component.root.props.status).toBe('Check status')
    })

})