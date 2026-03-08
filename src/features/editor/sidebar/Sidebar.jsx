import styles from "./Sidebar.module.css";

import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";

import SortableSidebarItem from "./SortableSidebarItem";

import personalIcon from "../../../assets/icons/personal.svg";
import summaryIcon from "../../../assets/icons/text-box.svg";
import skillsIcon from "../../../assets/icons/skills.svg";
import experienceIcon from "../../../assets/icons/experience.svg";
import projectsIcon from "../../../assets/icons/projects.svg";
import educationIcon from "../../../assets/icons/education.svg";
import certificateIcon from "../../../assets/icons/certificate.svg";

/* ----------------------------------------
   CONSTANTS
---------------------------------------- */

const FIXED_SECTIONS = ["personal", "summary"];

const sectionIcons = {
  personal: personalIcon,
  summary: summaryIcon,
  skills: skillsIcon,
  experience: experienceIcon,
  projects: projectsIcon,
  education: educationIcon,
  certificates: certificateIcon,
};

/* ----------------------------------------
   COMPONENT
---------------------------------------- */

function Sidebar({
  sectionOrder,
  setSectionOrder,
  activeSection,
  setActiveSection,
}) {
  const sortableSections = sectionOrder.filter(
    (id) => !FIXED_SECTIONS.includes(id),
  );

  function handleDragEnd({ active, over }) {
    if (!over) return;
    if (FIXED_SECTIONS.includes(active.id) || FIXED_SECTIONS.includes(over.id))
      return;

    setSectionOrder((prev) => {
      const sortable = prev.filter((id) => !FIXED_SECTIONS.includes(id));

      const oldIndex = sortable.indexOf(active.id);
      const newIndex = sortable.indexOf(over.id);

      const reordered = arrayMove(sortable, oldIndex, newIndex);

      return [...FIXED_SECTIONS, ...reordered];
    });
  }

  return (
    <nav className={`${styles.sidebar} print-hide`}>
      {/* FIXED SECTIONS — not draggable */}
      {FIXED_SECTIONS.map((id) => (
        <button
          key={id}
          className={activeSection === id ? styles.active : ""}
          onClick={() => setActiveSection(id)}
        >
          <img src={sectionIcons[id]} className={styles.icon} />
        </button>
      ))}

      {/* ───────── DRAGGABLE SECTIONS ───────── */}
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis]}
      >
        <SortableContext
          items={sortableSections}
          strategy={verticalListSortingStrategy}
        >
          {sortableSections.map((id) => (
            <SortableSidebarItem
              key={id}
              id={id}
              icon={sectionIcons[id]}
              active={activeSection === id}
              onClick={() => setActiveSection(id)}
            />
          ))}
        </SortableContext>
      </DndContext>
    </nav>
  );
}

export default Sidebar;
