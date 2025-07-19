import { useState } from 'react';
import { TrendingUp, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface ExpenseInputProps {
  onAnalyze: (expense: string) => void;
  isAnalyzing: boolean;
  hasCards: boolean;
}

const ExpenseInput = ({ onAnalyze, isAnalyzing, hasCards }: ExpenseInputProps) => {
  const [expense, setExpense] = useState('');

  const handleSubmit = () => {
    if (expense.trim() && hasCards) {
      onAnalyze(expense.trim());
      setExpense('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="glass-card p-6 transition-all duration-300">
      <h2 className="text-xl font-semibold text-foreground mb-4">Log Expense</h2>
      
      <div className="space-y-4">
        <Input
          value={expense}
          onChange={(e) => setExpense(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="e.g., $80 on Groceries"
          className="glass-card border-glass-border text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
          disabled={isAnalyzing}
        />
        
        <Button
          onClick={handleSubmit}
          disabled={!expense.trim() || !hasCards || isAnalyzing}
          className="gradient-button-destructive w-full"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <TrendingUp className="w-4 h-4 mr-2" />
              Analyze
            </>
          )}
        </Button>
        
        {!hasCards && (
          <p className="text-muted-foreground text-sm text-center">
            Add at least one card to analyze expenses
          </p>
        )}
      </div>
    </div>
  );
};

export default ExpenseInput;