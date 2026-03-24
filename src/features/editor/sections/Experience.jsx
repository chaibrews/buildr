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

const EXPERIENCE_FIELDS = [
  ["company", "COMPANY *"],
  ["position", "POSITION *"],
  ["dateFrom", "START DATE *"],
  ["dateTo", "END DATE *"],
];

function Experience({ data, setData }) {
  const {
    activeId,
    setActiveId,
    activeItem: exp,
    updateItem,
    deleteItem,
    addItem,
  } = useEditableList(
    data.experience,
    setData,
    "experience",
    EMPTY_ITEMS.experience,
  );

  const sensors = useSensors(useSensor(PointerSensor));

  function handleDragEnd({ active, over }) {
    if (!over || active.id === over.id) return;
    const oldIndex = data.experience.findIndex((i) => i.id === active.id);
    const newIndex = data.experience.findIndex((i) => i.id === over.id);
    setData((prev) => ({
      ...prev,
      experience: arrayMove(prev.experience, oldIndex, newIndex),
    }));
  }

  return (
    <section>
      <h2>Experience</h2>

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
              items={data.experience.map((i) => i.id)}
              strategy={verticalListSortingStrategy}
            >
              <ul>
                {data.experience.map((item) => (
                  <SortableSectionListItem
                    key={item.id}
                    id={item.id}
                    label={item.company}
                    onSelect={() => setActiveId(item.id)}
                    onDelete={() => deleteItem(item.id)}
                  />
                ))}
              </ul>
            </SortableContext>
          </DndContext>

          <SectionListActions
            addLabel="ADD EXPERIENCE"
            onAdd={addItem}
            onClearSection={() =>
              setData((prev) => ({ ...prev, experience: [] }))
            }
          />
        </>
      ) : (
        <>
          {/* EDIT VIEW */}
          {EXPERIENCE_FIELDS.map(([name, label]) => (
            <FormField
              key={name}
              name={name}
              label={label}
              value={exp[name]}
              onChange={(e) => updateItem(e.target.name, e.target.value)}
            />
          ))}

          <BulletListEditor
            bullets={exp.bullets}
            onChange={(updated) => updateItem("bullets", updated)}
          />

          <SectionFormActions
            onDelete={() => deleteItem(exp.id)}
            onSave={() => setActiveId(null)}
          />
        </>
      )}
    </section>
  );
}

export default Experience;
