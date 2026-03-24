import { useState } from "react";
import styles from "./BulletListEditor.module.css";
import buttonStyles from "../components/buttons.module.css";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  useSortable,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";

// ── Sortable bullet row ──────────────────────────────
function SortableBulletRow({ id, value, onChange, onDelete }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className={styles.bulletRow}>
      <span className={styles.dragHandle} {...attributes} {...listeners}>
        ⠿
      </span>
      <input
        className={styles.bulletInput}
        value={value}
        placeholder="Add bullet point..."
        onChange={(e) => onChange(e.target.value)}
      />
      <button className={buttonStyles.deleteBtn} onClick={onDelete}>
        ×
      </button>
    </div>
  );
}

// ── BulletListEditor ─────────────────────────────────
function BulletListEditor({ bullets = [], onChange }) {
  const sensors = useSensors(useSensor(PointerSensor));

  // Each bullet needs a stable id for dnd-kit to track
  const [ids] = useState(() => bullets.map(() => crypto.randomUUID()));
  const [stableIds, setStableIds] = useState(ids);

  function handleDragEnd({ active, over }) {
    if (!over || active.id === over.id) return;
    const oldIndex = stableIds.indexOf(active.id);
    const newIndex = stableIds.indexOf(over.id);
    setStableIds((prev) => arrayMove(prev, oldIndex, newIndex));
    onChange(arrayMove(bullets, oldIndex, newIndex));
  }

  function handleChange(index, value) {
    onChange(bullets.map((b, i) => (i === index ? value : b)));
  }

  function addBullet() {
    setStableIds((prev) => [...prev, crypto.randomUUID()]);
    onChange([...bullets, ""]);
  }

  function deleteBullet(index) {
    setStableIds((prev) => prev.filter((_, i) => i !== index));
    onChange(bullets.filter((_, i) => i !== index));
  }

  return (
    <div className={styles.bulletEditor}>
      <label className={styles.label}>DESCRIPTION</label>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis]}
      >
        <SortableContext
          items={stableIds}
          strategy={verticalListSortingStrategy}
        >
          {bullets.map((bullet, index) => (
            <SortableBulletRow
              key={stableIds[index]}
              id={stableIds[index]}
              value={bullet}
              onChange={(value) => handleChange(index, value)}
              onDelete={() => deleteBullet(index)}
            />
          ))}
        </SortableContext>
      </DndContext>

      <button
        className={buttonStyles.addBulletBtn + " " + buttonStyles.actionBtn}
        onClick={addBullet}
      >
        + Add Bullet
      </button>
    </div>
  );
}

export default BulletListEditor;
