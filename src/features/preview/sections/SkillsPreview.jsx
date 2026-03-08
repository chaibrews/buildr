import styles from "../Preview.module.css";
import { hasAnyValue } from "../utils";

function SkillsSection({ skills }) {
  if (!skills.some(hasAnyValue)) return null;

  return (
    <section>
      <h2>Skills</h2>
      {skills.filter(hasAnyValue).map((skill) => (
        <div className={styles.skillEntry} key={skill.id}>
          {skill.groupName && <strong>{skill.groupName}</strong>}
          {skill.items && (
            <>
              {skill.groupName && ": "}
              <span>{skill.items}</span>
            </>
          )}
        </div>
      ))}
    </section>
  );
}

export default SkillsSection;
