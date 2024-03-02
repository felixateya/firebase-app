import { Button, Modal } from "react-bootstrap"

function MyModal({show, signout, handleClose}) {
    return (
        <div>
            

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Log Out</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to log out?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No 
          </Button>
          <Button variant="primary" onClick={signout}>
            Yes, Sure.
          </Button>
        </Modal.Footer>
      </Modal>
        </div>
    )
}

export default MyModal
