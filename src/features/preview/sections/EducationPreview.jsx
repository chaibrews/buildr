import styles from "../Preview.module.css";
import { renderBullets, hasAnyValue } from "../utils";

function EducationSection({ education }) {
  if (!education.some(hasAnyValue)) return null;

  return (
    <section>
      <h2>Education</h2>
      {education.filter(hasAnyValue).map((edu) => (
        <div className={styles.sectionEntry} key={edu.id}>
          {(edu.school || edu.dateGraduated) && (
            <div className={styles.spaceBetweenRow}>
              {edu.school && <strong>{edu.school}</strong>}
              {edu.dateGraduated && (
                <span className={styles.paragraph}>{edu.dateGraduated}</span>
              )}
            </div>
          )}
          <div className={styles.beforeBullets}>
            {edu.degree && <i>{edu.degree}</i>}
          </div>
          {renderBullets(edu.bullets, styles.previewBullets)}
        </div>
      ))}
    </section>
  );
}

export default EducationSection;
