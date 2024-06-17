import { Button, Form, Modal, Table, Spinner } from "react-bootstrap";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  setDoc,
  where,
  deleteDoc,
} from "firebase/firestore";
import { app } from "../Firebase";
import { useLayoutEffect, useRef, useState, useCallback } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";
import { FaTrashAlt } from "react-icons/fa";

function Income() {
  const db = getFirestore(app);
  const auth = getAuth();
  const [show, setShow] = useState(false);
  const applianceRef = useRef();
  const electronicsRef = useRef();
  const exportsRef = useRef();
  const servicesRef = useRef();
  const hardwareRef = useRef();
  const [incomeList, setIncomeList] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);

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

    if (
      !appliances ||
      !electronics ||
      !incomeExport ||
      !services ||
      !hardware
    ) {
      toast.error("Please fill in all fields");
      return;
    }

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
        })
          .then(() => {
            setRefresh((prev) => !prev);
            toast.success("income added successfuly");
          })
          .catch((error) => {
            console.log(error);
            toast.error(error.message);
          });
      }
    });

    handleClose();
  };

  const fetchIncome = useCallback(async (user) => {
    setLoading(true);
    try {
      let incomeItem = [];
      const queryDocument = query(
        collection(db, "income"),
        where("userID", "==", user.uid),
        orderBy("timestamp", "desc")
      );
      const querySnapShot = await getDocs(queryDocument);
      querySnapShot.forEach((IncomeDoc) => {
        incomeItem.push({
          Id: IncomeDoc.data().incomeID,
          ...IncomeDoc.data(),
        });
      });
      setIncomeList(incomeItem);
    } catch (error) {
      console.error("Error fetching income data", error);
    } finally {
      setLoading(false);
    }
  }, [db]);

  useLayoutEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchIncome(user);
      }
    });

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, [auth, fetchIncome, refresh]);

  const handleDelete = (id) => {
    deleteDoc(doc(db, "income", id))
      .then(() => {
        setRefresh((ref) => !ref);
        toast.success("Deleted succesfully");
      })
      .catch((error) => {
        toast.error(error.message);
      });
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
            <th></th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="6">
                <td colSpan="6">
                  <Spinner animation="border" />
                </td>
              </td>
            </tr>
          ) : (
            incomeList.map((incomeItem) => (
              <tr key={incomeItem.Id}>
                <td>Jan</td>
                <td>{incomeItem.appliances}</td>
                <td>{incomeItem.electronics}</td>
                <td>{incomeItem.incomeExport}</td>
                <td>{incomeItem.services}</td>
                <td>{incomeItem.hardware}</td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(incomeItem.Id)}
                  >
                    <FaTrashAlt />
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      <Toaster position="top-right" reverseOrder={false} />
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
  const { applianceRef, exportsRef, electronicsRef, servicesRef, hardwareRef } =
    props;
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Income
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="bg-dark text-white">
          <Modal.Title>Income</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-white">
          <Form id="addIncome" onSubmit={handleAddIncome}>
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
          <Button type="submit" onClick={handleAddIncome} variant="primary">
            Add Income
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
