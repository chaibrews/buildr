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
  onExport,
  onImport,
  onClear,
  onLoadSample,
  sectionOrder,
  setSectionOrder,
}) {
  const [activeSection, setActiveSection] = useState("personal");
  const ActiveSectionComponent = SECTIONS[activeSection];

  return (
    <div className={`${styles.editorLayout} print-hide`}>
      <div className={styles.editorActions}>
        {/* Left — destructive */}
        <div className={styles.actionGroup}>
          <button className={styles.dangerBtn} onClick={onClear}>
            CLEAR
          </button>
        </div>

        {/* Center — utility */}
        <div className={styles.actionGroup}>
          <button className={styles.utilityBtn} onClick={onLoadSample}>
            SAMPLE
          </button>
          <input
            type="file"
            accept=".json"
            id="import-input"
            style={{ display: "none" }}
            onChange={(e) => {
              onImport(e);
              e.target.value = "";
            }}
          />
          <button
            className={styles.utilityBtn}
            onClick={() => document.getElementById("import-input").click()}
          >
            IMPORT
          </button>
          <button className={styles.utilityBtn} onClick={onExport}>
            EXPORT
          </button>
        </div>

        {/* Right — primary */}
        <div className={styles.actionGroup}>
          <button className={styles.primaryBtn} onClick={() => window.print()}>
            SAVE AS PDF
          </button>
        </div>
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
