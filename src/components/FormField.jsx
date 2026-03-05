import styles from "./Form.module.css";

function FormField({ name, label, value, onChange, type = "text" }) {
  return (
    <div className={styles.formGroup}>
      <label htmlFor={name}>{label}</label>
      <input
        className={styles.formControl}
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default FormField;
