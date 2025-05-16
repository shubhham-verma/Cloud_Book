import React, { useState } from "react";
import NoteContext from './noteContext';

const NoteState = (props) => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const notes_initial = [];

    const [notes, setNotes] = useState(notes_initial)

    // ?? GET NOTE
    const getNote = async () => {
        // !! API call
        {
            const url = `${backendUrl}/api/notes/fetch_notes`;
            const response = await fetch(url, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': sessionStorage.getItem('token')
                }
            })
            const json = await response.json();
            setNotes(json);
        }

        // setNotes(notes.concat(note));
    }


    // ?? ADD NOTE
    const addNote = async (title, description, tag) => {
        // !! API call
        const url = `${backendUrl}/api/notes/add_notes`;
        {
            const response = await fetch(url, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': sessionStorage.getItem('token')
                },
                body: JSON.stringify({ title, description, tag })
            });

            const note = await response.json();
            setNotes(notes.concat(note));
        }
    }

    // ?? EDIT NOTE
    const editNote = async (id, title, description, tag) => {

        // await console.log("edit note has received " + id + title + description + tag);


        // !! API call
        const url = `${backendUrl}/api/notes/update_notes/${id}`;
        {
            const response = await fetch(url, {
                method: 'PUT',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': sessionStorage.getItem('token')
                },
                body: JSON.stringify({ title, description, tag })
            });
            const json = response.json();
        }

        // !! function to edit note

        let newNote = JSON.parse(JSON.stringify(notes));

        for (let index = 0; index < newNote.length; index++) {
            const element = newNote[index];
            if (element._id === id) {
                newNote[index].title = title;
                newNote[index].description = description;
                newNote[index].tag = tag;
                break;
            }
        }

        setNotes(newNote);
    }


    // ?? DELETE NOTE
    const deleteNote = async (id) => {

        if (!window.confirm("Are you sure you want to delete this note?")) return;
        // !! API call
        const url = `${backendUrl}/api/notes/delete_notes/${id}`;
        {
            const response = await fetch(url, {
                method: 'DELETE',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': sessionStorage.getItem('token')
                }
            });
            const json = response.json();
            console.log(json);
        }


        // console.log("Deleting node with id : " + id);
        const newNotes = notes.filter((note) => { return note._id !== id });
        setNotes(newNotes);
        // alert("Note deleted successfully");

    }

    return (
        <NoteContext.Provider value={{ notes, setNotes, addNote, editNote, deleteNote, getNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;