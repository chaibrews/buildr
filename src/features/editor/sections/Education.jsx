import styles from "../EditorForm.module.css";
import useEditableList from "../../../hooks/useEditableList";
import deleteIcon from "../../../assets/icons/delete.svg";
import { emptyData } from "../../../data";

const EDUCATION_FIELDS = [
  ["school", "SCHOOL *"],
  ["degree", "DEGREE *"],
  ["dateGraduated", "DATE OF GRADUATION *"],
];

function Education({ data, setData }) {
  const {
    activeId,
    setActiveId,
    activeItem: edu,
    updateItem,
    deleteItem,
    addItem,
  } = useEditableList(
    data.education,
    setData,
    "education",
    emptyData.education,
  );

  return (
    <section>
      <h2>Education</h2>

      {/* LIST VIEW — shown when no item is selected */}
      {activeId === null ? (
        <>
          <ul>
            {data.education.map((item) => (
              <li key={item.id}>
                {/* Clicking the item selects it for editing */}
                <button
                  className={styles.listItem}
                  onClick={() => setActiveId(item.id)}
                >
                  {item.school || "Untitled"}
                </button>

                {/* Button to delete the education entry */}
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

          {/* Button to add a new education entry */}
          <button className={styles.addButton} onClick={addItem}>
            + Add Education
          </button>
        </>
      ) : (
        <>
          {/* EDIT VIEW — shown when an item is selected */}
          {EDUCATION_FIELDS.map(([name, label]) => (
            <div className={styles.formGroup} key={name}>
              <label htmlFor={name}>{label}</label>
              <input
                className={styles.formControl}
                name={name}
                id={name}
                value={edu[name]}
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
              value={edu.description}
              onChange={(e) => updateItem(e.target.name, e.target.value)}
            />
          </div>

          {/* Action buttons for the active item */}
          <div className={styles.actionButtons}>
            {/* Delete the currently edited item */}
            <button
              className={styles.deleteButton}
              onClick={() => deleteItem(edu.id)}
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

export default Education;
