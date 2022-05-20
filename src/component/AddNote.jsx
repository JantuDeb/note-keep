import React, { useState } from "react";
import NoteForm from "./NoteForm";
import { useCreateNote } from "../hooks/useCreateNote";

const AddNote = () => {
  const initialState = {
    title: "",
    description: "",
    pin: false,
    color: "bg-white",
    label: "",
    priority: "",
  };
  const [note, setNote] = useState(initialState);
  const [expanded, setExpanded] = useState({
    category: false,
    formBody: false,
  });
  const [loading, setLoading] = useState(false);
  const { mutate: createNote } = useCreateNote();
  const { title, description } = note;
  function changeHandler(event) {
    setNote((note) => ({ ...note, [event.target.name]: event.target.value }));
  }

  function saveNote() {
    if (!title || !description) console.log("Add all the fields");
    else {
      setLoading(true);
      createNote(note, {
        onSuccess: () => {
          setLoading(false);
          setNote(initialState);
          setExpanded({ formBody: false });
        },
      });
    }
  }

  return expanded.formBody ? (
    <NoteForm
      note={note}
      setNote={setNote}
      expanded={expanded}
      setExpanded={setExpanded}
      changeHandler={changeHandler}
      saveNote={saveNote}
      isLoading={loading}
    />
  ) : (
    <div
      onClick={() => setExpanded((v) => ({ ...v, formBody: !v.formBody }))}
      className="form-container border items-start shadow-gray p-2 radius-md text-dark cursor-auto"
    >
      Take a note
    </div>
  );
};

export default AddNote;
