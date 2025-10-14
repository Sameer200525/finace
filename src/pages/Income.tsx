"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";

const Income = () => {
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
            <Input id="income-source" placeholder="e.g., Salary, Freelance, Gift" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="income-amount">Amount</Label>
            <Input id="income-amount" type="number" placeholder="0.00" />
          </div>
          <Button className="w-full">
            <PlusCircle className="mr-2 h-4 w-4" /> Add Income
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Income History</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No income recorded yet.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Income;