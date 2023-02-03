import React from "react";
import "./BehaviourHome.css";

import { responsibilityPoints } from "./ResponPoints.js";
import TopScorersList from "../TopScorersList/TopScorersList";

export default function BehaviourHome() {
  return (
    <div id="behaviourHomeContainer">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "30px",
          width: "100%",
        }}
      >
        <div id="responsibilityPoints">
          {responsibilityPoints.map((point, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "8px",
                borderBottom: "1px solid white",
                paddingBottom: "5px",
              }}
            >
              <label id="pointsNumberLabel">{index + 1}</label>
              <div>{point}</div>
            </div>
          ))}
        </div>
        <TopScorersList />
      </div>
    </div>
  );
}
