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

const CERTIFICATE_FIELDS = [
  ["name", "NAME *"],
  ["organization", "ORGANIZATION *"],
  ["dateIssued", "ISSUE DATE *"],
];

function Certificates({ data, setData }) {
  const {
    activeId,
    setActiveId,
    activeItem: cert,
    updateItem,
    deleteItem,
    addItem,
  } = useEditableList(
    data.certificates,
    setData,
    "certificates",
    EMPTY_ITEMS.certificates,
  );

  const sensors = useSensors(useSensor(PointerSensor));

  function handleDragEnd({ active, over }) {
    if (!over || active.id === over.id) return;
    const oldIndex = data.certificates.findIndex((i) => i.id === active.id);
    const newIndex = data.certificates.findIndex((i) => i.id === over.id);
    setData((prev) => ({
      ...prev,
      certificates: arrayMove(prev.certificates, oldIndex, newIndex),
    }));
  }

  return (
    <section>
      <h2>Certificates</h2>
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
              items={data.certificates.map((i) => i.id)}
              strategy={verticalListSortingStrategy}
            >
              <ul>
                {data.certificates.map((item) => (
                  <SortableSectionListItem
                    key={item.id}
                    id={item.id}
                    label={item.name || "Untitled"}
                    onSelect={() => setActiveId(item.id)}
                    onDelete={() => deleteItem(item.id)}
                  />
                ))}
              </ul>
            </SortableContext>
          </DndContext>

          <SectionListActions
            addLabel="ADD CERTIFICATE"
            onAdd={addItem}
            onClearSection={() =>
              setData((prev) => ({ ...prev, certificates: [] }))
            }
          />
        </>
      ) : (
        <>
          {/* EDIT VIEW */}
          {CERTIFICATE_FIELDS.map(([name, label]) => (
            <FormField
              key={name}
              name={name}
              label={label}
              value={cert[name]}
              onChange={(e) => updateItem(e.target.name, e.target.value)}
            />
          ))}

          <SectionFormActions
            onDelete={() => deleteItem(cert.id)}
            onSave={() => setActiveId(null)}
          />
        </>
      )}
    </section>
  );
}

export default Certificates;
