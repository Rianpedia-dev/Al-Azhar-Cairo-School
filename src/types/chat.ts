// src/types/chat.ts per PRD 4.2 & 5.2
import type { User } from "./user";
import type { LampiranFile } from "./tugas";

export type ChatRoomType = "PRIVATE" | "GROUP";

export type MessageType = "TEXT" | "IMAGE" | "FILE" | "SYSTEM";

export interface ChatRoom {
  id: string;
  type: ChatRoomType;
  nama?: string | null;
  createdAt: string;
  updatedAt: string;
  members?: ChatRoomMember[];
  messages?: Message[];
  unreadCount?: number;
  lastMessage?: Message | null;
}

export interface ChatRoomMember {
  id: string;
  joinedAt: string;
  chatRoomId: string;
  chatRoom?: ChatRoom;
  userId: string;
  user?: User;
}

export interface Message {
  id: string;
  content: string;
  type: MessageType;
  attachments?: LampiranFile[] | null;
  isRead: boolean;
  readAt?: string | null;
  createdAt: string;
  updatedAt: string;
  chatRoomId: string;
  chatRoom?: ChatRoom;
  senderId: string;
  sender?: User;
}
