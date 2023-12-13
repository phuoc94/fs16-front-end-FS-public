export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  role: [{ title: string }];
  avatar: string;
}
