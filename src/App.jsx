import { useState, useEffect } from "react";
import "./App.css";
import Editor from "./features/editor/Editor";
import Preview from "./features/preview/Preview";
import { emptyData, sampleData } from "./data";

const STORAGE_KEY = "buildr-resume-v1";

const DEFAULT_ORDER = [
  "personal",
  "skills",
  "experience",
  "projects",
  "education",
  "certificates",
];

function App() {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : emptyData;
    } catch {
      return sampleData;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // silently fail (storage full / disabled)
    }
  }, [data]);

  const [sectionOrder, setSectionOrder] = useState(() => {
    try {
      const saved = localStorage.getItem("buildr:sectionOrder");
      return saved ? JSON.parse(saved) : DEFAULT_ORDER;
    } catch {
      return DEFAULT_ORDER;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("buildr:sectionOrder", JSON.stringify(sectionOrder));
    } catch {
      // silent fail (private mode / storage full)
    }
  }, [sectionOrder]);

  function clearResume() {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem("buildr:sectionOrder");
    setData(emptyData);
    setSectionOrder(DEFAULT_ORDER);
  }

  function loadSample() {
    setData(sampleData);
    setSectionOrder(DEFAULT_ORDER);
  }

  return (
    <>
      <div className="header print-hide">buildR.</div>
      <div className="body">
        <div className="app">
          <Editor
            data={data}
            setData={setData}
            onClear={clearResume}
            onLoadSample={loadSample}
            sectionOrder={sectionOrder}
            setSectionOrder={setSectionOrder}
          />
          <Preview data={data} sectionOrder={sectionOrder} />
        </div>
      </div>
    </>
  );
}

export default App;
