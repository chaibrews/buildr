import { useState } from "react";

/**
 * useEditableList
 *
 * A custom hook that manages a list of editable items.
 * Used by all section components with a list/edit toggle pattern:
 *
 * UI pattern it enables:
 *   - List view (activeId === null): shows all items, click one to edit
 *   - Edit view (activeId === some id): shows a form for the selected item

 */

export default function useEditableList(items, setData, key, emptyItem) {
  const [activeId, setActiveId] = useState(null);
  const activeItem = items.find((item) => item.id === activeId);

  function updateItem(name, value) {
    setData((prev) => ({
      ...prev,
      [key]: prev[key].map((item) =>
        item.id === activeId ? { ...item, [name]: value } : item,
      ),
    }));
  }

  function deleteItem(id) {
    setData((prev) => ({
      ...prev,
      [key]: prev[key].filter((item) => item.id !== id),
    }));

    if (id === activeId) setActiveId(null);
  }

  function addItem() {
    const newItem = {
      id: crypto.randomUUID(),
      ...emptyItem,
    };

    setData((prev) => ({
      ...prev,
      [key]: [...prev[key], newItem],
    }));

    setActiveId(newItem.id);
  }

  return {
    activeId,
    setActiveId,
    activeItem,
    updateItem,
    deleteItem,
    addItem,
  };
}
