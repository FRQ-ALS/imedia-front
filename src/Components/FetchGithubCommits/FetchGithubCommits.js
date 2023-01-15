import React, { useEffect, useState } from "react";
import StatusCircle from "../StatusCircle/StatusCircle";

export default function FetchGithubCommits() {
  const [userName, setUserName] = useState(null);
  const [approval, setApproval] = useState("");
  const [dataLoaded, setDataLoaded] = useState(false);
  const [data, setData] = useState(null);

  const tasks = [
    {
      id: 1,
      task: "added email service back",
    },
    {
      id: 2,
      task: "Do this",
    },
    {
      id: 3,
      task: "Do that",
    },
  ];

  const getData = () => {
    fetch("/api/v1/account/github", {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        console.log(data)
        setDataLoaded(true)
      });
  };

  useEffect(() => {
    getData();
  }, []);

  function checkVerified(phrase){
    for(let i = 0; i < data.length; i++){
      if(data[i].commit.message.includes(phrase)){
        return "approved"
      }
    }

    return ""

  }


  function conditionalRender() {
    if (!dataLoaded) {

      return <div>Loading...</div>;
    }

    if (dataLoaded) {
      return (
        <div id="taskwrapper">
          {tasks.map((task) => (
            <div id="container" className="">
              <div>{task.task} {data[0].commit.message}</div>
              <StatusCircle taskId={task.id}
              variant={checkVerified(task.task)} />
            </div>
          ))}
        </div>
      );
    }
  }


  return(<div>{conditionalRender()}</div>)
}
