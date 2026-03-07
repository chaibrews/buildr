import { useState, useEffect } from "react";
import { emptyData, sampleData } from "../data";

const STORAGE_KEY = "buildr-resume-v1";

const DEFAULT_ORDER = [
  "personal",
  "skills",
  "experience",
  "projects",
  "education",
  "certificates",
];

function migrateData(saved) {
  function toBullets(item) {
    if (Array.isArray(item.bullets)) return item; // already migrated
    return {
      ...item,
      bullets: item.description?.split("\n").filter(Boolean) ?? [],
      description: undefined,
    };
  }

  return {
    ...saved,
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

  return {
    data,
    setData,
    sectionOrder,
    setSectionOrder,
    clearResume,
    loadSample,
  };
}
