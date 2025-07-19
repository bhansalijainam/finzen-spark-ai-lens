import { Bot, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  messages: Message[];
}

const ChatInterface = ({ messages }: ChatInterfaceProps) => {
  const welcomeMessage = "👋 Welcome to FinZen! Add your credit cards on the left and enter an expense to get personalized recommendations that maximize your rewards.";

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-6 overflow-y-auto space-y-4">
        {/* Welcome Message */}
        <div className="chat-bubble">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <p className="text-foreground leading-relaxed">
                {welcomeMessage}
              </p>
            </div>
          </div>
        </div>

        {/* AI Messages */}
        {messages.map((message) => (
          <div key={message.id} className="chat-bubble">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <div 
                  className="text-foreground leading-relaxed whitespace-pre-line"
                  dangerouslySetInnerHTML={{ __html: message.content }}
                />
                <div className="text-xs text-muted-foreground mt-2">
                  {message.timestamp.toLocaleTimeString('en-US', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatInterface;