import styles from "./CustomizePanel.module.css";
import { DEFAULT_RESUME_SETTINGS } from "../../data/settings";

const PAPER_OPTIONS = [
  { value: "a4", label: "A4", description: "210 × 297 mm" },
  { value: "letter", label: "Letter", description: "8.5 × 11 in" },
  { value: "legal", label: "Legal", description: "8.5 × 14 in" },
];

const FONT_OPTIONS = [
  { value: "Charter", label: "Charter", category: "Serif" },
  { value: "Georgia", label: "Georgia", category: "Serif" },
  { value: "Times New Roman", label: "Times New Roman", category: "Serif" },
  { value: "Arial", label: "Arial", category: "Sans" },
  { value: "Helvetica", label: "Helvetica", category: "Sans" },
];

const FONT_SIZE_OPTIONS = [
  { value: 9, label: "Compact" },
  { value: 10, label: "Standard" },
  { value: 11, label: "Readable" },
  { value: 12, label: "Large" },
];

function CustomizePanel({ settings, setSettings }) {
  function updateSetting(name, value) {
    setSettings((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <section className={styles.panel} aria-labelledby="customize-title">
      <div className={styles.headerRow}>
        <div>
          <p className={styles.eyebrow}>Design</p>
          <h2 id="customize-title">Customization</h2>
        </div>

        <button
          className={styles.resetButton}
          type="button"
          onClick={() => setSettings(DEFAULT_RESUME_SETTINGS)}
        >
          Reset
        </button>
      </div>

      <div className={styles.cardGrid}>
        <section className={styles.card} aria-labelledby="paper-size-title">
          <div className={styles.cardHeader}>
            <h3 id="paper-size-title">Paper size</h3>
            {/* <p>Choose the page format used in preview and print export.</p> */}
          </div>

          <div className={styles.segmentedGroup}>
            {PAPER_OPTIONS.map((option) => {
              const isActive = settings.paperSize === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  className={isActive ? styles.optionActive : styles.option}
                  aria-pressed={isActive}
                  onClick={() => updateSetting("paperSize", option.value)}
                >
                  <strong>{option.label}</strong>
                  <span>{option.description}</span>
                </button>
              );
            })}
          </div>
        </section>

        <section className={styles.card} aria-labelledby="font-style-title">
          <div className={styles.cardHeader}>
            <h3 id="font-style-title">Font style</h3>
            {/* <p>Select a typeface that fits the tone of your resume.</p> */}
          </div>

          <label className={styles.fieldLabel} htmlFor="resume-font-family">
            Typeface
          </label>
          <select
            id="resume-font-family"
            className={styles.select}
            value={settings.fontFamily}
            onChange={(e) => updateSetting("fontFamily", e.target.value)}
          >
            {FONT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label} ({option.category})
              </option>
            ))}
          </select>

          {/* <div
            className={styles.fontPreview}
            style={{ fontFamily: `'${settings.fontFamily}', serif` }}
          >
            <span>The quick brown fox jumps over the lazy dog.</span>
          </div> */}
        </section>

        <section className={styles.card} aria-labelledby="font-size-title">
          <div className={styles.cardHeader}>
            <h3 id="font-size-title">Font size</h3>
            {/* <p>Balance readability with how much content fits on the page.</p> */}
          </div>

          <div className={styles.sizeButtons}>
            {FONT_SIZE_OPTIONS.map((option) => {
              const isActive = settings.fontSize === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  className={isActive ? styles.sizeActive : styles.sizeButton}
                  aria-pressed={isActive}
                  onClick={() => updateSetting("fontSize", option.value)}
                >
                  <span>{option.label}</span>
                  <strong>{option.value}pt</strong>
                </button>
              );
            })}
          </div>
        </section>
      </div>
    </section>
  );
}

export default CustomizePanel;
