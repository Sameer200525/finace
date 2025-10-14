"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";

const Expenses = () => {
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
            <Input id="expense-category" placeholder="e.g., Groceries, Rent, Entertainment" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="expense-amount">Amount</Label>
            <Input id="expense-amount" type="number" placeholder="0.00" />
          </div>
          <Button className="w-full">
            <PlusCircle className="mr-2 h-4 w-4" /> Add Expense
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Expense History</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No expenses recorded yet.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Expenses;