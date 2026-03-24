import useEditableList from "../../../hooks/useEditableList";
import { EMPTY_ITEMS } from "../../../data";

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
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";

import FormField from "../../../components/FormField";
import SortableSectionListItem from "../../../components/SortableSectionListItem";
import SectionListActions from "../../../components/SectionListActions";
import SectionFormActions from "../../../components/SectionEditActions";

function Skills({ data, setData }) {
  const {
    activeId,
    setActiveId,
    activeItem: skill,
    updateItem,
    deleteItem,
    addItem,
  } = useEditableList(data.skills, setData, "skills", EMPTY_ITEMS.skills);

  const sensors = useSensors(useSensor(PointerSensor));

  function handleDragEnd({ active, over }) {
    if (!over || active.id === over.id) return;
    const oldIndex = data.skills.findIndex((i) => i.id === active.id);
    const newIndex = data.skills.findIndex((i) => i.id === over.id);
    setData((prev) => ({
      ...prev,
      skills: arrayMove(prev.skills, oldIndex, newIndex),
    }));
  }

  return (
    <section>
      <h2>Skills</h2>

      {/* LIST VIEW */}
      {activeId === null ? (
        <>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis]}
          >
            <SortableContext
              items={data.skills.map((i) => i.id)}
              strategy={verticalListSortingStrategy}
            >
              <ul>
                {data.skills.map((item) => (
                  <SortableSectionListItem
                    key={item.id}
                    id={item.id}
                    label={item.groupName || "Untitled"}
                    onSelect={() => setActiveId(item.id)}
                    onDelete={() => deleteItem(item.id)}
                  />
                ))}
              </ul>
            </SortableContext>
          </DndContext>

          <SectionListActions
            addLabel="ADD SKILLS"
            onAdd={addItem}
            onClearSection={() => setData((prev) => ({ ...prev, skills: [] }))}
          />
        </>
      ) : (
        <>
          {/* EDIT VIEW */}
          <FormField
            name="groupName"
            label="SKILL GROUP"
            value={skill.groupName}
            onChange={(e) => updateItem(e.target.name, e.target.value)}
          />

          <FormField
            name="items"
            label="LIST OF SKILLS"
            value={skill.items}
            onChange={(e) => updateItem(e.target.name, e.target.value)}
          />

          <SectionFormActions
            onDelete={() => deleteItem(skill.id)}
            onSave={() => setActiveId(null)}
          />
        </>
      )}
    </section>
  );
}

export default Skills;
