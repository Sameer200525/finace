"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { convertUsdToInr, formatCurrencyINR } from "@/utils/currency"; // Import the new utility

interface IncomeExpenseChartProps {
  totalIncome: number;
  totalExpenses: number;
}

const IncomeExpenseChart: React.FC<IncomeExpenseChartProps> = ({ totalIncome, totalExpenses }) => {
  const data = [
    { name: "Income", amount: convertUsdToInr(totalIncome) }, // Convert for chart data
    { name: "Expenses", amount: convertUsdToInr(totalExpenses) }, // Convert for chart data
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
              <YAxis tickFormatter={(value: number) => formatCurrencyINR(value / USD_TO_INR_RATE)} /> {/* Format Y-axis ticks */}
              <Tooltip formatter={(value: number) => formatCurrencyINR(value / USD_TO_INR_RATE)} /> {/* Format tooltip values */}
              <Bar dataKey="amount" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default IncomeExpenseChart;