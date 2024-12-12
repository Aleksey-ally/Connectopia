import {GroupChatDataType} from "redux/messagesReducer";

export const chatGroupAPI = {
    socket: null as null | WebSocket,

    createConnection() {
        this.socket = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    },

    destroyConnection() {
        this.socket?.close()
        this.socket = null
    },

    subscribe(onMessage: (data: GroupChatDataType[]) => void) {
        if (!this.socket) return

        this.socket.onmessage = (event) => {
            onMessage(JSON.parse(event.data));
        };
    },

    sendMessage(message: string) {
        this.socket?.send(message)
    }


}
