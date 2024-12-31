import {create} from "react-test-renderer";
import {ProfileInformation} from "pages/Profile/ProfileInformation/ProfileInformation";
import {render} from "@testing-library/react";

const mockFn = jest.fn()

let startState = {
    currentUserID: null,
    status: 'Check status',
    editForm: false,
    isFollow: false,
    changeStatusHandler: mockFn,
    toggleEditHandler: mockFn,
    changePostText: mockFn,
    unFollow: mockFn,
    addPost: mockFn,
    follow: mockFn,
    dispatch: mockFn,
    errorMessage: [],
    setEditForm: mockFn,
    handleSubmitProfileForm: mockFn,
    uID: 1
}


describe("ProfileInformation component", () => {

    test('Status should be a props', () => {
        const component = create(<ProfileInformation edit={false} {...startState} />)
        expect(component.root.props.status).toBe('Check status')
    })

    test('Input should not be displayed ', () => {
        const { queryByRole } = render(<ProfileInformation edit={false} {...startState} />);

        // Проверяем, что элемент input не существует
        const input = queryByRole('input');
        expect(input).toBeNull();  // Ожидаем, что input не будет найден
    })

    test('Input should be displayed with text ', () => {
        const { getByRole  } = render(<ProfileInformation edit={true} {...startState}/>)
        const Input = getByRole ('textbox') as HTMLInputElement
        expect(Input?.value).toBe('Check status')
    })
})