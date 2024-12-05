import {connect, useDispatch, useSelector} from "react-redux";
import {ActionType, addMessage, changeMessageText, MessagesDataType} from "redux/messagesReducer";
import {ReducersType} from "redux/reduxStore";
import {Messages} from "./Messages";
import {compose} from "redux";
import {FC} from "react";
import {UsersType} from "redux/usersReducer";


export const MessagesContainer = () => {

    const messagesData = useSelector<ReducersType, MessagesDataType>(state => state.messagesData)
    const usersData = useSelector<ReducersType, UsersType>(state => state.usersData)

    const dispatch = useDispatch()

    const dispatchNewTextInput = (newText: string) => {
        dispatch(changeMessageText(newText))
    }
    const addMessageHandler = () => {
        dispatch(addMessage())
    }


    return <Messages usersData={usersData} messagesData={messagesData} dispatchNewTextInput={dispatchNewTextInput}
                     addMessage={addMessageHandler}/>
}

// type MapStateToPropsType = {
//     messagesData: MessagesDataType
// }
//
// type MapDispatchToPropsType = {
//     dispatchNewTextInput: (newText: string) => void
//     addMessage: () => void
// }


// const mapStateToProps = (state: ReducersType): MapStateToPropsType => {
//     return {
//         messagesData: state.messagesData,
//     }
// }
//
// const mapDispatchToProps = (dispatch: (action: ActionType) => void): MapDispatchToPropsType => {
//     return {
//         dispatchNewTextInput: (newText: string) => {
//             dispatch(changeMessageText(newText))
//         },
//         addMessage: () => {
//             dispatch(addMessage())
//         }
//     }
// }
//
// export const MessagesContainer = compose<FC>(
//     connect(mapStateToProps, mapDispatchToProps)
// )(Messages)