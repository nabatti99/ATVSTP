import { Dispatch, ReactNode, SetStateAction } from "react";

export type FeedbackMessage = {
  type: "feedback";
  message: string;
};

export type ResponseMessage = {
  type: "response";
  sender: string;
  message: string;
};

export type PersonalData = {
  email?: string;
  fullname: string;
  phone_number: string;
};

export type FeedbackData = PersonalData & {
  _id: string;
  content: [FeedbackMessage, ResponseMessage?];
};

export type PersonalContextData = PersonalData & {
  lastUpdated: Date;
};

export type PersonalContext = {
  contextData: PersonalContextData;
  setContextData?: Dispatch<SetStateAction<PersonalContextData>>;
};
