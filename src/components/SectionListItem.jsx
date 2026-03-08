import styles from "./SectionListItem.module.css";
import buttonStyles from "../components/buttons.module.css";

function SectionListItem({ label, onSelect, onDelete }) {
  return (
    <li>
      <button className={styles.listItem} onClick={onSelect}>
        {label || "Untitled"}
      </button>
      <button className={buttonStyles.deleteBtn} onClick={onDelete}>
        ×
      </button>
    </li>
  );
}

export default SectionListItem;
