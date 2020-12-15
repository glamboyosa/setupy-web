import { createContext, useState } from 'react';
import { User } from '../generated/graphql';
type userType = Pick<User, 'id' | 'email' | 'username'> | null;
type userProviderProps = {
  children: React.ReactNode;
};
type userContext = {
  user: userType | null;
  setUserHandler: (user: userType) => void;
};
export const Context = createContext({} as userContext);

const UserProvider = ({ children }: userProviderProps) => {
  const [user, setUser] = useState<userType>(null);
  const setUserHandler = (user: userType) => {
    setUser(user);
  };
  return (
    <Context.Provider value={{ user, setUserHandler }}>
      {children}
    </Context.Provider>
  );
};
export default UserProvider;
