import styles from "../Preview.module.css";
import { renderBullets, hasAnyValue } from "../utils";

function ExperienceSection({ experience }) {
  if (!experience.some(hasAnyValue)) return null;

  return (
    <section>
      <h2>Experience</h2>
      {experience.filter(hasAnyValue).map((exp) => (
        <div className={styles.sectionEntry} key={exp.id}>
          {(exp.position || exp.dateFrom || exp.dateTo) && (
            <div className={styles.spaceBetweenRow}>
              {exp.position && <strong>{exp.position}</strong>}
              {(exp.dateFrom || exp.dateTo) && (
                <span>
                  {[exp.dateFrom, exp.dateTo].filter(Boolean).join(" - ")}
                </span>
              )}
            </div>
          )}
          <div className={styles.beforeBullets}>
            {exp.company && <i>{exp.company}</i>}
          </div>
          {renderBullets(exp.bullets, styles.previewBullets)}
        </div>
      ))}
    </section>
  );
}

export default ExperienceSection;
