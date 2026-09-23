"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { ContactList } from "@/components/chat/contact-list";
import { ChatWindow } from "@/components/chat/chat-window";
import { mockChatRooms, mockMessages } from "@/lib/mock-data";
import { ChatRoom, Message } from "@/types";
import { cn } from "@/lib/utils";

export default function SiswaChatPage() {
  const { user } = useAuth();
  const currentUserId = user?.id || "u5";
  const [selectedRoom, setSelectedRoom] = useState<ChatRoom>(mockChatRooms[0]);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [showMobileChat, setShowMobileChat] = useState(false);

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
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Chat & Diskusi Belajar
        </h1>
      </div>

      <div className="grid md:grid-cols-12 gap-0 md:gap-4 h-[calc(100vh-14rem)] min-h-[520px] max-h-[720px] border border-border/70 rounded-xl overflow-hidden shadow-sm bg-card">
        <div className={cn("h-full md:col-span-5 lg:col-span-4 border-r border-border/70", showMobileChat ? "hidden md:block" : "block")}>
          <ContactList
            chatRooms={mockChatRooms}
            selectedId={selectedRoom?.id}
            onSelect={(room) => {
              setSelectedRoom(room);
              setShowMobileChat(true);
            }}
            currentUserId={currentUserId}
          />
        </div>
        <div className={cn("h-full md:col-span-7 lg:col-span-8", !showMobileChat ? "hidden md:block" : "block")}>
          <ChatWindow
            room={selectedRoom}
            messages={messages}
            currentUserId={currentUserId}
            onSendMessage={handleSendMessage}
            onBack={() => setShowMobileChat(false)}
          />
        </div>
      </div>
    </div>
  );
}
