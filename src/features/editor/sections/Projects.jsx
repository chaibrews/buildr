import styles from "../EditorForm.module.css";
import useEditableList from "../../../hooks/useEditableList";
import deleteIcon from "../../../assets/icons/delete.svg";
import { emptyData } from "../../../data";

const PROJECT_FIELDS = [
  ["title", "TITLE *"],
  ["link", "LINK *"],
];

function Projects({ data, setData }) {
  const {
    activeId,
    setActiveId,
    activeItem: proj,
    updateItem,
    deleteItem,
    addItem,
  } = useEditableList(data.projects, setData, "projects", emptyData.projects);

  return (
    <section>
      <h2>Projects</h2>
      {/* LIST VIEW — shown when no item is selected */}
      {activeId === null ? (
        <>
          <ul>
            {data.projects.map((item) => (
              <li key={item.id}>
                {/* Clicking the item selects it for editing */}
                <button
                  className={styles.listItem}
                  onClick={() => setActiveId(item.id)}
                >
                  {item.title || "Untitled"}
                </button>

                {/* Button to delete the project entry */}
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

          {/* Button to add a new project entry */}
          <button className={styles.addButton} onClick={addItem}>
            + Add Project
          </button>
        </>
      ) : (
        <>
          {/* EDIT VIEW — shown when an item is selected */}
          {PROJECT_FIELDS.map(([name, label]) => (
            <div className={styles.formGroup} key={name}>
              <label htmlFor={name}>{label}</label>
              <input
                className={styles.formControl}
                name={name}
                id={name}
                value={proj[name]}
                required
                onChange={(e) => updateItem(e.target.name, e.target.value)}
              />
            </div>
          ))}

          <div className={styles.formGroup}>
            <label htmlFor="description">DESCRIPTION *</label>

            <textarea
              className={styles.formControl}
              name="description"
              id="description"
              value={proj.description}
              onChange={(e) => updateItem(e.target.name, e.target.value)}
            />
          </div>

          {/* Action buttons for the active item */}
          <div className={styles.actionButtons}>
            {/* Delete the currently edited item */}
            <button
              className={styles.deleteButton}
              onClick={() => deleteItem(proj.id)}
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

export default Projects;
