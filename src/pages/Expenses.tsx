"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Trash2 } from "lucide-react"; // Import Trash2 icon
import { useTransactions } from "@/context/TransactionContext";
import { showSuccess, showError } from "@/utils/toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Expenses = () => {
  const { transactions, addTransaction, deleteTransaction } = useTransactions();
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");

  const expenseTransactions = transactions.filter(t => t.type === "expense");

  const handleAddExpense = () => {
    const parsedAmount = parseFloat(amount);
    if (!category || isNaN(parsedAmount) || parsedAmount <= 0) {
      showError("Please enter a valid category and a positive amount.");
      return;
    }

    addTransaction({
      type: "expense",
      sourceOrCategory: category,
      amount: parsedAmount,
    });

    showSuccess("Expense added successfully!");
    setCategory("");
    setAmount("");
  };

  const handleDeleteExpense = (id: string) => {
    deleteTransaction(id);
    showSuccess("Expense deleted successfully!");
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Expenses</h2>
      <p className="text-muted-foreground">
        Keep track of all your spending.
      </p>

      <Card>
        <CardHeader>
          <CardTitle>Add New Expense</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="expense-category">Category</Label>
            <Input
              id="expense-category"
              placeholder="e.g., Groceries, Rent, Entertainment"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="expense-amount">Amount</Label>
            <Input
              id="expense-amount"
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <Button className="w-full" onClick={handleAddExpense}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Expense
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Expense History</CardTitle>
        </CardHeader>
        <CardContent>
          {expenseTransactions.length === 0 ? (
            <p className="text-muted-foreground">No expenses recorded yet.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">Actions</TableHead> {/* New column for actions */}
                </TableRow>
              </TableHeader>
              <TableBody>
                {expenseTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>{transaction.sourceOrCategory}</TableCell>
                    <TableCell className="text-right">${transaction.amount.toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteExpense(transaction.id)}
                        aria-label="Delete expense"
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Expenses;