"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface IncomeExpenseChartProps {
  totalIncome: number;
  totalExpenses: number;
}

const IncomeExpenseChart: React.FC<IncomeExpenseChartProps> = ({ totalIncome, totalExpenses }) => {
  const data = [
    { name: "Income", amount: totalIncome },
    { name: "Expenses", amount: totalExpenses },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Income vs. Expenses Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
              <Bar dataKey="amount" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default IncomeExpenseChart;