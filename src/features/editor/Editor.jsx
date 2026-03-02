import styles from "./Editor.module.css";
import { useState } from "react";
import Sidebar from "./sidebar/Sidebar";
import Personal from "./sections/Personal";
import Skills from "./sections/Skills";
import Experience from "./sections/Experience";
import Projects from "./sections/Projects";
import Education from "./sections/Education";
import Certificates from "./sections/Certificates";

const SECTIONS = {
  personal: Personal,
  skills: Skills,
  experience: Experience,
  projects: Projects,
  education: Education,
  certificates: Certificates,
};

function Editor({
  data,
  setData,
  sectionOrder,
  setSectionOrder,
  onClear,
  onLoadSample,
}) {
  const [activeSection, setActiveSection] = useState("personal");
  const ActiveSectionComponent = SECTIONS[activeSection];

  return (
    <div className={`${styles.editorLayout} print-hide`}>
      <div className={styles.editorActions}>
        <button className={styles.clearBtn} onClick={onClear}>
          CLEAR ALL
        </button>
        <button className={styles.loadBtn} onClick={onLoadSample}>
          LOAD SAMPLE
        </button>
        <button className={styles.downloadBtn} onClick={() => window.print()}>
          SAVE AS PDF
        </button>
      </div>

      <div className={styles.editorSidebar}>
        <Sidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          sectionOrder={sectionOrder}
          setSectionOrder={setSectionOrder}
        />
      </div>

      <div className={styles.editorContent}>
        {ActiveSectionComponent && (
          <ActiveSectionComponent data={data} setData={setData} />
        )}
      </div>
    </div>
  );
}

export default Editor;
