const EVENTS = Object.freeze({
    CONNECTION: 'connection',
    CLIENT: {
        CREATE_ROOM: 'CREATE_ROOM',
        SEND_SINGLE_MESSAGE: 'SEND_SINGLE_MESSAGE',
        JOIN_ROOM: 'JOIN_ROOM',
        DISCONNECT: 'disconnect'
    },
    SERVER: {
        ROOMS: 'ROOMS',
        JOINED_ROOM: 'JOINED_ROOM',
        RECEIVE_SINGLE_MESSAGE: 'RECEIVE_SINGLE_MESSAGE'
    }
})

export default EVENTS