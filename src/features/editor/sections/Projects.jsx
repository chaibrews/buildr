import styles from "../EditorForm.module.css";
import useEditableList from "../../../hooks/useEditableList";
import { emptyData } from "../../../data";

import FormField from "../../../components/FormField";
import FormTextArea from "../../../components/FormTextArea";
import SectionListItem from "../../../components/SectionListItem";
import SectionFormActions from "../../../components/SectionFormActions";

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
      {/* LIST VIEW */}
      {activeId === null ? (
        <>
          <ul>
            {data.projects.map((item) => (
              <SectionListItem
                key={item.id}
                label={item.title}
                onSelect={() => setActiveId(item.id)}
                onDelete={() => deleteItem(item.id)}
              />
            ))}
          </ul>

          <button className={styles.addButton} onClick={addItem}>
            + Add Project
          </button>
        </>
      ) : (
        <>
          {/* EDIT VIEW */}
          {PROJECT_FIELDS.map(([name, label]) => (
            <FormField
              key={name}
              name={name}
              label={label}
              value={proj[name]}
              onChange={(e) => updateItem(e.target.name, e.target.value)}
            />
          ))}

          <FormTextArea
            name="description"
            label="DESCRIPTION"
            value={proj.description}
            onChange={(e) => updateItem(e.target.name, e.target.value)}
          />

          <SectionFormActions
            onDelete={() => deleteItem(proj.id)}
            onSave={() => setActiveId(null)}
          />
        </>
      )}
    </section>
  );
}

export default Projects;
