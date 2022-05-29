import React, { createContext, useState, Context } from "react";
import { PersonalContextData, PersonalContext, PersonalData } from "../type";

const initialContextData: PersonalContextData = {
  fullname: "Ẩn Danh",
  phone_number: "Không có",
  lastUpdated: new Date(),
};

export const personalContext: Context<PersonalContext> = createContext<PersonalContext>({
  contextData: initialContextData,
});

type PersonalContextProviderProps = {
  children?: React.ReactNode;
};

export function PersonalContextProvider({ children }: PersonalContextProviderProps) {
  const [contextData, setContextData] = useState<PersonalContextData>(initialContextData);

  const ContextProvider = personalContext.Provider;
  return (
    <ContextProvider
      value={{
        contextData,
        setContextData,
      }}
    >
      {children}
    </ContextProvider>
  );
}
