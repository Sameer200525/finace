"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { DollarSign, Target } from "lucide-react";
import { useTransactions } from "@/context/TransactionContext";
import { showSuccess, showError } from "@/utils/toast";
import { cn } from "@/lib/utils";

const BudgetTracker = () => {
  const { transactions, budgetTarget, setBudgetTarget } = useTransactions();
  const [newBudgetValue, setNewBudgetValue] = useState<string>(budgetTarget?.toString() || "");

  const totalExpenses = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const remainingBudget = budgetTarget !== null ? budgetTarget - totalExpenses : null;
  const progressValue = budgetTarget !== null ? (totalExpenses / budgetTarget) * 100 : 0;

  const handleSetBudget = () => {
    const parsedBudget = parseFloat(newBudgetValue);
    if (isNaN(parsedBudget) || parsedBudget <= 0) {
      showError("Please enter a valid positive number for your budget.");
      return;
    }
    setBudgetTarget(parsedBudget);
    showSuccess("Budget target set successfully!");
  };

  const handleClearBudget = () => {
    setBudgetTarget(null);
    setNewBudgetValue("");
    showSuccess("Budget target cleared.");
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold">Monthly Budget</CardTitle>
        <Target className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="budget-target">Set Your Monthly Budget</Label>
          <div className="flex space-x-2">
            <Input
              id="budget-target"
              type="number"
              placeholder="e.g., 1500"
              value={newBudgetValue}
              onChange={(e) => setNewBudgetValue(e.target.value)}
            />
            <Button onClick={handleSetBudget}>Set Budget</Button>
          </div>
          {budgetTarget !== null && (
            <Button variant="outline" onClick={handleClearBudget}>Clear Budget</Button>
          )}
        </div>

        {budgetTarget !== null && (
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Budget: <span className="font-semibold">${budgetTarget.toFixed(2)}</span></span>
              <span>Expenses: <span className="font-semibold text-red-600">${totalExpenses.toFixed(2)}</span></span>
            </div>
            <Progress value={progressValue} className="h-2" />
            <div className="text-sm">
              Remaining:{" "}
              <span className={cn("font-semibold", remainingBudget !== null && remainingBudget < 0 ? "text-red-600" : "text-green-600")}>
                ${remainingBudget !== null ? remainingBudget.toFixed(2) : "N/A"}
              </span>
            </div>
            {remainingBudget !== null && remainingBudget < 0 && (
              <p className="text-xs text-red-500">You are over budget!</p>
            )}
          </div>
        )}
        {budgetTarget === null && (
          <p className="text-sm text-muted-foreground">Set a budget to start tracking your spending against a target.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default BudgetTracker;