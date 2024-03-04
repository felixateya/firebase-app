import { Button, Modal } from "react-bootstrap";

function PassReset  ({ reset, modalShow, onHide }) {
  return (
    <div>
      <Modal
        show={modalShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        className="bg-dark bg-opacity-10"
        centered
      >
        <Modal.Header className=" border border-0 bg-gradient text-dark bg-info-subtle">
          <Modal.Title className="text-uppercase" id="contained-modal-title-vcenter">
            Reset Password
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className=" border border-0 bg-gradient text-dark bg-info-subtle">
          <h4>Password reset</h4>
          <p>
            click reset to reset your password. After that check your inbox to
            reset your password.
          </p>
        </Modal.Body>
        <Modal.Footer className=" bg-gradient border border-0 text-dark bg-info-subtle">
          <Button onClick={onHide}>Close</Button>
          <Button onClick={reset}>reset</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PassReset