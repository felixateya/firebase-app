import { Button } from "react-bootstrap";
import Table from "../Components/Table";


function Expenses() {
  return (
    <div className="expenses">
    <Button className="add" variant="primary">Add Expense</Button>
      <Table>
        <Table.Header>
          <h2>Salary</h2>
          <h2>Expenses</h2>
          <h2>Revenue</h2>
          <h2>Sales</h2>
          <h2>Other expenses</h2>
        </Table.Header>
        <Table.Row>
          <p>$2000</p>
          <p>$5678</p>
          <p>$234</p>
        </Table.Row>
        <Table.Footer><h5>Fiscall LLC Yearly Expenses</h5></Table.Footer>
      </Table>
    </div>
  );
}

export default Expenses;
