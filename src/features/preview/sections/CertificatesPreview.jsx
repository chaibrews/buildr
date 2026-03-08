import styles from "../Preview.module.css";
import { hasAnyValue } from "../utils";

function CertificatesSection({ certificates }) {
  if (!certificates.some(hasAnyValue)) return null;

  return (
    <section>
      <h2>Certificates</h2>
      {certificates.filter(hasAnyValue).map((cert) => (
        <div className={styles.sectionEntry} key={cert.id}>
          {(cert.name || cert.dateIssued) && (
            <div className={styles.spaceBetweenRow}>
              {cert.name && <strong>{cert.name}</strong>}
              {cert.dateIssued && <span>{cert.dateIssued}</span>}
            </div>
          )}
          {cert.organization && <i>{cert.organization}</i>}
        </div>
      ))}
    </section>
  );
}

export default CertificatesSection;
