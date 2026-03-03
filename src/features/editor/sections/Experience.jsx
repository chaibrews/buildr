import styles from "../EditorForm.module.css";
import useEditableList from "../../../hooks/useEditableList";
import deleteIcon from "../../../assets/icons/delete.svg";
import { emptyData } from "../../../data";

const EXPERIENCE_FIELDS = [
  ["company", "COMPANY *"],
  ["position", "POSITION *"],
  ["dateFrom", "START DATE *"],
  ["dateTo", "END DATE *"],
];

function Experience({ data, setData }) {
  const {
    activeId,
    setActiveId,
    activeItem: exp,
    updateItem,
    deleteItem,
    addItem,
  } = useEditableList(
    data.experience,
    setData,
    "experience",
    emptyData.experience,
  );

  return (
    <section>
      <h2>Experience</h2>

      {/* LIST VIEW — shown when no item is selected */}
      {activeId === null ? (
        <>
          <ul>
            {data.experience.map((item) => (
              <li key={item.id}>
                {/* Clicking the item selects it for editing */}
                <button
                  className={styles.listItem}
                  onClick={() => setActiveId(item.id)}
                >
                  {item.company || "Untitled"}
                </button>

                {/* Button to delete the experience entry */}
                <button
                  className={styles.deleteButton}
                  onClick={() => deleteItem(item.id)}
                >
                  <img
                    src={deleteIcon}
                    alt="Delete"
                    className={styles.deleteIcon}
                  />
                </button>
              </li>
            ))}
          </ul>

          {/* Button to add a new experience entry */}
          <button className={styles.addButton} onClick={addItem}>
            + Add Experience
          </button>
        </>
      ) : (
        <>
          {/* EDIT VIEW — shown when an item is selected */}
          {EXPERIENCE_FIELDS.map(([name, label]) => (
            <div className={styles.formGroup} key={name}>
              <label htmlFor={name}>{label}</label>
              <input
                className={styles.formControl}
                name={name}
                id={name}
                value={exp[name]}
                onChange={(e) => updateItem(e.target.name, e.target.value)}
              />
            </div>
          ))}

          <div className={styles.formGroup}>
            <label htmlFor="description">DESCRIPTION</label>

            <textarea
              className={styles.formControl}
              name="description"
              id="description"
              value={exp.description}
              onChange={(e) => updateItem(e.target.name, e.target.value)}
            />
          </div>

          {/* Action buttons for the active item */}
          <div className={styles.actionButtons}>
            {/* Delete the currently edited item */}
            <button
              className={styles.deleteButton}
              onClick={() => deleteItem(exp.id)}
            >
              Delete
            </button>

            {/* Exit edit mode and return to list view */}
            <button
              className={styles.saveButton}
              onClick={() => setActiveId(null)}
            >
              Save
            </button>
          </div>
        </>
      )}
    </section>
  );
}

export default Experience;
