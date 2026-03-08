import styles from "./BulletListEditor.module.css";
import buttonStyles from "../components/buttons.module.css";

function BulletListEditor({ bullets = [], onChange }) {
  function handleChange(index, value) {
    onChange(bullets.map((b, i) => (i === index ? value : b)));
  }

  function addBullet() {
    onChange([...bullets, ""]);
  }

  function deleteBullet(index) {
    onChange(bullets.filter((_, i) => i !== index));
  }

  return (
    <div className={styles.bulletEditor}>
      <label className={styles.label}>DESCRIPTION</label>

      {bullets.map((bullet, index) => (
        <div key={index} className={styles.bulletRow}>
          <input
            className={styles.bulletInput}
            value={bullet}
            placeholder="Add bullet point..."
            onChange={(e) => handleChange(index, e.target.value)}
          />
          <button
            className={buttonStyles.deleteBtn}
            onClick={() => deleteBullet(index)}
          >
            ×
          </button>
        </div>
      ))}

      <button
        className={buttonStyles.addBulletBtn + " " + buttonStyles.actionBtn}
        onClick={addBullet}
      >
        + ADD BULLET
      </button>
    </div>
  );
}

export default BulletListEditor;
