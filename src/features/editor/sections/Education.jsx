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
import BulletListEditor from "../../../components/BulletListEditor";
import SortableSectionListItem from "../../../components/SortableSectionListItem";
import SectionListActions from "../../../components/SectionListActions";
import SectionFormActions from "../../../components/SectionEditActions";

const EDUCATION_FIELDS = [
  ["school", "SCHOOL"],
  ["degree", "DEGREE"],
  ["dateGraduated", "DATE OF GRADUATION"],
];

function Education({ data, setData }) {
  const {
    activeId,
    setActiveId,
    activeItem: edu,
    updateItem,
    deleteItem,
    addItem,
  } = useEditableList(
    data.education,
    setData,
    "education",
    EMPTY_ITEMS.education,
  );

  const sensors = useSensors(useSensor(PointerSensor));

  function handleDragEnd({ active, over }) {
    if (!over || active.id === over.id) return;
    const oldIndex = data.education.findIndex((i) => i.id === active.id);
    const newIndex = data.education.findIndex((i) => i.id === over.id);
    setData((prev) => ({
      ...prev,
      education: arrayMove(prev.education, oldIndex, newIndex),
    }));
  }

  return (
    <section>
      <h2>Education</h2>

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
              items={data.education.map((i) => i.id)}
              strategy={verticalListSortingStrategy}
            >
              <ul>
                {data.education.map((item) => (
                  <SortableSectionListItem
                    key={item.id}
                    id={item.id}
                    label={item.school}
                    onSelect={() => setActiveId(item.id)}
                    onDelete={() => deleteItem(item.id)}
                  />
                ))}
              </ul>
            </SortableContext>
          </DndContext>

          <SectionListActions
            addLabel="ADD EDUCATION"
            onAdd={addItem}
            onClearSection={() =>
              setData((prev) => ({ ...prev, education: [] }))
            }
          />
        </>
      ) : (
        <>
          {/* EDIT VIEW */}
          {EDUCATION_FIELDS.map(([name, label]) => (
            <FormField
              key={name}
              name={name}
              label={label}
              value={edu[name]}
              onChange={(e) => updateItem(e.target.name, e.target.value)}
            />
          ))}

          <BulletListEditor
            bullets={edu.bullets}
            onChange={(updated) => updateItem("bullets", updated)}
          />

          <SectionFormActions
            onDelete={() => deleteItem(edu.id)}
            onSave={() => setActiveId(null)}
          />
        </>
      )}
    </section>
  );
}

export default Education;
