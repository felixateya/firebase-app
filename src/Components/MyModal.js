import { Button, Modal } from "react-bootstrap";

function MyModal({ show, signout, handleClose }) {
  return (
    <div>
      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        centered
        data-bs-theme = "dark"
        show={show}
        onHide={handleClose}
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">Log Out</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to log out?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            No
          </Button>
          <Button variant="success" onClick={signout}>
            Yes, Sure.
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default MyModal;
