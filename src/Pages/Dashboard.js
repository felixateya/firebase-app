import React from "react";

function Dashboard() {
  const transactions = [
    { description: "Groceries", amount: -50 },
    { description: "Salary", amount: 2000 },
    { description: "Dinner", amount: -30 },
    { description: "Freelance Work", amount: 500 },
  ];

  return (
    <div className="dashboard">
      
      <div className="overview">
        <h2>Overview</h2>
        <p>Account Balance: $5000</p>
        <p>Net Worth: $20,000</p>
      </div>
      <div className="transactions">
        <h2>Recent Transactions</h2>
        <p>Transactions  Amount</p>
        {transactions.map((transaction, index) => (
          <>
            <ul key={index}>
              <li>
                {transaction.description}: {transaction.amount}
              </li>
            </ul>
          </>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
