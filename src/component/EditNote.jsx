import React, { useState } from "react";
import { useUpdateNote } from "../hooks/useUpdateNote";
import NoteForm from "./NoteForm";

const EditNote = ({ noteToEdit, setIsEditing }) => {
  const [note, setNote] = useState(noteToEdit);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState({
    category: false,
    formBody: true,
  });
  const { title, description } = note;
  const { mutate: updateNote } = useUpdateNote();

  function changeHandler(event) {
    setNote((note) => ({ ...note, [event.target.name]: event.target.value }));
  }

  function editNote() {
    if (!title || !description) console.log("Add all the fields");
    else {
      setLoading(true);
      updateNote(note, {
        onSuccess: () => {
          setLoading(false);
          setIsEditing(false);
        },
      });
    }
  }

  return (
    <NoteForm
      note={note}
      setNote={setNote}
      expanded={expanded}
      setExpanded={setExpanded}
      changeHandler={changeHandler}
      saveNote={editNote}
      setIsEditing={setIsEditing}
      isLoading={loading}
    />
  );
};

export default EditNote;
