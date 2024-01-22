import {connect} from "react-redux";
import {addMessage, changeMessageText, MessagesDataType, ActionType} from "redux/messagesReducer";
import {ReducersType} from "redux/reduxStore";
import {Messages} from "./Messages";


// export const MessagesContainer = () => {

//     const messagesData = useSelector<ReducersType, MessagesDataType>(state => state.messagesData)
//     const dispatch = useDispatch()

//     const dispatchNewTextInput = (newText: string) => {
//         dispatch(changeMessageTextAC(newText))
//     }
//     const addMessage = () => {
//         dispatch(addMessageAC())
//     }


//     return <Messages messagesData={messagesData} dispatchNewTextInput={dispatchNewTextInput} addMessage={addMessage} />
// }

type MapStateToPropsType = {
    messagesData: MessagesDataType
    isAuth: boolean
}

type MapDispatchtoPropsType = {
    dispatchNewTextInput: (newText: string) => void
    addMessage: () => void
}


const mapStateToProps = (state: ReducersType): MapStateToPropsType => {
    return {
        messagesData: state.messagesData,
        isAuth: state.auth.isAuth
    }
}

const mapDispatchToProps = (dispatch: (action: ActionType) => void): MapDispatchtoPropsType => {
    return {
        dispatchNewTextInput: (newText: string) => {
            dispatch(changeMessageText(newText))
        },
        addMessage: () => {
            dispatch(addMessage())
        }
    }
}

export const MessagesContainer = connect(mapStateToProps, mapDispatchToProps)(Messages)