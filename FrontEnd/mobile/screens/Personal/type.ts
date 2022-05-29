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

export type Feedback = PersonalData & {
  content: [FeedbackMessage, ResponseMessage?];
};

export type PersonalContextData =
  | undefined
  | {
      contextData: PersonalData;
      setContextData?: Dispatch<SetStateAction<PersonalData>>;
    };
