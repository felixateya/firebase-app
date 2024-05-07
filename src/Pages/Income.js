import { Button } from "react-bootstrap";
import Table from "../Components/Table";

function Income() {
  return (
    <div className="income">
    <Button className="add" variant="primary">Add Income</Button>
    <Table>
        <Table.Header>
          <h2>Salary</h2>
          <h2>Expenses</h2>
          <h2>Revenue</h2>
          <h2>Sales</h2>
          <h2>Net Income</h2>
        </Table.Header>
        <Table.Header>
          <p>$2000</p>
          <p>$5678</p>
          <p>$234</p>
          <p>$5678</p>
          <p>$234</p>
        </Table.Header>
        <Table.Header>
          <p>$2000</p>
          <p>$5678</p>
          <p>$234</p>
          <p>$5678</p>
          <p>$234</p>
        </Table.Header>
        <Table.Header>
          <p>$2000</p>
          <p>$5678</p>
          <p>$234</p>
          <p>$5678</p>
          <p>$234</p>
        </Table.Header>
        <Table.Footer><h5>Fiscall LLC Yearly Income</h5></Table.Footer>
      </Table>
    </div>
  );
}

export default Income;
