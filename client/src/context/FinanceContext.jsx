import React, { createContext, useContext, useState, useEffect } from 'react';

const FinanceContext = createContext();

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
};

export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);

  // Sample data for demonstration
  useEffect(() => {
    const sampleTransactions = [
      {
        id: 1,
        type: "income",
        amount: 5000,
        category: "Salary",
        description: "Monthly salary",
        date: "2024-01-15",
        createdAt: new Date().toISOString()
      },
      {
        id: 2,
        type: "expense",
        amount: 150,
        category: "Food",
        description: "Grocery shopping",
        date: "2024-01-14",
        createdAt: new Date().toISOString()
      },
      {
        id: 3,
        type: "expense",
        amount: 50,
        category: "Transport",
        description: "Uber ride",
        date: "2024-01-13",
        createdAt: new Date().toISOString()
      }
    ];

    const sampleBudgets = [
      {
        id: 1,
        category: "Food",
        monthlyLimit: 500,
        currentSpent: 0,
        period: "monthly",
        createdAt: new Date().toISOString()
      },
      {
        id: 2,
        category: "Transport",
        monthlyLimit: 200,
        currentSpent: 0,
        period: "monthly",
        createdAt: new Date().toISOString()
      },
      {
        id: 3,
        category: "Entertainment",
        monthlyLimit: 300,
        currentSpent: 0,
        period: "monthly",
        createdAt: new Date().toISOString()
      }
    ];

    setTransactions(sampleTransactions);
    setBudgets(sampleBudgets);
  }, []);

  // Calculate current spending for each budget category
  const calculateCurrentSpending = (category) => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    return transactions
      .filter(transaction => 
        transaction.category === category && 
        transaction.type === "expense" &&
        new Date(transaction.date).getMonth() === currentMonth &&
        new Date(transaction.date).getFullYear() === currentYear
      )
      .reduce((sum, transaction) => sum + transaction.amount, 0);
  };

  // Update budget spending whenever transactions change
  useEffect(() => {
    setBudgets(prevBudgets => 
      prevBudgets.map(budget => ({
        ...budget,
        currentSpent: calculateCurrentSpending(budget.category)
      }))
    );
  }, [transactions]);

  // Transaction functions
  const addTransaction = (transactionData) => {
    const newTransaction = {
      ...transactionData,
      id: Date.now(),
      amount: parseFloat(transactionData.amount),
      createdAt: new Date().toISOString()
    };
    setTransactions(prev => [newTransaction, ...prev]);
    return newTransaction;
  };

  const updateTransaction = (id, transactionData) => {
    setTransactions(prev => 
      prev.map(transaction => 
        transaction.id === id 
          ? { 
              ...transactionData, 
              id, 
              amount: parseFloat(transactionData.amount),
              createdAt: transaction.createdAt 
            }
          : transaction
      )
    );
  };

  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(transaction => transaction.id !== id));
  };

  // Budget functions
  const addBudget = (budgetData) => {
    const newBudget = {
      ...budgetData,
      id: Date.now(),
      monthlyLimit: parseFloat(budgetData.monthlyLimit),
      currentSpent: calculateCurrentSpending(budgetData.category),
      createdAt: new Date().toISOString()
    };
    setBudgets(prev => [newBudget, ...prev]);
    return newBudget;
  };

  const updateBudget = (id, budgetData) => {
    const existingBudget = budgets.find(budget => budget.id === id);
    setBudgets(prev => 
      prev.map(budget => 
        budget.id === id 
          ? { 
              ...budgetData, 
              id, 
              monthlyLimit: parseFloat(budgetData.monthlyLimit), 
              currentSpent: existingBudget ? existingBudget.currentSpent : 0,
              createdAt: existingBudget ? existingBudget.createdAt : new Date().toISOString()
            }
          : budget
      )
    );
  };

  const deleteBudget = (id) => {
    setBudgets(prev => prev.filter(budget => budget.id !== id));
  };

  // Get transactions by category for budget calculations
  const getTransactionsByCategory = (category) => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    return transactions.filter(transaction => 
      transaction.category === category && 
      transaction.type === "expense" &&
      new Date(transaction.date).getMonth() === currentMonth &&
      new Date(transaction.date).getFullYear() === currentYear
    );
  };

  // Calculate totals
  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const netBalance = totalIncome - totalExpenses;

  const totalBudget = budgets.reduce((sum, budget) => sum + budget.monthlyLimit, 0);
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.currentSpent, 0);
  const totalRemaining = totalBudget - totalSpent;

  const value = {
    // State
    transactions,
    budgets,
    
    // Transaction functions
    addTransaction,
    updateTransaction,
    deleteTransaction,
    
    // Budget functions
    addBudget,
    updateBudget,
    deleteBudget,
    
    // Utility functions
    getTransactionsByCategory,
    calculateCurrentSpending,
    
    // Calculated values
    totalIncome,
    totalExpenses,
    netBalance,
    totalBudget,
    totalSpent,
    totalRemaining
  };

  return (
    <FinanceContext.Provider value={value}>
      {children}
    </FinanceContext.Provider>
  );
};
