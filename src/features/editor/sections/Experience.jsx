import styles from "../EditorForm.module.css";
import useEditableList from "../../../hooks/useEditableList";
import { EMPTY_ITEMS } from "../../../data";

import FormField from "../../../components/FormField";
import BulletListEditor from "../../../components/BulletListEditor";
import SectionListItem from "../../../components/SectionListItem";
import SectionFormActions from "../../../components/SectionFormActions";

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
    EMPTY_ITEMS.experience,
  );

  return (
    <section>
      <h2>Experience</h2>

      {/* LIST VIEW */}
      {activeId === null ? (
        <>
          <ul>
            {data.experience.map((item) => (
              <SectionListItem
                key={item.id}
                label={item.company}
                onSelect={() => setActiveId(item.id)}
                onDelete={() => deleteItem(item.id)}
              />
            ))}
          </ul>

          <button className={styles.addButton} onClick={addItem}>
            + Add Experience
          </button>
        </>
      ) : (
        <>
          {/* EDIT VIEW */}
          {EXPERIENCE_FIELDS.map(([name, label]) => (
            <FormField
              key={name}
              name={name}
              label={label}
              value={exp[name]}
              onChange={(e) => updateItem(e.target.name, e.target.value)}
            />
          ))}

          <BulletListEditor
            bullets={exp.bullets}
            onChange={(updated) => updateItem("bullets", updated)}
          />

          <SectionFormActions
            onDelete={() => deleteItem(exp.id)}
            onSave={() => setActiveId(null)}
          />
        </>
      )}
    </section>
  );
}

export default Experience;
