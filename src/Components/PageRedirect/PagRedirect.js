import React , {useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function PageRedirect(){
  const navigate = useNavigate()


  useEffect(()=>{
    navigate("/dashboard")
  },[])

    return(
        <div style={{fontWeight: 'bold'}}>404 NOT FOUND</div>
    );
}