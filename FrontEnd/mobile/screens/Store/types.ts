export type Certificate = {
  name: string;
  date: Date;
};

export type Store = {
  name: string;
  address: string;
  owner: string;
  phone_number: string;
  certificate: Certificate[];
  image_url: string;
  status: "active" | "inactive";
  item: {
    name: string;
    is_allowed: boolean;
  }[];
  created_time: string;
};
