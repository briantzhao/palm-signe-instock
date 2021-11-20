import Modal from "react-modal";
import "./DeleteModal.scss";

export default function DeleteModal(props) {
  return (
    <Modal
      isOpen={props.modalState}
      ariaHideApp={false}
      className="delete-modal"
    >
      {console.log(props.currentItems.itemName)}
      <span onClick={props.hideModal} className="delete-modal__exit">
        &times;
      </span>
      <h1 className="delete-modal__heading">
        Delete {props.currentItems.itemName} {props.page}?
      </h1>
      <p className="delete-modal__text">
        Please confirm that you'd like to delete {props.currentItems.itemName}{" "}
        from the {props.pageList}. You won't be able to undo this action.
      </p>

      <div className="delete-modal__buttons-container">
        <button
          onClick={props.hideModal}
          className="delete-modal__button delete-modal__button--cancel"
        >
          Cancel
        </button>

        <button
          onClick={() => {
            alert(`${props.currentItems.itemName} is deleted.`);
            props.deleteItem();
            props.hideModal();
          }}
          className="delete-modal__button delete-modal__button--cancel"
        >
          Delete
        </button>
      </div>
    </Modal>
  );
}
