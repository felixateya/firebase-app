import { getAuth} from "firebase/auth";
import {
  collection,
  getFirestore,
  query,
  orderBy,
  where,
  getDocs,
  setDoc,
  doc
} from "firebase/firestore";
import { useState, useLayoutEffect, useRef } from "react";
import { Button, Table, Form, Modal, Spinner} from "react-bootstrap";
import { app } from "../Firebase";
import toast, { Toaster } from "react-hot-toast";
 

function Expenses() {
  const auth = getAuth();
  const db = getFirestore(app);
  const [refresh, setRefresh] = useState(false);
  const [expenseList, setExpenseList] = useState([]);
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    const fetchExpenses = async () => {
      setLoading(true);
      try {
        const user = auth.currentUser;
        if (user) {
          const expenseItems = [];
          const queryDocument = query(
            collection(db, "expenses"),
            where("userID", "==", user.uid),
            orderBy("timestamp", "desc")
          );

          const querySnapshot = await getDocs(queryDocument);
          querySnapshot.forEach((expenseDoc) => {
            expenseItems.push({ Id: expenseDoc.id, ...expenseDoc.data() });
          });
          setExpenseList(expenseItems);
        }
      } catch (error) {
        console.error("Error fetching expenses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();

    // Clean up the effect when component unmounts
    return () => {
      setExpenseList([]);
    };
  }, [auth, db, refresh]);

  return (
    <div className="expenses">
      <ExpensesModal setRefresh={setRefresh} />
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Month</th>
            <th>Appliances</th>
            <th>Electronics</th>
            <th>Exports</th>
            <th>Services</th>
            <th>Hardware</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="6"><Spinner animation="grow" /></td>
            </tr>
          ) : (
            expenseList.map((expenseItem) => (
              <tr key={expenseItem.Id}>
                <td>Jan</td>
                <td>{expenseItem.appliances}</td>
                <td>{expenseItem.electronics}</td>
                <td>{expenseItem.incomeExport}</td>
                <td>{expenseItem.services}</td>
                <td>{expenseItem.hardware}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}

export default Expenses;






const ExpensesModal = ({ setRefresh }) => {
  const [show, setShow] = useState(false);
  const applianceRef = useRef();
  const electronicsRef = useRef();
  const exportsRef = useRef();
  const servicesRef = useRef();
  const hardwareRef = useRef();

  const auth = getAuth();
  const db = getFirestore(app);

  const handleShow = () => setShow((s) => !s);

  const handleClose = () => setShow((s) => !s);

  const handleAddExpense = async () => {
    const appliances = applianceRef.current.value;
    const electronics = electronicsRef.current.value;
    const incomeExport = exportsRef.current.value;
    const services = servicesRef.current.value;
    const hardware = hardwareRef.current.value;

    if (!appliances || !electronics || !incomeExport || !services || !hardware) {
      toast.error("Please fill in all fields");
      return;
    }

    const user = auth.currentUser;
    if (user) {
      try {
        const newExpenseRef = doc(collection(db, "expenses"));
        await setDoc(newExpenseRef, {
          userID: user.uid,
          expenseID: newExpenseRef.id,
          electronics,
          appliances,
          incomeExport,
          services,
          hardware,
          timestamp: new Date().getTime(),
        });
        handleClose();
        toast.success("Expense successfully added");
        setRefresh((prev) => !prev);
      } catch (error) {
        console.error("Error adding expense:", error);
        toast.error("Error adding expense");
      }
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Expense
      </Button>

      <Modal  show={show} onHide={handleClose}>
        <Modal.Header className="bg-dark text-white">
          <Modal.Title>Add Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-white">
          <Form id="addExpense">
            <Form.Group>
              <Form.Label>Appliances</Form.Label>
              <Form.Control
                className="bg-dark text-white"
                ref={applianceRef}
                autoFocus
                placeholder="Appliances"
                type="text"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Electronics</Form.Label>
              <Form.Control
                className="bg-dark text-white"
                ref={electronicsRef}
                placeholder="Electronics"
                type="text"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Exports</Form.Label>
              <Form.Control
                className="bg-dark text-white"
                ref={exportsRef}
                placeholder="Exports"
                type="text"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Services</Form.Label>
              <Form.Control
                className="bg-dark text-white"
                ref={servicesRef}
                placeholder="Services"
                type="text"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Hardware</Form.Label>
              <Form.Control
                className="bg-dark text-white"
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
          <Button type="button" onClick={handleAddExpense} variant="primary">
            Add Expense
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};


