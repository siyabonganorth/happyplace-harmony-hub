
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import { MessageCircle } from 'lucide-react';
import { ChatRoom } from '@/types';

interface ChatListProps {
  chats: ChatRoom[];
  onSelectChat: (chatId: string) => void;
  selectedChatId?: string;
}

const ChatList: React.FC<ChatListProps> = ({ chats, onSelectChat, selectedChatId }) => {
  return (
    <Card className="h-full overflow-hidden">
      <CardHeader className="border-b">
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          <span>Chats</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {chats.length > 0 ? (
            chats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => onSelectChat(chat.id)}
                className={`flex items-center p-4 hover:bg-muted cursor-pointer transition-colors ${
                  selectedChatId === chat.id ? 'bg-muted' : ''
                }`}
              >
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src="" alt={chat.name} />
                  <AvatarFallback className="bg-primary text-white">
                    {chat.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between">
                    <p className="text-sm font-medium truncate">{chat.name}</p>
                    {chat.lastMessageTime && (
                      <p className="text-xs text-muted-foreground">
                        {formatDistanceToNow(chat.lastMessageTime, { addSuffix: true })}
                      </p>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground truncate">
                    {chat.telegramChatId ? 'Telegram' : 'Internal'}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 text-center text-muted-foreground">
              <p>No chats available</p>
              <p className="text-sm mt-1">Create a new chat to get started</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatList;
