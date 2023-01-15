import { useContext } from 'react';
import AlertContext from '../Components/AlertContext/AuthContext';

const useAlert = () => useContext(AlertContext);

export default useAlert;