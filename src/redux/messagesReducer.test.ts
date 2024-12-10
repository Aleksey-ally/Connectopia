import {addMessage, changeMessageText, MessagesDataType, messagesReducer} from "redux/messagesReducer";
import AvatarFox from "assets/imgs/Fox.png";
import AvatarBear from "assets/imgs/Bear.png";


let startState: MessagesDataType

beforeEach(() => {
    startState = {
        messagesUsersData: [
            {id: 1, animalName: "Fox", photoAvatar: AvatarFox},
            {id: 2, animalName: "Bear", photoAvatar: AvatarBear},
        ],

        messagesTextData: [
            {id: 1, messageText: "Frrr fr fr"},
            {id: 2, messageText: "Raaaaa!"},
        ],

        messageText: "Hi, everyone!",
    }
})

test('Messages should be to added', () => {
    const endState = messagesReducer(startState, addMessage())

    expect(endState.messagesTextData[2].messageText).toBe('Hi, everyone!')
    expect(endState.messagesTextData[2].id).toBe(3)
    expect(endState.messageText).toBe('')
})

test('Message should be to changed', () => {
    const endState = messagesReducer(startState, changeMessageText('Bye, everyone!'))

    expect(endState.messageText).toBe('Bye, everyone!')
})