"use client";

import { useState, useCallback } from "react";
import type { Message, ChatRoom } from "@/types";
import { mockChatRooms, mockMessages } from "@/lib/mock-data";
import { toast } from "sonner";

export function useChat(initialRoomId?: string) {
  const [rooms] = useState<ChatRoom[]>(mockChatRooms);
  const [activeRoomId, setActiveRoomId] = useState<string | undefined>(
    initialRoomId || mockChatRooms[0]?.id
  );
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [isTyping, setIsTyping] = useState(false);

  const activeRoom = rooms.find((r) => r.id === activeRoomId) || rooms[0];

  const sendMessage = useCallback(
    (content: string, senderId = "usr2", type: "TEXT" | "IMAGE" | "FILE" = "TEXT") => {
      if (!content.trim()) return;

      const newMsg: Message = {
        id: `msg_${Date.now()}`,
        chatRoomId: activeRoomId || "cr1",
        senderId,
        content,
        type,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isRead: false,
      };

      setMessages((prev) => [...prev, newMsg]);
      toast.success("Pesan terkirim");
    },
    [activeRoomId]
  );

  const markAsRead = useCallback((messageId: string) => {
    setMessages((prev) =>
      prev.map((m) =>
        m.id === messageId ? { ...m, isRead: true, readAt: new Date().toISOString() } : m
      )
    );
  }, []);

  return {
    rooms,
    activeRoom,
    activeRoomId,
    setActiveRoomId,
    messages: messages.filter((m) => m.chatRoomId === activeRoomId),
    sendMessage,
    markAsRead,
    isTyping,
    setIsTyping,
  };
}
