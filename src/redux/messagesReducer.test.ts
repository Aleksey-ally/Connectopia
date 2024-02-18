import {addMessage, changeMessageText, messagesReducer, TextDataType, UsersDataType} from "redux/messagesReducer";
import AvatarFox from "imgs/Fox.png";
import AvatarBear from "imgs/Bear.png";


let startState: {
    messagesUsersData: UsersDataType[];
    messagesTextData: TextDataType[];
    messageText: string;
}

beforeEach(() => {
    startState = {
        messagesUsersData: [
            {id: 15, animalName: "Fox", photoAvatar: AvatarFox},
            {id: 21, animalName: "Bear", photoAvatar: AvatarBear},
        ],

        messagesTextData: [
            {id: 151, messageText: "Frrr fr fr"},
            {id: 212, messageText: "Raaaaa!"},
        ],

        messageText: "Hi, everyone!",
    }
})

test('Messages should be to added', () => {
    const endState = messagesReducer(startState, addMessage())

    expect(endState.messagesTextData[2].messageText).toBe('Hi, everyone!')
    expect(endState.messageText).toBe('')
})

test('Message should be to changed', ()=>{
    const endState = messagesReducer(startState,changeMessageText('Bye, everyone!'))

    expect(endState.messageText).toBe('Bye, everyone!')
})