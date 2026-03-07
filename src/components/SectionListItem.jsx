import styles from "./Section.module.css";
import deleteIcon from "../assets/icons/delete.svg";

function SectionListItem({ label, onSelect, onDelete }) {
  return (
    <li>
      <button className={styles.listItem} onClick={onSelect}>
        {label || "Untitled"}
      </button>
      <button className={styles.deleteButton} onClick={onDelete}>
        <img src={deleteIcon} alt="Delete" className={styles.deleteIcon} />
      </button>
    </li>
  );
}

export default SectionListItem;
