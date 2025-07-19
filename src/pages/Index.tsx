import { useState } from 'react';
import Header from '@/components/Header';
import CardManager from '@/components/CardManager';
import ExpenseInput from '@/components/ExpenseInput';
import TransactionLog, { Transaction } from '@/components/TransactionLog';
import ChatInterface from '@/components/ChatInterface';
import { AIAgent } from '@/components/AIAgent';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Message {
  id: string;
  content: string;
  timestamp: Date;
}

const Index = () => {
  const [cards, setCards] = useState<string[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const addCard = (card: string) => {
    setCards(prev => [...prev, card]);
  };

  const removeCard = (card: string) => {
    setCards(prev => prev.filter(c => c !== card));
  };

  const simulateAIAnalysis = (expense: string): Promise<{
    recommendedCard: string;
    rewards: string;
    reasoning: string;
  }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simple simulation logic
        const amount = parseFloat(expense.match(/\$?(\d+(?:\.\d{2})?)/)?.[1] || '0');
        const category = expense.toLowerCase();
        
        let recommendedCard = cards[0]; // Default to first card
        let multiplier = 0.01; // 1% default
        let reasoning = 'general purchases';
        
        // Simple category matching
        if (category.includes('grocery') || category.includes('food')) {
          recommendedCard = cards.find(card => card.includes('Freedom')) || cards[0];
          multiplier = 0.015; // 1.5%
          reasoning = 'grocery purchases with bonus category';
        } else if (category.includes('travel') || category.includes('flight')) {
          recommendedCard = cards.find(card => card.includes('Sapphire') || card.includes('Venture')) || cards[0];
          multiplier = 0.02; // 2%
          reasoning = 'travel purchases';
        } else if (category.includes('restaurant') || category.includes('dining')) {
          recommendedCard = cards.find(card => card.includes('Sapphire')) || cards[0];
          multiplier = 0.03; // 3%
          reasoning = 'dining purchases';
        }
        
        const rewards = (amount * multiplier).toFixed(2);
        
        resolve({
          recommendedCard,
          rewards: `+$${rewards}`,
          reasoning
        });
      }, 1500);
    });
  };

  const analyzeExpense = async (expense: string) => {
    setIsAnalyzing(true);
    
    try {
      const analysis = await simulateAIAnalysis(expense);
      
      // Add transaction
      const newTransaction: Transaction = {
        id: Date.now().toString(),
        expense,
        recommendedCard: analysis.recommendedCard,
        rewards: analysis.rewards,
        timestamp: new Date()
      };
      
      setTransactions(prev => [newTransaction, ...prev.slice(0, 4)]); // Keep last 5
      
      // Add AI message
      const aiMessage: Message = {
        id: Date.now().toString(),
        content: `💳 <strong>Best Card Recommendation</strong><br/><br/>For your <strong>${expense}</strong>, I recommend using your <strong>${analysis.recommendedCard}</strong>.<br/><br/><strong>Why?</strong> You'll earn <strong>${analysis.rewards}</strong> in rewards on ${analysis.reasoning}.<br/><br/>📊 <strong>This maximizes your earning potential!</strong>`,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Mobile/Desktop Layout */}
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left Sidebar */}
        <div className="w-full lg:w-80 flex-shrink-0 p-4 space-y-4 lg:h-screen lg:overflow-y-auto">
          <CardManager 
            cards={cards}
            onAddCard={addCard}
            onRemoveCard={removeCard}
          />
          
          <ExpenseInput 
            onAnalyze={analyzeExpense}
            isAnalyzing={isAnalyzing}
            hasCards={cards.length > 0}
          />
          
          <TransactionLog transactions={transactions} />
        </div>
        
        {/* Right Main Area */}
        <div className="flex-1 flex flex-col lg:h-screen">
          <Header />
          <div className="flex-1 min-h-[500px] lg:min-h-0 p-4">
            <Tabs defaultValue="chat" className="w-full h-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="chat">Card Assistant</TabsTrigger>
                <TabsTrigger value="ai">AI Financial Agent</TabsTrigger>
              </TabsList>
              <TabsContent value="chat" className="h-full">
                <ChatInterface messages={messages} />
              </TabsContent>
              <TabsContent value="ai" className="h-full">
                <AIAgent />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
