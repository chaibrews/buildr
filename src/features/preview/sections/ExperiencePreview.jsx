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
            <div className={styles.firstRow}>
              {exp.position && <strong>{exp.position}</strong>}
              {(exp.dateFrom || exp.dateTo) && (
                <p>{[exp.dateFrom, exp.dateTo].filter(Boolean).join(" - ")}</p>
              )}
            </div>
          )}
          {exp.company && <i>{exp.company}</i>}
          {renderBullets(exp.bullets, styles.previewBullets)}
        </div>
      ))}
    </section>
  );
}

export default ExperienceSection;
