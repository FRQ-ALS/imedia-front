import React from "react";
import "./TopScorersList.css";
import StarIcon from '@mui/icons-material/Star';
const students = [
  { name: "Student", score: 100 },
  { name: "Student", score: 99 },
  { name: "Student", score: 98 },
  { name: "Student", score: 97 },
  { name: "Student", score: 96 },
  { name: "Student", score: 95 },
  { name: "Student", score: 95 },
  { name: "Student", score: 95 },
  { name: "Student", score: 95 },
  { name: "Student", score: 95 },
  { name: "Student", score: 95 },
  { name: "Student", score: 95 },

];
export default function TopScorersList() {
  return (
    //style={{ outline:'1px solid black', borderRadius:'20px', fontFamily:'Tahoma'}}
    <div  id="topScorersContainer">

      <table className="styled-table">
        <thead id="rankingTableHead">
            <tr>
            <th colSpan={4} style={{color:'white'}}>Weekly Student Ranking</th>

            </tr>
           
        </thead>
        <tbody id="rankingTableBody">
            {students.map((student, index)=>(<tr id="rankingTableRow" key={index}>
                <td style={{color:'red', fontWeight:'bold'}}>{index+1}</td>
                <td>{student.name}</td>
                <td>{student.score}</td>
                <td>{index===0 ? <StarIcon style={{color:'gold'}}/>: null}</td>
            </tr>))}
        </tbody>
      </table>
    </div>
  );
}


