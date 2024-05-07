import React from "react";
import { FaDollarSign, FaBookmark, FaChartLine, FaUser } from "react-icons/fa";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
function Dashboard() {
  const EarningsData = [
    { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
    { name: "Page B", uv: 300, pv: 1800, amt: 1800 },
    { name: "Page C", uv: 300, pv: 1800, amt: 1800 },
    { name: "Page D", uv: 200, pv: 1700, amt: 1700 },
    { name: "Page E", uv: 270, pv: 1900, amt: 1900 },
    { name: "Page F", uv: 200, pv: 1700, amt: 1700 },
  ];

  const salesData = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  const userData01 = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
  ];
  const userData02 = [
    { name: "A1", value: 100 },
    { name: "A2", value: 300 },
    { name: "B1", value: 100 },
    { name: "B2", value: 80 },
    { name: "B3", value: 40 },
    { name: "B4", value: 30 },
    { name: "B5", value: 50 },
    { name: "C1", value: 100 },
    { name: "C2", value: 200 },
    { name: "D1", value: 150 },
    { name: "D2", value: 50 },
  ];
  return (
    <div className="dashboard">
      <div className="overview">
        <div className="ov-one">
          <div>
            <p>Revenue</p>
            <h1>$34k</h1>
          </div>
          <p className="dash-icon">
            <FaDollarSign />
          </p>
        </div>
        <div className="ov-one">
          <div>
            <p>Orders</p>
            <h1>811</h1>
          </div>
          <p className="dash-icon">
            <FaBookmark />
          </p>
        </div>
        <div className="ov-one">
          <div>
            <p>Profit</p>
            <h1>$2.3k</h1>
          </div>

          <p className="dash-icon">
            <FaChartLine />
          </p>
        </div>
        <div className="ov-one">
          <div>
            <p>Users</p>
            <h1>762</h1>
          </div>
          <p className="dash-icon">
            <FaUser />
          </p>
        </div>
      </div>
      <div className="transactions">
        <div className="earnings">
          <h1 style={{ color: "#f2f5f5" }}>Earnings</h1>
          <ResponsiveContainer width="90%" height="80%">
            <LineChart width={400} height={200} data={EarningsData}>
            <Tooltip />
              <Line type="monotone" dataKey="uv" stroke="#f2f5f5" />
              <CartesianGrid stroke="#f2f5f5" />
              <XAxis stroke="#f2f5f5" dataKey="name" />
              <YAxis stroke="#f2f5f5" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="sales">
          <h1 style={{ color: "#f2f5f5" }}>Sales</h1>
          <ResponsiveContainer width="100%" height="80%">
            <BarChart
              width={500}
              height={300}
              data={salesData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis stroke="#f2f5f5" dataKey="name" />
              <YAxis stroke="#f2f5f5" />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="pv"
                fill="#f2f5f5"
                activeBar={<Rectangle fill="pink" stroke="blue" />}
              />
              <Bar
                dataKey="uv"
                fill="#000222"
                activeBar={<Rectangle fill="gold" stroke="purple" />}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="users">
          <h1 style={{ color: "#f2f5f5" }}>Users</h1>
          <ResponsiveContainer width="90%" height="80%">
            <PieChart width={400} height={400}>
            <Tooltip />
              <Pie
                data={userData01}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={60}
                fill="#f2f5f5"
              />
              <Pie
                data={userData02}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={90}
                fill="#000222"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
