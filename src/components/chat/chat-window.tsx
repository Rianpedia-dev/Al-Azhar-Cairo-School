"use client";

import { useState, useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MessageBubble } from "./message-bubble";
import { getUserInitials, getAvatarColor } from "@/lib/mock-data";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { Message, ChatRoom } from "@/types";
import { Send, Paperclip, Smile, Phone, MoreVertical, Users, ChevronLeft } from "lucide-react";

interface ChatWindowProps {
  room: ChatRoom | null;
  messages: Message[];
  currentUserId: string;
  onSendMessage?: (content: string) => void;
  onBack?: () => void;
}

export function ChatWindow({ room, messages, currentUserId, onSendMessage, onBack }: ChatWindowProps) {
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto scroll to bottom on new messages
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    onSendMessage?.(inputValue.trim());
    setInputValue("");
  };

  if (!room) {
    return (
      <div className="flex-1 flex items-center justify-center bg-secondary/30">
        <div className="text-center p-8">
          <div className="text-5xl mb-4">💬</div>
          <h3 className="text-lg font-semibold text-foreground">Pilih Percakapan</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Pilih kontak dari daftar untuk memulai percakapan
          </p>
        </div>
      </div>
    );
  }

  const roomName = room.nama || "Chat";

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Chat header */}
      <div className="flex items-center gap-2 sm:gap-3 p-3 border-b border-border bg-background">
        {onBack && (
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden h-8 w-8 -ml-1 text-muted-foreground"
            onClick={onBack}
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Kembali ke Kontak</span>
          </Button>
        )}
        <Avatar className="h-9 w-9 shrink-0">
          <AvatarFallback
            style={{ backgroundColor: getAvatarColor(roomName) }}
            className="text-white text-xs font-bold"
          >
            {room.type === "GROUP" ? <Users className="h-4 w-4" /> : getUserInitials(roomName)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="text-sm font-semibold">{roomName}</h3>
          <p className="text-[10px] text-muted-foreground">
            {room.type === "GROUP" ? "Group Chat" : "Online"}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Phone className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Messages area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 bg-secondary/10">
        {messages.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-sm text-muted-foreground">
              Belum ada pesan. Mulai percakapan! 🎉
            </p>
          </div>
        ) : (
          messages.map((msg) => (
            <MessageBubble
              key={msg.id}
              message={msg}
              isOwn={msg.senderId === currentUserId}
            />
          ))
        )}
      </div>

      {/* Message input */}
      <div className="p-3 border-t border-border bg-background">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="shrink-0 h-9 w-9">
            <Paperclip className="h-4 w-4" />
          </Button>
          <Input
            placeholder="Ketik pesan..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 h-9 text-sm"
          />
          <Button variant="ghost" size="icon" className="shrink-0 h-9 w-9">
            <Smile className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            className="shrink-0 h-9 w-9 bg-accent hover:bg-accent/90"
            onClick={handleSend}
            disabled={!inputValue.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
