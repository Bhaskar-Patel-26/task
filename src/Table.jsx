import React, { useState, useEffect } from "react";
import "./Table.css";

const Table = () => {
  const [notebooks, setNotebooks] = useState([]);

  useEffect(() => {
    fetch("https://demo.4pointx.com/_notebooks/notebooks/_all", {
      method: "get",
      headers: {
        Authorization: "Basic YWRtaW46OGtRM1VuVlVtU2dUWTBSWQ==",
      },
    })
      .then((response) => response.json())
      .then((json) => setNotebooks(json));
  }, []);

  const sec = 1688628180000;

  let time = new Date(sec);

  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  }

  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  var monthName = months[time.getMonth()];
  console.log(monthName, time.getDate(), time.getFullYear(), formatAMPM(time));
  const date =
    (monthName, time.getDate(), time.getFullYear(), formatAMPM(time));
  let created;
  let updated;
  return (
    <div>
      <table>
        <tr>
          <th>notebook_name</th>
          <th>updated_at</th>
          <th>updated_by</th>
          <th>created_at</th>
          <th>last_run</th>
          <th>created_by</th>
          <th>no_of_runs</th>
          <th>notebook_id</th>
          <th>status</th>
        </tr>

        {notebooks.map((item) => (
          <tr>
            <td>{item.notebook_name}</td>
            <td>{(updated = new Date(item.updated_at).toLocaleString())}</td>
            <td>{item.updated_by}</td>
            <td>{(created = new Date(item.created_at).toLocaleString())}</td>
            <td>{!item.last_run ? "-" : item.last_run}</td>
            <td>{item.created_by}</td>
            <td>{item.no_of_runs}</td>
            <td>{item.notebook_id}</td>
            <td>{item.status}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default Table;
