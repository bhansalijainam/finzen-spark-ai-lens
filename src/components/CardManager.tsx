import { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const AVAILABLE_CARDS = [
  'Chase Sapphire Preferred',
  'Chase Freedom Flex', 
  'Capital One Venture X',
  'Citi Double Cash'
];

interface CardManagerProps {
  cards: string[];
  onAddCard: (card: string) => void;
  onRemoveCard: (card: string) => void;
}

const CardManager = ({ cards, onAddCard, onRemoveCard }: CardManagerProps) => {
  const [selectedCard, setSelectedCard] = useState<string>('');

  const handleAddCard = () => {
    if (selectedCard && !cards.includes(selectedCard)) {
      onAddCard(selectedCard);
      setSelectedCard('');
    }
  };

  const availableCards = AVAILABLE_CARDS.filter(card => !cards.includes(card));

  return (
    <div className="glass-card p-6 transition-all duration-300">
      <h2 className="text-xl font-semibold text-foreground mb-4">Your Cards</h2>
      
      {/* Add Card Section */}
      <div className="space-y-3 mb-6">
        <Select value={selectedCard} onValueChange={setSelectedCard}>
          <SelectTrigger className="glass-card border-glass-border text-foreground">
            <SelectValue placeholder="Select a card..." />
          </SelectTrigger>
          <SelectContent className="glass-card border-glass-border backdrop-blur-xl">
            {availableCards.map((card) => (
              <SelectItem key={card} value={card} className="text-foreground hover:bg-glass-hover">
                {card}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Button 
          onClick={handleAddCard}
          disabled={!selectedCard || cards.includes(selectedCard)}
          className="gradient-button w-full"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Card
        </Button>
      </div>

      {/* Active Cards List */}
      <div className="space-y-2">
        {cards.length === 0 ? (
          <p className="text-muted-foreground text-sm text-center py-4">
            No cards added yet
          </p>
        ) : (
          cards.map((card) => (
            <div 
              key={card} 
              className="glass-card p-3 flex items-center justify-between transition-all duration-300 hover:bg-glass-hover group"
            >
              <span className="text-foreground font-medium">{card}</span>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onRemoveCard(card)}
                className="text-destructive hover:bg-destructive/20 hover:scale-110 transition-all duration-200"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CardManager;