import { Button, Table } from "react-bootstrap";



function Expenses() {
  return (
    <div className="expenses">
    <Button className="add" variant="primary">Add Expense</Button>
    <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Month</th>
            <th>Appliances</th>
            <th>Electronics</th>
            <th>Exports</th>
            <th>services</th>
            <th>hardware</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Jan</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>@mdo</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>Feb</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Mar</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Apr</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Jun</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default Expenses;
