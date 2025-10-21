import React, { createContext, ReactNode, useContext, useState } from "react";
import { DatePlan } from "../pages/sales/data/dateData";

interface SalesContextType {
  newlyAddedSales: DatePlan[];
  addNewSale: (sale: DatePlan) => void;
  clearNewSales: () => void;
}

const SalesContext = createContext<SalesContextType | undefined>(undefined);

export const useSalesContext = () => {
  const context = useContext(SalesContext);
  if (!context) {
    throw new Error("useSalesContext must be used within a SalesProvider");
  }
  return context;
};

interface SalesProviderProps {
  children: ReactNode;
}

export const SalesProvider: React.FC<SalesProviderProps> = ({ children }) => {
  const [newlyAddedSales, setNewlyAddedSales] = useState<DatePlan[]>([]);

  const addNewSale = (sale: DatePlan) => {
    setNewlyAddedSales((prev) => [...prev, sale]);
  };

  const clearNewSales = () => {
    setNewlyAddedSales([]);
  };

  return (
    <SalesContext.Provider
      value={{
        newlyAddedSales,
        addNewSale,
        clearNewSales,
      }}
    >
      {children}
    </SalesContext.Provider>
  );
};
