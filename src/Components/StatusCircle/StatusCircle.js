import react, {useState} from "react";
import "./StatusCircle.css";

export default function StatusCircle(props) {
  const [approval, setApproval] = useState(props.variant)

  return (
    <div
      onMouseOver={(event) => console.log("Mouse Over " + props.taskId)}
      id="circle"
      className={approval}
    ></div>
  );
}
