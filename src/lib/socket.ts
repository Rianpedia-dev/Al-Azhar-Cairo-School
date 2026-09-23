// src/lib/socket.ts per PRD 4.2 & 7.4

export const SOCKET_CONFIG = {
  port: process.env.SOCKET_PORT ? parseInt(process.env.SOCKET_PORT) : 3001,
  events: {
    JOIN_ROOM: "join_room",
    LEAVE_ROOM: "leave_room",
    SEND_MESSAGE: "send_message",
    NEW_MESSAGE: "new_message",
    MESSAGE_READ: "message_read",
    TYPING_START: "typing_start",
    TYPING_STOP: "typing_stop",
  },
};
