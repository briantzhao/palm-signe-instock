import Modal from "react-modal";
import "./DeleteModal.scss";

export default function DeleteModal(props) {
  return (
    <Modal
      isOpen={props.modalState}
      ariaHideApp={false}
      className="delete-modal"
      overlayClassName="delete-modal__overlay"
      onRequestClose={() => {
        props.hideModal();
      }}
    >
      <div className="delete-modal__top">
        <button className="delete-modal__exit">
          <span onClick={props.hideModal} className="delete-modal__exit-icon">
            &times;
          </span>
        </button>
        <h1 className="delete-modal__heading">
          Delete {props.currentItems} {props.page}?
        </h1>
      </div>
      <p className="delete-modal__text">
        Please confirm that you'd like to delete {props.currentItems} from the{" "}
        {props.pageList}. You won't be able to undo this action.
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
            alert(`${props.currentItems} is deleted.`);
            props.deleteItem();
            props.hideModal();
          }}
          className="delete-modal__button delete-modal__button--delete"
        >
          Delete
        </button>
      </div>
    </Modal>
  );
}
