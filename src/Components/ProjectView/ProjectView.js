import React from "react";

import { useParams } from "react-router-dom";


export default function ProjectView(){

    const params = useParams();
    const jsonArray = JSON.stringify(params)
    const id = JSON.parse(jsonArray).id


    return(<div>{id}</div>)


}