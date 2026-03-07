import styles from "../Editor.module.css";
import useEditableList from "../../../hooks/useEditableList";
import { EMPTY_ITEMS } from "../../../data";

import FormField from "../../../components/FormField";
import SectionListItem from "../../../components/SectionListItem";
import SectionFormActions from "../../../components/SectionFormActions";

const CERTIFICATE_FIELDS = [
  ["name", "NAME *"],
  ["organization", "ORGANIZATION *"],
  ["dateIssued", "ISSUE DATE *"],
];

function Certificates({ data, setData }) {
  const {
    activeId,
    setActiveId,
    activeItem: cert,
    updateItem,
    deleteItem,
    addItem,
  } = useEditableList(
    data.certificates,
    setData,
    "certificates",
    EMPTY_ITEMS.certificates,
  );

  return (
    <section>
      <h2>Certificates</h2>
      {/* LIST VIEW */}
      {activeId === null ? (
        <>
          <ul>
            {data.certificates.map((item) => (
              <SectionListItem
                key={item.id}
                label={item.name || "Untitled"}
                onSelect={() => setActiveId(item.id)}
                onDelete={() => deleteItem(item.id)}
              />
            ))}
          </ul>

          <button className={styles.addButton} onClick={addItem}>
            + Add Certificate
          </button>
        </>
      ) : (
        <>
          {/* EDIT VIEW */}
          {CERTIFICATE_FIELDS.map(([name, label]) => (
            <FormField
              key={name}
              name={name}
              label={label}
              value={cert[name]}
              onChange={(e) => updateItem(e.target.name, e.target.value)}
            />
          ))}

          <SectionFormActions
            onDelete={() => deleteItem(cert.id)}
            onSave={() => setActiveId(null)}
          />
        </>
      )}
    </section>
  );
}

export default Certificates;
