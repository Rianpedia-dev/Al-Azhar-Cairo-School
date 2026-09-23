"use client";

import { useState } from "react";
import { ContactList } from "@/components/chat/contact-list";
import { ChatWindow } from "@/components/chat/chat-window";
import { mockChatRooms, mockMessages } from "@/lib/mock-data";
import { ChatRoom, Message } from "@/types";

export default function GuruChatPage() {
  const currentUserId = "usr2"; // ID Guru Ahmad
  const [selectedRoom, setSelectedRoom] = useState<ChatRoom>(mockChatRooms[0]);
  const [messages, setMessages] = useState<Message[]>(mockMessages);

  const handleSendMessage = (content: string) => {
    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      content,
      type: "TEXT",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      senderId: currentUserId,
      chatRoomId: selectedRoom.id,
      isRead: false,
    };
    setMessages((prev) => [...prev, newMsg]);
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <span>💬</span> Ruang Komunikasi Guru & Siswa
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Kanal percakapan terstruktur, aman, dan tercatat di sistem Al-Azhar Cairo
        </p>
      </div>

      <div className="grid md:grid-cols-12 gap-4 h-[650px] border border-border/70 rounded-xl overflow-hidden shadow-sm bg-card">
        <div className="md:col-span-4 lg:col-span-4 border-r border-border/70 h-full">
          <ContactList
            chatRooms={mockChatRooms}
            selectedId={selectedRoom?.id}
            onSelect={(room) => setSelectedRoom(room)}
            currentUserId={currentUserId}
          />
        </div>
        <div className="md:col-span-8 lg:col-span-8 h-full">
          <ChatWindow
            room={selectedRoom}
            messages={messages}
            currentUserId={currentUserId}
            onSendMessage={handleSendMessage}
          />
        </div>
      </div>
    </div>
  );
}
