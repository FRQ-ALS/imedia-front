import React , {useEffect} from "react";
import { useParams } from "react-router-dom";

export default function EmailVerification(){

    const params = useParams();
    const jsonArray = JSON.stringify(params)
    const token = JSON.parse(jsonArray).token

    useEffect(() =>{
        fetch("/api/v1/account/confirmEmail", {
            credentials: "include",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: token
          })
    },[])

    return(
        <div>You have confirmed your email address!</div>
    );
}