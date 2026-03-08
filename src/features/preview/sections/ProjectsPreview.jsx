import styles from "../Preview.module.css";
import { renderBullets, hasAnyValue } from "../utils";

function ProjectsSection({ projects }) {
  if (!projects.some(hasAnyValue)) return null;

  return (
    <section>
      <h2>Projects</h2>
      {projects.filter(hasAnyValue).map((proj) => (
        <div className={styles.sectionEntry} key={proj.id}>
          {(proj.title || proj.link) && (
            <div
              className={styles.spaceBetweenRow + " " + styles.beforeBullets}
            >
              {proj.title && <strong>{proj.title}</strong>}
              {proj.link && (
                <a
                  href={`https://${proj.link}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {proj.link}
                </a>
              )}
            </div>
          )}
          {renderBullets(proj.bullets, styles.previewBullets)}
        </div>
      ))}
    </section>
  );
}

export default ProjectsSection;
