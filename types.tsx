export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

export type PhysicalLocation = {
  title: string;
  lat: number;
  long: number;
};

export type responsibility = {
  greenID: string;
  RID: string;
  status: "accepted" | "pending";
};

export type EC = {
  ECID: string;
  f_name: string;
  email: string;
  phone: null | string;
  dialingCode: null | string;
  responsibilities: responsibility[];
};
