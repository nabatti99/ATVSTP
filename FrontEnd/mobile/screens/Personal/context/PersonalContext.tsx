import React, { createContext, useState, Context } from "react";
import { PersonalContextData, PersonalData } from "../type";

const initialContextData: PersonalData = {
  fullname: "Ẩn Danh",
  phone_number: "Không có",
};

export const personalContext: Context<PersonalContextData> = createContext<PersonalContextData>({
  contextData: initialContextData,
});

type PersonalContextProviderProps = {
  children?: React.ReactNode;
};

export function PersonalContextProvider({ children }: PersonalContextProviderProps) {
  const [contextData, setContextData] = useState<PersonalData>(initialContextData);

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
