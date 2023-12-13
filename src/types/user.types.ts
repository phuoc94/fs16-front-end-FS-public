export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  role: [{ title: string }];
  avatar: string;
}
