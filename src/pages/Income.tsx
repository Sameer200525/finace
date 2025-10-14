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

const Income = () => {
  const { transactions, addTransaction, deleteTransaction } = useTransactions();
  const [source, setSource] = useState("");
  const [amount, setAmount] = useState("");

  const incomeTransactions = transactions.filter(t => t.type === "income");

  const handleAddIncome = () => {
    const parsedAmount = parseFloat(amount);
    if (!source || isNaN(parsedAmount) || parsedAmount <= 0) {
      showError("Please enter a valid source and a positive amount.");
      return;
    }

    addTransaction({
      type: "income",
      sourceOrCategory: source,
      amount: parsedAmount,
    });

    showSuccess("Income added successfully!");
    setSource("");
    setAmount("");
  };

  const handleDeleteIncome = (id: string) => {
    deleteTransaction(id);
    showSuccess("Income deleted successfully!");
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Income</h2>
      <p className="text-muted-foreground">
        Track all your sources of income here.
      </p>

      <Card>
        <CardHeader>
          <CardTitle>Add New Income</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="income-source">Source</Label>
            <Input
              id="income-source"
              placeholder="e.g., Salary, Freelance, Gift"
              value={source}
              onChange={(e) => setSource(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="income-amount">Amount</Label>
            <Input
              id="income-amount"
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <Button className="w-full" onClick={handleAddIncome}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Income
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Income History</CardTitle>
        </CardHeader>
        <CardContent>
          {incomeTransactions.length === 0 ? (
            <p className="text-muted-foreground">No income recorded yet.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">Actions</TableHead> {/* New column for actions */}
                </TableRow>
              </TableHeader>
              <TableBody>
                {incomeTransactions.map((transaction) => (
                  <TableRow key={transaction.id} className="hover:bg-muted/50">
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>{transaction.sourceOrCategory}</TableCell>
                    <TableCell className="text-right">${transaction.amount.toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteIncome(transaction.id)}
                        aria-label="Delete income"
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

export default Income;