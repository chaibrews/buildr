import { useState, useEffect } from "react";
import { emptyData, sampleData } from "../data";

const STORAGE_KEY = "buildr-resume-v1";

const DEFAULT_ORDER = [
  "skills",
  "experience",
  "projects",
  "education",
  "certificates",
];

function migrateData(saved) {
  function toBullets(item) {
    if (Array.isArray(item.bullets)) return item;
    return {
      ...item,
      bullets: item.description?.split("\n").filter(Boolean) ?? [],
      description: undefined,
    };
  }

  return {
    ...saved,
    summary: saved.summary ?? { description: "" },
    experience: saved.experience?.map(toBullets) ?? [],
    education: saved.education?.map(toBullets) ?? [],
    projects: saved.projects?.map(toBullets) ?? [],
  };
}

export default function useResumeData() {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? migrateData(JSON.parse(saved)) : emptyData();
    } catch {
      return sampleData;
    }
  });

  const [sectionOrder, setSectionOrder] = useState(() => {
    try {
      const saved = localStorage.getItem("buildr:sectionOrder");
      return saved ? JSON.parse(saved) : DEFAULT_ORDER;
    } catch {
      return DEFAULT_ORDER;
    }
  });

  // Persist data
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // silently fail (storage full / disabled)
    }
  }, [data]);

  // Persist section order
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
    setData(emptyData());
    setSectionOrder(DEFAULT_ORDER);
  }

  function loadSample() {
    setData(sampleData);
    setSectionOrder(DEFAULT_ORDER);
  }

  function exportData() {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "buildr-resume.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  function importData(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        setData(migrateData(parsed));
      } catch {
        alert("Invalid file. Please upload a valid buildR JSON file.");
      }
    };
    reader.readAsText(file);
  }

  return {
    data,
    setData,
    sectionOrder,
    setSectionOrder,
    clearResume,
    loadSample,
    exportData,
    importData,
  };
}
