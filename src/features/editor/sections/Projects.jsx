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

const PROJECT_FIELDS = [
  ["title", "TITLE"],
  ["link", "LINK"],
];

function Projects({ data, setData }) {
  const {
    activeId,
    setActiveId,
    activeItem: proj,
    updateItem,
    deleteItem,
    addItem,
  } = useEditableList(data.projects, setData, "projects", EMPTY_ITEMS.projects);

  const sensors = useSensors(useSensor(PointerSensor));

  function handleDragEnd({ active, over }) {
    if (!over || active.id === over.id) return;
    const oldIndex = data.projects.findIndex((i) => i.id === active.id);
    const newIndex = data.projects.findIndex((i) => i.id === over.id);
    setData((prev) => ({
      ...prev,
      projects: arrayMove(prev.projects, oldIndex, newIndex),
    }));
  }

  return (
    <section>
      <h2>Projects</h2>
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
              items={data.projects.map((i) => i.id)}
              strategy={verticalListSortingStrategy}
            >
              <ul>
                {data.projects.map((item) => (
                  <SortableSectionListItem
                    key={item.id}
                    id={item.id}
                    label={item.title}
                    onSelect={() => setActiveId(item.id)}
                    onDelete={() => deleteItem(item.id)}
                  />
                ))}
              </ul>
            </SortableContext>
          </DndContext>

          <SectionListActions
            addLabel="ADD PROJECT"
            onAdd={addItem}
            onClearSection={() =>
              setData((prev) => ({ ...prev, projects: [] }))
            }
          />
        </>
      ) : (
        <>
          {/* EDIT VIEW */}
          {PROJECT_FIELDS.map(([name, label]) => (
            <FormField
              key={name}
              name={name}
              label={label}
              value={proj[name]}
              onChange={(e) => updateItem(e.target.name, e.target.value)}
            />
          ))}

          <BulletListEditor
            bullets={proj.bullets}
            onChange={(updated) => updateItem("bullets", updated)}
          />

          <SectionFormActions
            onDelete={() => deleteItem(proj.id)}
            onSave={() => setActiveId(null)}
          />
        </>
      )}
    </section>
  );
}

export default Projects;
