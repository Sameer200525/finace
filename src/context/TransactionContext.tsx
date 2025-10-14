"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export type TransactionType = "income" | "expense";

export interface Transaction {
  id: string;
  type: TransactionType;
  sourceOrCategory: string;
  amount: number;
  date: string;
}

interface TransactionContextType {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, "id" | "date">) => void;
  deleteTransaction: (id: string) => void; // Add delete function
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "finance_tracker_transactions";

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    // Load transactions from local storage on initial render
    if (typeof window !== "undefined") {
      const savedTransactions = localStorage.getItem(LOCAL_STORAGE_KEY);
      return savedTransactions ? JSON.parse(savedTransactions) : [];
    }
    return [];
  });

  // Save transactions to local storage whenever they change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(transactions));
    }
  }, [transactions]);

  const addTransaction = (newTransaction: Omit<Transaction, "id" | "date">) => {
    const transactionWithIdAndDate: Transaction = {
      ...newTransaction,
      id: uuidv4(),
      date: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
    };
    setTransactions((prevTransactions) => [...prevTransactions, transactionWithIdAndDate]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions((prevTransactions) => prevTransactions.filter(transaction => transaction.id !== id));
  };

  return (
    <TransactionContext.Provider value={{ transactions, addTransaction, deleteTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error("useTransactions must be used within a TransactionProvider");
  }
  return context;
};