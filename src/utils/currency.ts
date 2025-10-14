"use client";

// Fixed exchange rate for USD to INR. This can be updated if needed.
export const USD_TO_INR_RATE = 83.00; // Added 'export' keyword

export const formatCurrencyINR = (amount: number): string => {
  const inrAmount = amount * USD_TO_INR_RATE;
  return `₹${inrAmount.toFixed(2)}`;
};

export const convertUsdToInr = (amount: number): number => {
  return amount * USD_TO_INR_RATE;
};