import styles from "./Preview.module.css";
import SummaryPreview from "./sections/SummaryPreview";
import SkillsPreview from "./sections/SkillsPreview";
import ExperiencePreview from "./sections/ExperiencePreview";
import EducationPreview from "./sections/EducationPreview";
import ProjectsPreview from "./sections/ProjectsPreview";
import CertificatesPreview from "./sections/CertificatesPreview";

const SECTION_RENDERERS = {
  skills: SkillsPreview,
  experience: ExperiencePreview,
  education: EducationPreview,
  projects: ProjectsPreview,
  certificates: CertificatesPreview,
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
    personal.phone && (
      <a
        key="phone"
        href={`tel:${personal.phone}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {personal.phone}
      </a>
    ),
    personal.linkedin && (
      <a
        key="linkedin"
        href={`https://${personal.linkedin}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        LinkedIn
      </a>
    ),
    personal.linkPortfolio && (
      <a
        key="portfolio"
        href={`https://${personal.linkPortfolio}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Portfolio
      </a>
    ),
    personal.linkGithub && (
      <a
        key="github"
        href={`https://${personal.linkGithub}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub
      </a>
    ),
  ].filter(Boolean);

  return (
    <div className={`${styles.previewLayout} print-preview-layout`}>
      <div className={`${styles.a4Page} print-a4`}>
        <div className={`${styles.a4InsideMargin}`}>
          {/* PERSONAL HEADER */}
          {(personal.name || contactLinks.length > 0) && (
            <header className={styles.previewHeader}>
              {personal.name && <h1>{personal.name}</h1>}
              {contactLinks.length > 0 && (
                <p>{contactLinks.reduce((p, c) => [p, " • ", c])}</p>
              )}
            </header>
          )}

          {/* PROFESSIONAL SUMMARY */}
          <SummaryPreview summary={data.summary} />

          {/* ORDERED SECTIONS */}
          {sectionOrder.map((key) => {
            const Section = SECTION_RENDERERS[key];
            return Section ? <Section key={key} {...data} /> : null;
          })}
        </div>
      </div>
    </div>
  );
}

export default Preview;
