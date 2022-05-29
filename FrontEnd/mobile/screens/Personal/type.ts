import { Dispatch, ReactNode, SetStateAction } from "react";

export type PersonalData = {
  email?: string;
  fullname: string;
  phone_number: string;
};

export type PersonalContextData =
  | undefined
  | {
      contextData: PersonalData;
      setContextData?: Dispatch<SetStateAction<PersonalData>>;
    };
