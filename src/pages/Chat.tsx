import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, MessageCircle, MessageCircleMore } from 'lucide-react';
import ChatList from '@/components/chat/ChatList';
import ChatWindow from '@/components/chat/ChatWindow';
import { ChatMessage, ChatRoom, User } from '@/types';
import { USERS } from '@/data/mockUsers';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

const MOCK_CHAT_ROOMS: ChatRoom[] = [
  {
    id: '1',
    name: 'General',
    participants: USERS.map(u => u.id),
    lastMessageTime: new Date(),
  },
  {
    id: '2',
    name: 'Audiophiles Team',
    participants: USERS.filter(u => u.department === 'Audiophiles').map(u => u.id),
    lastMessageTime: new Date(Date.now() - 3600000),
  },
  {
    id: '3',
    name: 'Vismasters Team',
    participants: USERS.filter(u => u.department === 'Vismasters').map(u => u.id),
    lastMessageTime: new Date(Date.now() - 86400000),
  },
  {
    id: '4', 
    name: 'Telegram Updates',
    participants: USERS.map(u => u.id),
    lastMessageTime: new Date(Date.now() - 43200000),
    telegramChatId: '-100123456789',
  }
];

const MOCK_MESSAGES: Record<string, ChatMessage[]> = {
  '1': [
    {
      id: '1',
      chatId: '1',
      senderId: USERS[0].id,
      content: 'Welcome to the General chat!',
      timestamp: new Date(Date.now() - 86400000),
      isRead: true,
    },
    {
      id: '2',
      chatId: '1',
      senderId: USERS[1].id,
      content: 'Thanks for setting this up!',
      timestamp: new Date(Date.now() - 43200000),
      isRead: true,
    },
  ],
  '4': [
    {
      id: '3',
      chatId: '4',
      senderId: USERS[0].id,
      content: 'This channel is linked to our Telegram group',
      timestamp: new Date(Date.now() - 7200000),
      isRead: true,
    },
    {
      id: '4',
      chatId: '4',
      senderId: USERS[2].id,
      content: 'Great! Now we can see Telegram messages here too',
      timestamp: new Date(Date.now() - 3600000),
      isRead: true,
    },
  ],
};

const newChatSchema = z.object({
  name: z.string().min(3, { message: 'Chat name must be at least 3 characters long' }),
  telegramChatId: z.string().optional(),
});

type NewChatFormValues = z.infer<typeof newChatSchema>;

const Chat: React.FC = () => {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>(MOCK_CHAT_ROOMS);
  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>(MOCK_MESSAGES);
  const [selectedChatId, setSelectedChatId] = useState<string | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  const form = useForm<NewChatFormValues>({
    resolver: zodResolver(newChatSchema),
    defaultValues: {
      name: '',
      telegramChatId: '',
    },
  });

  useEffect(() => {
    if (chatRooms.length > 0 && !selectedChatId) {
      setSelectedChatId(chatRooms[0].id);
    }
  }, [chatRooms, selectedChatId]);

  const handleSelectChat = (chatId: string) => {
    setSelectedChatId(chatId);
  };

  const handleSendMessage = (content: string) => {
    if (!selectedChatId || !user) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      chatId: selectedChatId,
      senderId: user.id,
      content,
      timestamp: new Date(),
      isRead: false,
    };

    setMessages(prev => ({
      ...prev,
      [selectedChatId]: [...(prev[selectedChatId] || []), newMessage],
    }));

    setChatRooms(prev =>
      prev.map(chat =>
        chat.id === selectedChatId ? { ...chat, lastMessageTime: new Date() } : chat
      )
    );

    const selectedChat = chatRooms.find(chat => chat.id === selectedChatId);
    if (selectedChat?.telegramChatId) {
      console.log(`Sending to Telegram chat ${selectedChat.telegramChatId}: ${content}`);
      toast.info("This would send to Telegram in production");
    }
  };

  const onSubmit = (values: NewChatFormValues) => {
    if (!user) return;

    const newChat: ChatRoom = {
      id: Date.now().toString(),
      name: values.name,
      participants: [user.id],
      lastMessageTime: new Date(),
      telegramChatId: values.telegramChatId || undefined,
    };

    setChatRooms(prev => [...prev, newChat]);
    setSelectedChatId(newChat.id);
    setIsOpen(false);
    form.reset();

    toast.success(`Chat "${values.name}" created successfully`);
    
    if (values.telegramChatId) {
      toast.info("In production, this would link to Telegram");
    }
  };

  const selectedChat = chatRooms.find(chat => chat.id === selectedChatId);
  const chatMessages = selectedChatId ? messages[selectedChatId] || [] : [];

  return (
    <div className="container mx-auto py-6 h-[calc(100vh-4rem)]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Chat</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Chat
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Chat</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Chat Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter chat name..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="telegramChatId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <MessageCircleMore className="h-4 w-4 text-blue-500" />
                        Telegram Chat ID (Optional)
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Telegram chat ID..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">Create Chat</Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[calc(100%-4rem)]">
        <div className="md:col-span-1 h-full overflow-hidden">
          <ChatList
            chats={chatRooms}
            onSelectChat={handleSelectChat}
            selectedChatId={selectedChatId}
          />
        </div>
        {selectedChat ? (
          <div className="md:col-span-2 h-full">
            <ChatWindow
              chatId={selectedChat.id}
              chatName={selectedChat.name}
              messages={chatMessages}
              users={USERS}
              onSendMessage={handleSendMessage}
              isTelegramLinked={!!selectedChat.telegramChatId}
            />
          </div>
        ) : (
          <div className="md:col-span-2 flex items-center justify-center h-full bg-muted/50 rounded-lg">
            <div className="text-center">
              <MessageCircle className="h-12 w-12 mx-auto text-muted-foreground" />
              <p className="mt-4 text-lg font-medium">Select a chat or create a new one</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
