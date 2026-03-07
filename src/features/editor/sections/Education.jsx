import styles from "../EditorForm.module.css";
import useEditableList from "../../../hooks/useEditableList";
import { emptyData } from "../../../data";

import FormField from "../../../components/FormField";
import FormTextArea from "../../../components/FormTextArea";
import SectionListItem from "../../../components/SectionListItem";
import SectionFormActions from "../../../components/SectionFormActions";

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

      {/* LIST VIEW */}
      {activeId === null ? (
        <>
          <ul>
            {data.education.map((item) => (
              <SectionListItem
                key={item.id}
                label={item.school}
                onSelect={() => setActiveId(item.id)}
                onDelete={() => deleteItem(item.id)}
              />
            ))}
          </ul>

          <button className={styles.addButton} onClick={addItem}>
            + Add Education
          </button>
        </>
      ) : (
        <>
          {/* EDIT VIEW */}
          {EDUCATION_FIELDS.map(([name, label]) => (
            <FormField
              key={name}
              name={name}
              label={label}
              value={edu[name]}
              onChange={(e) => updateItem(e.target.name, e.target.value)}
            />
          ))}

          <FormTextArea
            name="description"
            label="DESCRIPTION"
            value={edu.description}
            onChange={(e) => updateItem(e.target.name, e.target.value)}
          />

          <SectionFormActions
            onDelete={() => deleteItem(edu.id)}
            onSave={() => setActiveId(null)}
          />
        </>
      )}
    </section>
  );
}

export default Education;
