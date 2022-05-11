export type Certificate = {
  name: string;
  date: Date;
};

export type Store = {
  name: string;
  address: string;
  owner: string;
  phone_number: string;
  certificates: Certificate[];
};
