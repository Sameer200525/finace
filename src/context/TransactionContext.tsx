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
  deleteTransaction: (id: string) => void;
  budgetTarget: number | null; // New: Budget target
  setBudgetTarget: (target: number | null) => void; // New: Function to set budget target
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

const LOCAL_STORAGE_TRANSACTIONS_KEY = "finance_tracker_transactions";
const LOCAL_STORAGE_BUDGET_KEY = "finance_tracker_budget_target"; // New: Key for budget target

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    if (typeof window !== "undefined") {
      const savedTransactions = localStorage.getItem(LOCAL_STORAGE_TRANSACTIONS_KEY);
      console.log("TransactionProvider: Initial load from localStorage (transactions):", savedTransactions ? JSON.parse(savedTransactions) : []);
      return savedTransactions ? JSON.parse(savedTransactions) : [];
    }
    return [];
  });

  const [budgetTarget, setBudgetTarget] = useState<number | null>(() => {
    if (typeof window !== "undefined") {
      const savedBudgetTarget = localStorage.getItem(LOCAL_STORAGE_BUDGET_KEY);
      console.log("TransactionProvider: Initial load from localStorage (budgetTarget):", savedBudgetTarget ? parseFloat(savedBudgetTarget) : null);
      return savedBudgetTarget ? parseFloat(savedBudgetTarget) : null;
    }
    return null;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("TransactionProvider: Saving transactions to localStorage:", transactions);
      localStorage.setItem(LOCAL_STORAGE_TRANSACTIONS_KEY, JSON.stringify(transactions));
    }
  }, [transactions]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("TransactionProvider: Saving budgetTarget to localStorage:", budgetTarget);
      if (budgetTarget !== null) {
        localStorage.setItem(LOCAL_STORAGE_BUDGET_KEY, budgetTarget.toString());
      } else {
        localStorage.removeItem(LOCAL_STORAGE_BUDGET_KEY);
      }
    }
  }, [budgetTarget]);

  const addTransaction = (newTransaction: Omit<Transaction, "id" | "date">) => {
    const transactionWithIdAndDate: Transaction = {
      ...newTransaction,
      id: uuidv4(),
      date: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
    };
    console.log("TransactionProvider: Adding new transaction:", transactionWithIdAndDate);
    setTransactions((prevTransactions) => [...prevTransactions, transactionWithIdAndDate]);
  };

  const deleteTransaction = (id: string) => {
    console.log("TransactionProvider: Deleting transaction with ID:", id);
    setTransactions((prevTransactions) => prevTransactions.filter(transaction => transaction.id !== id));
  };

  return (
    <TransactionContext.Provider value={{ transactions, addTransaction, deleteTransaction, budgetTarget, setBudgetTarget }}>
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