import styles from "../EditorForm.module.css";
import useEditableList from "../../../hooks/useEditableList";
import { EMPTY_ITEMS } from "../../../data";

import FormField from "../../../components/FormField";
import SectionListItem from "../../../components/SectionListItem";
import SectionFormActions from "../../../components/SectionFormActions";

function Skills({ data, setData }) {
  const {
    activeId,
    setActiveId,
    activeItem: skill,
    updateItem,
    deleteItem,
    addItem,
  } = useEditableList(data.skills, setData, "skills", EMPTY_ITEMS.skills);

  return (
    <section>
      <h2>Skills</h2>

      {activeId === null ? (
        <>
          {/* LIST VIEW */}
          <ul>
            {data.skills.map((item) => (
              <SectionListItem
                key={item.id}
                label={item.groupName || "Untitled"}
                onSelect={() => setActiveId(item.id)}
                onDelete={() => deleteItem(item.id)}
              />
            ))}
          </ul>

          <button className={styles.addButton} onClick={addItem}>
            + Add Skills
          </button>
        </>
      ) : (
        <>
          {/* EDIT VIEW */}
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

          <SectionFormActions
            onDelete={() => deleteItem(skill.id)}
            onSave={() => setActiveId(null)}
          />
        </>
      )}
    </section>
  );
}

export default Skills;
