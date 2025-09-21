export const addItemToServer = async (task, Date) => {
  try {
    const response = await fetch("http://localhost:3000/api/todoitems", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task, Date }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const item = await response.json();
    console.log("Item added successfully:", item);
    return mapServerItemToLocal(item);
  } catch (error) {
    console.error("Error adding item to server:", error);
    throw error;
  }
};

export const getItemsFromServer = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/todoitems");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const items = await response.json();
    return items.map(mapServerItemToLocal);
  } catch (error) {
    console.error("Error fetching items from server:", error);
    throw error;
  }
};

export const markItemAsCompleted = async (id, completed) => {
  try {
    const response = await fetch(`http://localhost:3000/api/todoitems/${id}/completed`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const updatedItem = await response.json();
    return mapServerItemToLocal(updatedItem);
  } catch (error) {
    console.error("Error marking item as completed:", error);
    throw error;
  }
};

export const deleteItemFromServer = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/api/todoitems/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log("Item deleted successfully");
  } catch (error) {
    console.error("Error deleting item from server:", error);
    throw error;
  }
};

export const mapServerItemToLocal = (serverItem) => {
  return {
    id: serverItem._id,
    name: serverItem.task,
    dueDate: serverItem.Date,
    completed: serverItem.completed,
    createdAt: serverItem.createdAt,
  };
};
