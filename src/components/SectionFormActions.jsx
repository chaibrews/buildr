import styles from "./Section.module.css";

function SectionFormActions({ onDelete, onSave }) {
  return (
    <div className={styles.actionButtons}>
      <button className={styles.deleteButton} onClick={onDelete}>
        Delete
      </button>
      <button className={styles.saveButton} onClick={onSave}>
        Save
      </button>
    </div>
  );
}

export default SectionFormActions;
