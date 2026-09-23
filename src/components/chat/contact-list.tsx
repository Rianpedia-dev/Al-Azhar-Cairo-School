"use client";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { getUserInitials, getAvatarColor } from "@/lib/mock-data";
import type { ChatRoom } from "@/types";
import { Search, Users } from "lucide-react";
import { useState } from "react";

interface ContactListProps {
  chatRooms: ChatRoom[];
  selectedId?: string;
  onSelect: (room: ChatRoom) => void;
  currentUserId: string;
}

export function ContactList({ chatRooms, selectedId, onSelect, currentUserId }: ContactListProps) {
  const [search, setSearch] = useState("");

  const filteredRooms = chatRooms.filter((room) => {
    const name = room.nama || room.lastMessage?.sender?.name || "Chat";
    return name.toLowerCase().includes(search.toLowerCase());
  });

  const getRoomName = (room: ChatRoom) => {
    if (room.nama) return room.nama;
    const otherMember = room.lastMessage?.sender;
    if (otherMember && otherMember.id !== currentUserId) return otherMember.name;
    return "Chat";
  };

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return date.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
    if (diffDays === 1) return "Kemarin";
    return date.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
  };

  return (
    <div className="flex flex-col h-full border-r border-border">
      {/* Search */}
      <div className="p-3 border-b border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari percakapan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9 text-sm"
          />
        </div>
      </div>

      {/* Contact list */}
      <ScrollArea className="flex-1">
        {filteredRooms.map((room) => {
          const name = getRoomName(room);
          const isSelected = selectedId === room.id;
          const lastMsg = room.lastMessage;

          return (
            <button
              key={room.id}
              onClick={() => onSelect(room)}
              className={cn(
                "w-full flex items-center gap-3 p-3 text-left transition-colors hover:bg-secondary/80",
                isSelected && "bg-secondary"
              )}
            >
              <Avatar className="h-10 w-10 shrink-0">
                <AvatarFallback
                  style={{ backgroundColor: getAvatarColor(name) }}
                  className="text-white text-xs font-bold"
                >
                  {room.type === "GROUP" ? (
                    <Users className="h-4 w-4" />
                  ) : (
                    getUserInitials(name)
                  )}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium truncate">{name}</span>
                  {lastMsg && (
                    <span className="text-[10px] text-muted-foreground shrink-0">
                      {formatTime(lastMsg.createdAt)}
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between mt-0.5">
                  <p className="text-xs text-muted-foreground truncate max-w-[180px]">
                    {lastMsg?.content || "Belum ada pesan"}
                  </p>
                  {room.unreadCount && room.unreadCount > 0 ? (
                    <Badge className="h-5 min-w-[20px] rounded-full text-[10px] px-1.5 bg-accent text-accent-foreground shrink-0">
                      {room.unreadCount}
                    </Badge>
                  ) : null}
                </div>
              </div>
            </button>
          );
        })}
      </ScrollArea>
    </div>
  );
}
