import buttonStyles from "./buttons.module.css";

function SectionFormActions({ onDelete, onSave }) {
  return (
    <div className={buttonStyles.editViewBtns}>
      <button
        className={buttonStyles.dangerBtn + " " + buttonStyles.actionBtn}
        onClick={onDelete}
      >
        DELETE
      </button>
      <button
        className={buttonStyles.saveBtn + " " + buttonStyles.actionBtn}
        onClick={onSave}
      >
        SAVE
      </button>
    </div>
  );
}

export default SectionFormActions;
