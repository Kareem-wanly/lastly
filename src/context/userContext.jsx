import { createContext, useState, useEffect } from "react";
import useDataFetcher from "../api/useDataFetcher ";
import Cookies from "js-cookie";
import { myAxios } from "../api/myAxios";

const UserContext = createContext();
const getData = async () => {
  const res = await myAxios.get("/api/user/get_user_data");
  if (res) {
    return res.data;
  }
};
export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState();
  const [userNameContext, setUserNameContext] = useState();
  const [isUserUpdated, setIsUserUpdated] = useState(false);

  useEffect(() => {
    localStorage.setItem("userName", userNameContext);

    // Retrieve user name from local storage when isUserUpdated changes
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserNameContext(storedUserName);
    }
  }, [isUserUpdated]);

  //   console.log(userData);

  console.log(userNameContext);

  return (
    <UserContext.Provider
      value={{
        setUserNameContext,
        setIsUserUpdated,
        userNameContext,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
