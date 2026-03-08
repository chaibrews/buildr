import styles from "../Preview.module.css";

function SummaryPreview({ summary }) {
  if (!summary?.description?.trim()) return null;

  return (
    <section>
      <h2>Professional Summary</h2>
      <p>{summary.description}</p>
    </section>
  );
}

export default SummaryPreview;
