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
  const salesData = [
    { name: "Jan", uv: 400, pv: 2400, amt: 2400 },
    { name: "Feb", uv: 300, pv: 1800, amt: 1800 },
    { name: "Mar", uv: 300, pv: 1800, amt: 1800 },
    { name: "Apr", uv: 200, pv: 1700, amt: 1700 },
    { name: "May", uv: 270, pv: 1900, amt: 1900 },
    { name: "Jun", uv: 200, pv: 1700, amt: 1700 },
  ];

  const earningsData = [
    {
      name: "Jan",
      expenses: 4000,
      income: 2400,
      amt: 2400,
    },
    {
      name: "Feb",
      expenses: 3000,
      income: 1398,
      amt: 2210,
    },
    {
      name: "Mar",
      expenses: 2000,
      income: 3500,
      amt: 2290,
    },
    {
      name: "Apr",
      expenses: 2780,
      income: 3908,
      amt: 2000,
    },
    {
      name: "May",
      expenses: 1890,
      income: 4800,
      amt: 2181,
    },
    {
      name: "Jun",
      expenses: 2390,
      income: 3800,
      amt: 2500,
    },
    {
      name: "Jul",
      expenses: 3490,
      income: 4300,
      amt: 2100,
    },
  ];

  
  const userData02 = [
    { name: "Jan", value: 100 },
    { name: "Feb", value: 300 },
    { name: "Mar", value: 100 },
    { name: "Apr", value: 80 },
    { name: "May", value: 40 },
    { name: "Jun", value: 30 },
    { name: "Jul", value: 50 },
    { name: "Aug", value: 100 },
    { name: "Sep", value: 200 },
    { name: "Oct", value: 150 },
    { name: "Nov", value: 50 },
    { name: "Dec", value: 30 },
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
        <div className="sales">
          <h1 style={{ color: "#f2f5f5", textAlign: 'center' }}>Sales</h1>
          <ResponsiveContainer width="90%" height="80%">
            <LineChart width={400} height={200}  data={salesData}>
            <Tooltip />
              <Line type="monotone" dataKey="uv" stroke="#f2f5f5" />
              <CartesianGrid stroke="#f2f5f5" />
              <XAxis stroke="#f2f5f5" dataKey="name" />
              <YAxis stroke="#f2f5f5" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="earnings">
          <h1 style={{ color: "#f2f5f5", textAlign: 'center' }}>Earnings</h1>
          <ResponsiveContainer width="100%" height="80%">
            <BarChart
              width={500}
              height={300}
              data={earningsData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <XAxis stroke="#f2f5f5" dataKey="name" />
              <YAxis stroke="#f2f5f5" />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="income"
                fill="#f2f5f5"
                activeBar={<Rectangle fill="pink" stroke="blue" />}
              />
              <Bar
                dataKey="expenses"
                fill="#37b9f1"
                activeBar={<Rectangle fill="gold" stroke="purple" />}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="users">
          <h1 style={{ color: "#f2f5f5", textAlign: 'center' }}>Users</h1>
          <ResponsiveContainer width="90%" height="80%">
            <PieChart width={400} height={400}>
            <Tooltip />
            <Legend />
              <Pie
                data={userData02}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={90}
                fill="#37b9f1"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
