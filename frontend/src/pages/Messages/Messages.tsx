import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Send, Search, MoreVertical } from "lucide-react";
import Layout from "@/components/Layout/Layout";

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
}

interface Conversation {
  id: string;
  participant: {
    id: string;
    name: string;
    avatar?: string;
    role: 'referrer' | 'candidate';
    company?: string;
  };
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  referralTitle: string;
  messages: Message[];
}

const mockConversations: Conversation[] = [
  {
    id: "1",
    participant: {
      id: "user1",
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
      role: "candidate",
      company: "Looking for opportunities"
    },
    lastMessage: "Thank you for the referral opportunity! I've submitted my application.",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 30),
    unreadCount: 2,
    referralTitle: "Senior Frontend Developer at Google",
    messages: [
      {
        id: "1",
        senderId: "current-user",
        content: "Hi Sarah! I saw your profile and think you'd be a great fit for this Frontend Developer role at Google. Are you interested?",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
        isRead: true
      },
      {
        id: "2",
        senderId: "user1",
        content: "Hi! Yes, I'm definitely interested! Could you tell me more about the role and team?",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.5),
        isRead: true
      },
      {
        id: "3",
        senderId: "current-user",
        content: "It's a senior role working on the search UI team. They're looking for someone with React and TypeScript experience. The team is amazing - very collaborative and innovative.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60),
        isRead: true
      },
      {
        id: "4",
        senderId: "user1",
        content: "That sounds perfect! I have 5+ years with React and TypeScript. What's the next step?",
        timestamp: new Date(Date.now() - 1000 * 60 * 45),
        isRead: true
      },
      {
        id: "5",
        senderId: "user1",
        content: "Thank you for the referral opportunity! I've submitted my application.",
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        isRead: false
      }
    ]
  },
  {
    id: "2",
    participant: {
      id: "user2",
      name: "Alex Kumar",
      role: "referrer",
      company: "Microsoft"
    },
    lastMessage: "I can definitely help with the referral. Let me know when you're ready to apply.",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 3),
    unreadCount: 0,
    referralTitle: "Product Manager at Microsoft",
    messages: [
      {
        id: "1",
        senderId: "current-user",
        content: "Hi Alex! I'm interested in the Product Manager role you posted. Could you provide more details?",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
        isRead: true
      },
      {
        id: "2",
        senderId: "user2",
        content: "I can definitely help with the referral. Let me know when you're ready to apply.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
        isRead: true
      }
    ]
  },
  {
    id: "3",
    participant: {
      id: "user3",
      name: "Emily Rodriguez",
      role: "candidate",
      company: "Recent Graduate"
    },
    lastMessage: "I have experience with Python and machine learning. Is that relevant?",
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 6),
    unreadCount: 1,
    referralTitle: "Data Scientist at Meta",
    messages: [
      {
        id: "1",
        senderId: "current-user",
        content: "Hi Emily! I noticed your background in data science. We have an opening at Meta that might interest you.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8),
        isRead: true
      },
      {
        id: "2",
        senderId: "user3",
        content: "That's exciting! What kind of data science work is it?",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 7),
        isRead: true
      },
      {
        id: "3",
        senderId: "current-user",
        content: "It's focused on recommendation systems and user behavior analysis. They're looking for someone with Python and ML experience.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6.5),
        isRead: true
      },
      {
        id: "4",
        senderId: "user3",
        content: "I have experience with Python and machine learning. Is that relevant?",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
        isRead: false
      }
    ]
  }
];

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState<Conversation>(mockConversations[0]);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredConversations = mockConversations.filter(conv =>
    conv.participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.referralTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      const diffInMins = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
      return `${diffInMins}m ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    // Mock sending message (in real app, this would be an API call)
    const newMsg: Message = {
      id: Date.now().toString(),
      senderId: "current-user",
      content: newMessage,
      timestamp: new Date(),
      isRead: false
    };
    
    setSelectedConversation(prev => ({
      ...prev,
      messages: [...prev.messages, newMsg],
      lastMessage: newMessage,
      lastMessageTime: new Date()
    }));
    
    setNewMessage("");
  };

  return (
    <Layout isAuthenticated={true}>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="bg-card rounded-lg shadow-sm border h-[calc(100vh-12rem)] flex">
          {/* Conversations List */}
          <div className="w-1/3 border-r flex flex-col">
            <div className="p-4 border-b">
              <h2 className="text-xl font-semibold mb-4">Messages</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search conversations..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <ScrollArea className="flex-1">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation)}
                  className={`p-4 border-b cursor-pointer hover:bg-muted/50 transition-colors ${
                    selectedConversation.id === conversation.id ? "bg-muted" : ""
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <Avatar className="h-10 w-10">
                      {conversation.participant.avatar ? (
                        <img 
                          src={conversation.participant.avatar} 
                          alt={conversation.participant.name}
                          className="rounded-full object-cover"
                        />
                      ) : (
                        <div className="bg-primary text-primary-foreground flex items-center justify-center h-full text-sm font-medium">
                          {conversation.participant.name.split(' ').map(n => n[0]).join('')}
                        </div>
                      )}
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-foreground truncate">
                          {conversation.participant.name}
                        </p>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-muted-foreground">
                            {formatTime(conversation.lastMessageTime)}
                          </span>
                          {conversation.unreadCount > 0 && (
                            <Badge variant="secondary" className="text-xs">
                              {conversation.unreadCount}
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <p className="text-xs text-muted-foreground mb-1">
                        {conversation.participant.role === 'candidate' ? 'Candidate' : 'Referrer'} • {conversation.participant.company}
                      </p>
                      
                      <p className="text-xs text-primary font-medium mb-1 truncate">
                        {conversation.referralTitle}
                      </p>
                      
                      <p className="text-sm text-muted-foreground truncate">
                        {conversation.lastMessage}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </div>

          {/* Message Thread */}
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <div className="p-4 border-b bg-muted/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    {selectedConversation.participant.avatar ? (
                      <img 
                        src={selectedConversation.participant.avatar} 
                        alt={selectedConversation.participant.name}
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <div className="bg-primary text-primary-foreground flex items-center justify-center h-full text-sm font-medium">
                        {selectedConversation.participant.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    )}
                  </Avatar>
                  
                  <div>
                    <p className="font-medium">{selectedConversation.participant.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedConversation.participant.role} • {selectedConversation.participant.company}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-xs">
                    {selectedConversation.referralTitle}
                  </Badge>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {selectedConversation.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.senderId === 'current-user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg px-4 py-2 ${
                        message.senderId === 'current-user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.senderId === 'current-user' 
                          ? 'text-primary-foreground/70' 
                          : 'text-muted-foreground'
                      }`}>
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <Input
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button 
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  size="icon"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Messages;