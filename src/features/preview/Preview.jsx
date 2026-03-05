import styles from "./Preview.module.css";
import SkillsSection from "./sections/SkillsPreview";
import ExperienceSection from "./sections/ExperiencePreview";
import EducationSection from "./sections/EducationPreview";
import ProjectsSection from "./sections/ProjectsPreview";
import CertificatesSection from "./sections/CertificatesPreview";

const SECTION_RENDERERS = {
  skills: SkillsSection,
  experience: ExperienceSection,
  education: EducationSection,
  projects: ProjectsSection,
  certificates: CertificatesSection,
};

function Preview({ data, sectionOrder }) {
  const { personal } = data;

  const contactLinks = [
    personal.email && (
      <a
        key="email"
        href={`mailto:${personal.email}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {personal.email}
      </a>
    ),
    personal.linkPortfolio && (
      <a
        key="portfolio"
        href={`https://${personal.linkPortfolio}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {personal.linkPortfolio}
      </a>
    ),
    personal.linkGithub && (
      <a
        key="github"
        href={`https://${personal.linkGithub}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {personal.linkGithub}
      </a>
    ),
  ].filter(Boolean);

  return (
    <div className={`${styles.previewLayout} print-preview-layout`}>
      <div className={`${styles.a4Page} print-a4`}>
        {/* PERSONAL HEADER */}
        {(personal.name || contactLinks.length > 0) && (
          <header className={styles.previewHeader}>
            {personal.name && <h1>{personal.name}</h1>}
            {contactLinks.length > 0 && (
              <p>{contactLinks.reduce((p, c) => [p, " • ", c])}</p>
            )}
          </header>
        )}

        {/* ORDERED SECTIONS */}
        {sectionOrder.map((key) => {
          const Section = SECTION_RENDERERS[key];
          return Section ? <Section key={key} {...data} /> : null;
        })}
      </div>
    </div>
  );
}

export default Preview;
