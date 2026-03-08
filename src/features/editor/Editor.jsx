import { useState } from "react";

import styles from "./Editor.module.css";
import buttonStyles from "../../components/buttons.module.css";

import Sidebar from "./sidebar/Sidebar";
import Summary from "./sections/Summary";
import Personal from "./sections/Personal";
import Skills from "./sections/Skills";
import Experience from "./sections/Experience";
import Projects from "./sections/Projects";
import Education from "./sections/Education";
import Certificates from "./sections/Certificates";

const SECTIONS = {
  summary: Summary,
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
          <button
            className={buttonStyles.dangerBtn + " " + buttonStyles.actionBtn}
            onClick={onClear}
          >
            CLEAR ALL
          </button>
        </div>

        {/* Center — utility */}
        <div className={styles.actionGroup}>
          <button
            className={buttonStyles.utilityBtn + " " + buttonStyles.actionBtn}
            onClick={onLoadSample}
          >
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
            className={buttonStyles.utilityBtn + " " + buttonStyles.actionBtn}
            onClick={() => document.getElementById("import-input").click()}
          >
            IMPORT
          </button>
          <button
            className={buttonStyles.utilityBtn + " " + buttonStyles.actionBtn}
            onClick={onExport}
          >
            EXPORT
          </button>
        </div>

        {/* Right — primary */}
        <div className={styles.actionGroup}>
          <button
            className={buttonStyles.primaryBtn + " " + buttonStyles.actionBtn}
            onClick={() => window.print()}
          >
            SAVE AS PDF
          </button>
        </div>
      </div>

      <div className={styles.editorMain}>
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
    </div>
  );
}

export default Editor;
