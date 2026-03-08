import styles from "./SectionListItem.module.css";
import trashIcon from "../assets/icons/delete.svg";

function SectionListItem({ label, onSelect, onDelete }) {
  return (
    <li>
      <button className={styles.listItem} onClick={onSelect}>
        {label || "Untitled"}
      </button>
      <button className={styles.trashBtn} onClick={onDelete}>
        <img src={trashIcon} alt="Delete" className={styles.trashIcon} />
      </button>
    </li>
  );
}

export default SectionListItem;
