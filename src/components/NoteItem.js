import React, { useContext, useState, useEffect } from 'react';
import TrashCanIcon from './TrashCanIcon.png';
import EditIcon from './EditIcon.png';
import noteContext from '../context/notes/noteContext';
// import { EditNote } from './EditNote';



const NoteItem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote, editNote } = context;
    const { note, updatenote } = props;
    // let visibility = props.v


    const [visible, setVisible] = useState(props.visibility);

    const toggle_visibility = (new_state) => {
        if (visible === 'hidden') {
            setVisible('visible');
        }
        else {
            setVisible('hidden');
        }
    }
    const submit_edit = (currentNote) => {
        toggle_visibility();
        updatenote(notes);

        // todo function to submit the new note
        // console.log("edit note running");

        setNote({ id: currentNote._id, e_title: currentNote.title, e_tag: currentNote.tag, e_description: currentNote.description });
        // console.log(note._id, String(notes.e_title), String(notes.e_description), String(notes.e_tag));

        // editNote(note._id, note.e_title, note.e_description, note.e_tag);
        editNote(note._id, String(notes.e_title), String(notes.e_description), String(notes.e_tag));

    }

    const [notes, setNote] = useState([{ id: "", e_title: "", e_description: "", e_tag: "general" }]);


    const onChange = (event) => {
        setNote({ ...notes, [event.target.name]: event.target.value });
        // console.log("onchange activated");
        // console.log(notes);

    }

    return (
        <>
            <div className="col-auto ">
                <a className="block p-6 my-4 max-w-sm bg-color_2 rounded-lg border border-gray-500 shadow-md hover:bg-gray-100">
                    <div className="flex justify-between">
                        <h5 className="mb-2 text-left text-2xl font-bold tracking-tight text-gray-900">{note.title}</h5>
                        <div className="flex space-x-4">
                            <img className="icon h-6 mt-2" src={TrashCanIcon} onClick={() => { deleteNote(note._id); }} ></img>
                            <img className="icon h-6 mt-2" src={EditIcon} onClick={() => { toggle_visibility('visible') }} />

                        </div>
                    </div>
                    <p className=" font-normal text-left text-gray-700">{note.description}</p>

                </a>

                {/* <EditNote visibility={visible} /> */}

                <div className="card">
                    <div className={`card ${visible} w-screen`}>
                        <div className=" text-center p-6 max-w-sm bg-white rounded-lg border-[3px] border-color_3  shadow-md">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">Edit Note</h5>
                            <div className="e_title">
                                <input type="text" id="e_title" name='e_title' rows="4" className="block p-2.5 w-full mx-auto text-lg h-[7vh] font-thin text-gray-900  rounded-lg border border-gray-500 focus:ring-blue-500 focus:border-blue-500" placeholder="Add a title to your note...." onChange={onChange} value={notes.e_title} ></input>
                            </div>
                            <br />
                            {/* <div className="e_tag">
                                <input type="text" id="e_tag" name='e_tag' rows="4" className="block p-2.5  w-full mx-auto text-lg h-[7vh] font-thin text-gray-900  rounded-lg border border-gray-500 focus:ring-blue-500 focus:border-blue-500" placeholder="Add a tag to your note...." onChange={onChange} value={notes.e_tag}></input>
                            </div>
                            <br /> */}
                            <div className="e_description">
                                <input type="text" id="e_description" name='e_description' rows="4" className="block p-2.5 w-full mx-auto text-lg h-[20vh] font-thin text-gray-900  rounded-lg border border-gray-500 focus:ring-blue-500 focus:border-blue-500" placeholder="Start typing your tales...." onChange={onChange} value={notes.e_description} ></input>
                            </div>
                            <br />
                            <button href="#" className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-gray-800 bg-color_3 rounded-lg hover:bg-color_4 hover:text-white  " onClick={submit_edit}>
                                SUBMIT

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </>

    )
}

export default NoteItem 