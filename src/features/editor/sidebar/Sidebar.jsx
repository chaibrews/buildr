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
import skillsIcon from "../../../assets/icons/skills.svg";
import experienceIcon from "../../../assets/icons/experience.svg";
import projectsIcon from "../../../assets/icons/projects.svg";
import educationIcon from "../../../assets/icons/education.svg";
import certificateIcon from "../../../assets/icons/certificate.svg";

/* ----------------------------------------
   CONSTANTS
---------------------------------------- */

const FIXED_SECTION = "personal";

const sectionIcons = {
  personal: personalIcon,
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
  const sortableSections = sectionOrder.filter((id) => id !== FIXED_SECTION);

  function handleDragEnd({ active, over }) {
    if (!over) return;
    if (active.id === FIXED_SECTION || over.id === FIXED_SECTION) return;

    setSectionOrder((prev) => {
      const sortable = prev.filter((id) => id !== FIXED_SECTION);

      const oldIndex = sortable.indexOf(active.id);
      const newIndex = sortable.indexOf(over.id);

      const reordered = arrayMove(sortable, oldIndex, newIndex);

      return [FIXED_SECTION, ...reordered];
    });
  }

  return (
    <nav className={`${styles.sidebar} print-hide`}>
      {/* ───────── FIXED PERSONAL (NOT DRAGGABLE) ───────── */}
      <button
        className={activeSection === FIXED_SECTION ? styles.active : ""}
        onClick={() => setActiveSection(FIXED_SECTION)}
      >
        <img
          src={sectionIcons[FIXED_SECTION]}
          alt="Personal"
          className={styles.icon}
        />
      </button>

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
