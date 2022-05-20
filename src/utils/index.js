export const navlist = [
  { id: "notes", path: "/", name: "Notes" },
  { id: "trash", path: "/trash", name: "Trash" },
  { id: "archive", path: "/archive", name: "Archive" },
  { id: "profile", path: "/profile", name: "Profile" },
];

export const labels = [
  { id: "label-1", name: "Label 1" },
  { id: "label-2", name: "Label 2" },
];

export const colors = [
  "white",
  "blue",
  "indigo",
  "purple",
  "pink",
  "red",
  "orange",
  "yellow",
  "green",
  "teal",
  "cyan",
];

export const axiosConfig = {
  baseURL:
    window.location.protocol === "http:"
      ? "http://localhost:4000/api/v1"
      : "https://notes--api.herokuapp.com/api/v1/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
};

export const initialState = {
  sortBy: {
    name: "",
  },
  priority: {
    high: false,
    low: false,
    medium: false,
  },
};

export const filterReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "FILTER_PRIORITY":
      return {
        ...state,
        priority: {
          ...state.priority,
          [payload.priority]: !state.priority[payload.priority],
        },
      };
    case "SORT":
      return {
        ...state,
        sortBy: {
          name: payload.name,
        },
      };
    default:
      return state;
  }
};

export const getFilteredNotes = (state, notes) => {
  if (Object.values(state.priority).every((v) => !v)) return notes;
  return notes.filter((note) => state.priority[note.priority]);
};

export const getSortedNotes = (state, notes) => {
  if (state.sortBy.name === "old") {
    return notes.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  } else if (state.sortBy.name === "new") {
    return notes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }
  return notes;
};
