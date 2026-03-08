import buttonStyles from "./buttons.module.css";

function SectionListActions({ addLabel, onAdd, onClearSection }) {
  return (
    <div className={buttonStyles.listViewBtns}>
      <button
        className={buttonStyles.dangerBtn + " " + buttonStyles.actionBtn}
        onClick={onClearSection}
      >
        CLEAR
      </button>
      <button
        className={buttonStyles.addBtn + " " + buttonStyles.actionBtn}
        onClick={onAdd}
      >
        + {addLabel}
      </button>
    </div>
  );
}

export default SectionListActions;
