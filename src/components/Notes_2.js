import React, { useContext, useEffect, useRef } from 'react';
import noteContext from "../context/notes/noteContext"
import Noteitem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

export const Notes_2 = () => {
    const context = useContext(noteContext);
    const { notes, getNote, editNote } = context;
    let navigate = useNavigate();
    useEffect( () => {
        if (sessionStorage.getItem('token')) {
            // console.log(" printing the token in with getnote function " + sessionStorage.getItem('token'));
            getNote();
        }
        else {
            navigate('/login');
        }
        // eslint-disable-next-line
    }, [])

    // !! updatenote stuff 
    const updatenote = (currentNote) => {
        // console.log("update note run");

    }

    return (

        <>
            <div className='flex justify-center'>
                <div className="main flex flex-col justify-between w-5/6">

                    <label htmlFor="message" className="block m-8 text-2xl mx-auto font-normal text-yellow-900">Your Notes Here  </label>

                    {notes.length === 0 && <div className='flex justify-center text-xs '>No notes to display here.....</div>}

                    <div className=" grid grid-cols-3" >

                        {notes.map((note) => {
                            return <Noteitem key={note._id} updatenote={updatenote} note={note} visibility='hidden' />
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}
