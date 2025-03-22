// definition of the user address structure
export interface UserAddress {
  street : string;
  suite : string;
  city : string;
  zipcode : string;
  geo? : {
    lat : string;
    lng : string;
  };
}

// definition of the company structure
export interface UserCompany {
  name : string;
  catchPhrase : string;
  bs : string;
}

// definition of the user structure
export interface User {
  id : number;
  name : string;
  username : string;
  email : string;
  address : UserAddress;
  phone? : string;
  website? : string;
  company? : UserCompany;
}

// defining the shape of the redux state for users
export interface UserState {
  users : User[];
  loading : boolean;
  error : string | null;
  selectedUser : User | null;
}

// defining a type for creating a new user (no id required as it will be generated)
export type NewUser = Omit<User, 'id'>;

// defining a type for updating a user (all fields optional except id)
export interface UpdateUser extends Omit<NewUser, 'id'> {
  id: number;
  name: string; 
}
