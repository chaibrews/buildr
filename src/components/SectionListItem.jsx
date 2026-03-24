import styles from "./SectionListItem.module.css";
import buttonStyles from "../components/buttons.module.css";

function SectionListItem({ label, onSelect, onDelete, dragHandleProps }) {
  return (
    <li className={styles.item}>
      {dragHandleProps && (
        <span className={styles.dragHandle} {...dragHandleProps}></span>
      )}
      <button className={styles.listItem} onClick={onSelect}>
        {label || <span className={styles.empty}>Untitled</span>}
      </button>
      <button className={buttonStyles.deleteBtn} onClick={onDelete}>
        ×
      </button>
    </li>
  );
}

export default SectionListItem;
