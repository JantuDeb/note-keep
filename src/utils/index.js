export const navlist = [
  { id: "notes", path: "/", name: "Notes" },
  { id: "trash", path: "/trash", name: "Trash" },
  { id: "archive",path: "/archive", name: "Archive" },
  { id: "profile",path: "/profile", name: "Profile" },
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
  baseURL: "http://localhost:4000/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
};
