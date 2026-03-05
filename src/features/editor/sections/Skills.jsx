import styles from "../EditorForm.module.css";
import useEditableList from "../../../hooks/useEditableList";
import deleteIcon from "../../../assets/icons/delete.svg";
import { emptyData } from "../../../data";
import FormField from "../../../components/FormField";

function Skills({ data, setData }) {
  const {
    activeId,
    setActiveId,
    activeItem: skill,
    updateItem,
    deleteItem,
    addItem,
  } = useEditableList(data.skills, setData, "skills", emptyData.skills);

  return (
    <section>
      <h2>Skills</h2>

      {activeId === null ? (
        <>
          {/* LIST VIEW — shown when no item is selected */}
          <ul>
            {data.skills.map((item) => (
              <li key={item.id}>
                {/* Clicking the item selects it for editing */}
                <button
                  className={styles.listItem}
                  onClick={() => setActiveId(item.id)}
                >
                  {item.groupName || "Untitled"}
                </button>

                {/* Button to delete the skills entry */}
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

          {/* Button to add a new skills entry */}
          <button className={styles.addButton} onClick={addItem}>
            + Add Skills
          </button>
        </>
      ) : (
        <>
          {/* EDIT VIEW — shown when an item is selected */}

          <FormField
            name="groupName"
            label="SKILL GROUP"
            value={skill.groupName}
            onChange={(e) => updateItem(e.target.name, e.target.value)}
          />

          <FormField
            name="items"
            label="LIST OF SKILLS"
            value={skill.items}
            onChange={(e) => updateItem(e.target.name, e.target.value)}
          />

          {/* Action buttons for the active item */}
          <div className={styles.actionButtons}>
            {/* Delete the currently edited item */}
            <button
              className={styles.deleteButton}
              onClick={() => deleteItem(skill.id)}
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

export default Skills;
