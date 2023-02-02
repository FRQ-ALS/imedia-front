import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthContext = createContext({
  auth: null,
  setAuth: () => {},
  user: null,
});

const useAuth = () => useContext(AuthContext);


export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("loggedIn")));
  const [user, setUser] = useState(null);

  const navigate = useNavigate()
  const location = useLocation()
  useEffect(() => {
    const isAuth = async () => {
        const jwt = document.cookie.split("=")[1]
        fetch("/api/v1/account/auth",
        {
          credentials: "include",
          method:"POST",
          headers:{
            "Authorization": `Bearer ${jwt}`
          }
        }).then((response) => {
          if(response.ok){
            response.json().then((responseJson)=> {
              setUser(responseJson)
            })
          }
          if(!response.ok){
            setAuth(false)
            localStorage.setItem("loggedIn",false)
            // if(location.pathname != "/signup" && location.pathname!="/home"){
            //   navigate("/login")
            // }
          }

        }).catch((error => {
          setUser(null)
        }))    
    };

    isAuth();
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;