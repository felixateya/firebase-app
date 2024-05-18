import { Button, Form, Modal, Table } from "react-bootstrap";
import { collection, doc, getFirestore, setDoc } from "firebase/firestore";
import { app } from "../Firebase";
import { useRef, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";

function Income() {
  const db = getFirestore(app);
  const auth = getAuth();
  const [show, setShow] = useState(false);
  const applianceRef = useRef();
  const electronicsRef = useRef();
  const exportsRef = useRef();
  const servicesRef = useRef();
  const hardwareRef = useRef();

  const handleShow = () => {
    setShow((s) => !s);
  };
  const handleClose = () => {
    setShow((s) => !s);
  };

  const handleAddIncome = () => {
    
    const appliances = applianceRef.current.value;
    const electronics = electronicsRef.current.value;
    const incomeExport = exportsRef.current.value;
    const services = servicesRef.current.value;
    const hardware = hardwareRef.current.value;

    onAuthStateChanged(auth, (user) => {
      if (user) {
        const newIncome = doc(collection(db, "income"));
        setDoc(newIncome, {
          userID: user.uid,
          incomeID: newIncome.id,
          electronics: electronics,
          appliances: appliances,
          incomeExport: incomeExport,
          services: services,
          hardware: hardware,
          timestamp: new Date().getTime(),
        }).then(() => {
          toast.success("income added successfuly")
          window.location.reload();
        }).catch((error)=>{
            console.log(error)
            toast.error(error.message)
        })

        
      }
    });

    handleClose();
  };
  return (
    <div className="income">
      <IncomeModal
        handleAddIncome={handleAddIncome}
        handleShow={handleShow}
        show={show}
        handleClose={handleClose}
        applianceRef={applianceRef}
        electronicsRef={electronicsRef}
        exportsRef={exportsRef}
        servicesRef={servicesRef}
        hardwareRef={hardwareRef}
      />
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
      <Toaster position="top-right" reverseOrder={false}/>
    </div>
  );
}

export default Income;

const IncomeModal = ({
  handleAddIncome,
  show,
  handleShow,
  handleClose,
  ...props
}) => {
  const {
    applianceRef,
    exportsRef,
    electronicsRef,
    servicesRef,
    hardwareRef,
  } = props;
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Income
      </Button>

      <Modal  show={show} onHide={handleClose}>
        <Modal.Header className="bg-dark text-white">
          <Modal.Title>Income</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-white">
          <Form id="addIncome" onSubmit={handleAddIncome}>
            
            <Form.Group>
              <Form.Label>Appliances</Form.Label>
              <Form.Control className="bg-dark text-white"
                ref={applianceRef}
                autoFocus
                placeholder="Appliances"
                type="text"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Electronics</Form.Label>
              <Form.Control className="bg-dark text-white"
                ref={electronicsRef}
                placeholder="Electronics"
                type="text"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Exports</Form.Label>
              <Form.Control className="bg-dark text-white"
                ref={exportsRef}
                placeholder="Exports"
                type="text"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Services</Form.Label>
              <Form.Control className="bg-dark text-white"
                ref={servicesRef}
                placeholder="Services"
                type="text"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Hardware</Form.Label>
              <Form.Control className="bg-dark text-white"
                ref={hardwareRef}
                placeholder="Hardware"
                type="text"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="bg-dark">
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleAddIncome} variant="primary">
            Add Income
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
