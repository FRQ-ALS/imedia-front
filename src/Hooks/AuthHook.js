import { useContext } from "react";

import AuthContext from "../Components/AuthContext/AuthProvider";

const useAuth = () => useContext(AuthContext)

export default useAuth;