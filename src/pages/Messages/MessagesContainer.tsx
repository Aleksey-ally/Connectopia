import {connect} from "react-redux";
import {addMessage, changeMessageText, MessagesDataType, ActionType} from "redux/messagesReducer";
import {ReducersType} from "redux/reduxStore";
import {Messages} from "./Messages";
import {WthAuthRedirect} from "utils/WithAuthRedirect";
import {compose} from "redux";
import {FC} from "react";


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
}

type MapDispatchToPropsType = {
    dispatchNewTextInput: (newText: string) => void
    addMessage: () => void
}


const mapStateToProps = (state: ReducersType): MapStateToPropsType => {
    return {
        messagesData: state.messagesData,
    }
}

const mapDispatchToProps = (dispatch: (action: ActionType) => void): MapDispatchToPropsType => {
    return {
        dispatchNewTextInput: (newText: string) => {
            dispatch(changeMessageText(newText))
        },
        addMessage: () => {
            dispatch(addMessage())
        }
    }
}

export const MessagesContainer = compose<FC>(
    WthAuthRedirect,
    connect(mapStateToProps, mapDispatchToProps)
)(Messages)