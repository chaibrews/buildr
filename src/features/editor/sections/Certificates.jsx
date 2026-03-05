import styles from "../EditorForm.module.css";
import useEditableList from "../../../hooks/useEditableList";
import deleteIcon from "../../../assets/icons/delete.svg";
import { emptyData } from "../../../data";
import FormField from "../../../components/FormField";

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
    emptyData.certificates,
  );

  return (
    <section>
      <h2>Certificates</h2>
      {/* LIST VIEW — shown when no item is selected */}
      {activeId === null ? (
        <>
          <ul>
            {data.certificates.map((item) => (
              <li key={item.id}>
                {/* Clicking the item selects it for editing */}
                <button
                  className={styles.listItem}
                  onClick={() => setActiveId(item.id)}
                >
                  {item.name || "Untitled"}
                </button>

                {/* Button to delete the certificate entry */}
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

          {/* Button to add a new certificate entry */}
          <button className={styles.addButton} onClick={addItem}>
            + Add Certificate
          </button>
        </>
      ) : (
        <>
          {/* EDIT VIEW — shown when an item is selected */}
          {CERTIFICATE_FIELDS.map(([name, label]) => (
            <FormField
              key={name}
              name={name}
              label={label}
              value={cert[name]}
              onChange={(e) => updateItem(e.target.name, e.target.value)}
            ></FormField>
          ))}

          {/* Action buttons for the active item */}
          <div className={styles.actionButtons}>
            {/* Delete the currently edited item */}
            <button
              className={styles.deleteButton}
              onClick={() => deleteItem(cert.id)}
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

export default Certificates;
