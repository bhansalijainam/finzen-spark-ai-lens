import { Clock, CreditCard } from 'lucide-react';

export interface Transaction {
  id: string;
  expense: string;
  recommendedCard: string;
  rewards: string;
  timestamp: Date;
}

interface TransactionLogProps {
  transactions: Transaction[];
}

const TransactionLog = ({ transactions }: TransactionLogProps) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="glass-card p-6 transition-all duration-300">
      <h2 className="text-xl font-semibold text-foreground mb-4">Recent Activity</h2>
      
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {transactions.length === 0 ? (
          <p className="text-muted-foreground text-sm text-center py-8">
            No transactions yet
          </p>
        ) : (
          transactions.map((transaction) => (
            <div key={transaction.id} className="transaction-card">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <p className="text-foreground font-medium text-sm">
                    {transaction.expense}
                  </p>
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <CreditCard className="w-3 h-3 mr-1" />
                    {transaction.recommendedCard}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-success text-sm font-semibold">
                    {transaction.rewards}
                  </p>
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <Clock className="w-3 h-3 mr-1" />
                    {formatTime(transaction.timestamp)}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TransactionLog;