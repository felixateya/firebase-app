import { Button } from "react-bootstrap";
import Table from "../Components/Table";


function Expenses() {
  return (
    <div className="expenses">
    <Button className="add" variant="primary">Add Expense</Button>
      <Table>
        <Table.Header>
          <Table.Row>Salary</Table.Row>
          <Table.Row>Utilities</Table.Row>
          <Table.Row>Other Expenses</Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>$2000</Table.Row>
          <Table.Row>$5678</Table.Row>
          <Table.Row>$234</Table.Row>
        </Table.Body>
        <Table.Footer><h5>Expenses</h5></Table.Footer>
      </Table>
    </div>
  );
}

export default Expenses;
