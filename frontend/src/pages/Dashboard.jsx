import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";

import { Line, Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import "../styles/dashboard.css";

export default function Dashboard() {

  const lineData = {
    labels: ["Mar 1","Mar 8","Mar 15","Mar 22","Mar 29"],
    datasets: [
      {
        label: "Present",
        data: [85,92,94,97,91],
        borderColor: "#2ecc71",
        backgroundColor: "rgba(46,204,113,0.2)",
        fill: true,
        tension: 0.4
      },
      {
        label: "Absent",
        data: [50,55,53,58,52],
        borderColor: "#e74c3c",
        backgroundColor: "rgba(231,76,60,0.2)",
        fill: true,
        tension: 0.4
      }
    ]
  };

  const doughnutData = {
    labels: ["Present","Absent"],
    datasets: [
      {
        data: [84,16],
        backgroundColor: ["#27ae60","#f39c12"]
      }
    ]
  };

  return (
    <div>
      <Navbar />

      <div className="layout">
        <Sidebar />

        <div className="content">

          <h1>Welcome to Attendance Dashboard</h1>
          <p className="subtitle">Track Your Attendance Status Easily</p>

          <div className="stats-row">
            <StatCard title="Total Classes" value="45" color="blue" />
            <StatCard title="Present" value="38" color="green" />
            <StatCard title="Absent" value="7" color="red" />
          </div>

          <div className="charts-row">
            <div className="chart-card">
              <h3>Attendance Overview</h3>
              <Line data={lineData} />
            </div>

            <div className="chart-card">
              <h3>Overall Attendance</h3>
              <Doughnut data={doughnutData} />
            </div>
          </div>

          <div className="bottom-row">

            <div className="table-card">
              <h3>Recent Attendance</h3>
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Subject</th>
                    <th>Status</th>
                    <th>Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>05 Apr</td>
                    <td>DBMS</td>
                    <td className="present">Present</td>
                    <td>On Time</td>
                  </tr>
                  <tr>
                    <td>04 Apr</td>
                    <td>Web Tech</td>
                    <td className="absent">Absent</td>
                    <td>Medical Leave</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="schedule-card">
              <h3>Today's Schedule</h3>
              <p>9:00 AM - Database Management</p>
              <p>11:00 AM - Web Technologies</p>
              <p>1:00 PM - Mathematics</p>
              <p>3:00 PM - Computer Networks</p>
              <button>View Full Timetable</button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}