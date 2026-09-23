"use client";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getUserInitials, getAvatarColor } from "@/lib/mock-data";
import type { Message } from "@/types";
import { Check, CheckCheck } from "lucide-react";

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
}

export function MessageBubble({ message, isOwn }: MessageBubbleProps) {
  const senderName = message.sender?.name || "Unknown";
  const time = new Date(message.createdAt).toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={cn("flex gap-2 mb-3", isOwn ? "flex-row-reverse" : "flex-row")}>
      {!isOwn && (
        <Avatar className="h-8 w-8 shrink-0 mt-1">
          <AvatarFallback
            style={{ backgroundColor: getAvatarColor(senderName) }}
            className="text-white text-[10px] font-bold"
          >
            {getUserInitials(senderName)}
          </AvatarFallback>
        </Avatar>
      )}

      <div className={cn("max-w-[75%]", isOwn ? "items-end" : "items-start")}>
        {!isOwn && (
          <p className="text-[10px] text-muted-foreground mb-0.5 px-1 font-medium">
            {senderName}
          </p>
        )}
        <div
          className={cn(
            "rounded-2xl px-3 py-2 text-sm leading-relaxed",
            isOwn
              ? "bg-primary text-primary-foreground rounded-br-md"
              : "bg-secondary text-foreground rounded-bl-md"
          )}
        >
          <p>{message.content}</p>
          <div
            className={cn(
              "flex items-center gap-1 mt-1",
              isOwn ? "justify-end" : "justify-start"
            )}
          >
            <span className={cn("text-[10px] opacity-70", isOwn ? "text-primary-foreground" : "text-muted-foreground")}>
              {time}
            </span>
            {isOwn && (
              message.isRead ? (
                <CheckCheck className="h-3 w-3 text-[#00AEEF]" />
              ) : (
                <Check className="h-3 w-3 opacity-70" />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
