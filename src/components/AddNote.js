import { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import Loader from './Loader';

export const AddNote = () => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [loading, setLoading] = useState(false);

    const handle_click = async (event) => {

        try {
            setLoading(true);

            event.preventDefault();
            await addNote(note.title, note.description, note.tag);
            // console.log("Adding a note");
            setNote({ title: "", description: "", tag: "" });
            // console.log(res);

        } catch (error) {
            console.log(error);
            setLoading(false);
        }
        finally {
            setLoading(false);
        }


    }
    const onChange = (event) => {
        setNote({ ...note, [event.target.name]: event.target.value });
    }

    const [note, setNote] = useState([{ title: "", description: "", tag: "general" }]);



    return (
        <>

            {/* {loading &&
                <div className='w-screen h-screen flex items-center justify-center bg-green-600' >
                    <div className='flex flex-col justify-center' >
                        <Loader />
                    </div>
                </div>
            } */}

            {loading &&
                <div className='w-2/3 h-96 flex items-center justify-center mx-auto my-auto' >
                    <div className='flex flex-col justify-center' >
                        <Loader />
                    </div>
                </div>
            }

            {!loading &&
                <div className="newNote">
                    <div className="heading flex justify-around ">
                        <label htmlFor="message" className="block m-8 text-2xl font-normal text-yellow-900">Make a new Note  </label>
                    </div>
                    {/* <br /> */}
                    <div className="title">
                        <textarea id="title" name='title' rows="4" className="block p-2.5 w-1/3 mx-auto text-lg h-[7vh] font-thin text-gray-900  rounded-lg border border-gray-500 focus:ring-blue-500 focus:border-blue-500" placeholder="Add a title to your note...." onChange={onChange} minLength={3} required value={note.title}></textarea>
                    </div>
                    <br />
                    <div className="tag">
                        {/* <textarea id="tag" name='tag' rows="4" className="block p-2.5 w-1/3 mx-auto text-lg h-[7vh] font-thin text-gray-900  rounded-lg border border-gray-500 focus:ring-blue-500 focus:border-blue-500" placeholder="Add a tag to your note...." onChange={onChange} value={note.tag}></textarea> */}
                    </div>
                    <br />
                    <div className="description">
                        <textarea id="description" name='description' rows="4" className="block p-2.5 w-1/2 mx-auto text-lg h-[20vh] font-thin text-gray-900  rounded-lg border border-gray-500 focus:ring-blue-500 focus:border-blue-500" placeholder="Start typing your tales...." onChange={onChange} minLength={3} required value={note.description}></textarea>
                    </div>
                    <div className="flex justify-center">
                        <button type="button" className="focus:outline-none text-white bg-color_4 hover:bg-color_3 focus:ring-4 focus:ring-color_4  font-lighr rounded-lg text-normal m-5 p-3" onClick={handle_click}>Create New Note</button>

                    </div>

                </div>
            }


        </>
    )
}
export default AddNote;
