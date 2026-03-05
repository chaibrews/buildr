import styles from "./Form.module.css";

function FormTextarea({ name, label, value, onChange }) {
  return (
    <div className={styles.formGroup}>
      <label htmlFor={name}>{label}</label>
      <textarea
        className={styles.formControl}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default FormTextarea;
