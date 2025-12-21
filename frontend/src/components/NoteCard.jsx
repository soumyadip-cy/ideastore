import { PenSquare, PenSquareIcon, Trash, Trash2 } from 'lucide-react';
import React from 'react'
import { Link } from 'react-router';
import api from '../lib/axios';

import { formatDate } from '../lib/util';
import toast from 'react-hot-toast';

const NoteCard = ({ note, refreshNotes }) => {

    const handleEdit = async (e, id) => {
        e.preventDefault(); // Prevent navigating to note detail page
        // Implement edit functionality here
        console.log("Editing note with id:", id);

        try {

        } catch (error) {

        }
    }

    const handleDelete = async (e, id) => {
        e.preventDefault(); // Prevent navigating to note detail page
        // Implement delete functionality here
        console.log("Deleting note with id:", id);

        if (!window.confirm("Are you sure you want me to forget this idea? This action cannot be undone."))
            return;

        try {
            await api.delete(`/notes/${id}`);
            // Optionally, you can add a success message or refresh the notes list
            console.log("Note deleted successfully");
            toast.success("That idea is incinerated!");
            refreshNotes(prevNotes => prevNotes.filter(n => n._id !== id));
        } catch (error) {
            console.error("Error deleting note: ", error);
            toast.error("I cannot forget that idea right now. Please try again later.");
        }
    }

    return (
        <Link to={`/note/${note._id}`} className='card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-6 border border-solid border-primary rounded-lg overflow-hidden'>
            <div className='card-body cursor-default'>
                <div className='cursor-pointer'>
                    <h3 className='card-title text-base-content'>{note.title}</h3>
                    <p className='text-base-content/70 line-clamp-3'>{note.content}</p>
                </div>
                <div className='card-actions justify-between items-center mt-4'>
                    <span className='text-sm text-base-content/60'>
                        {/* {formatDate(new Date(note.createdAt))} */}
                        {note.modifiedAt ? formatDate(note.modifiedAt) : formatDate(note.createdAt)}
                    </span>
                    <div className='flex items-center gap-5'>
                        <button className='group btn btn-ghost btn-xs text-info' onClick={(e) => handleEdit(e, note._id)}>
                            <PenSquare className='size-4 text-info group-hover:animate-wiggle' />
                        </button>
                        <button className='group btn btn-ghost btn-xs text-error' onClick={(e) => handleDelete(e, note._id)}>
                            <Trash2 className='size-4 text-error group-hover:animate-wiggle' />
                        </button>
                    </div>
                </div>
            </div>
        </Link >
    )
}

export default NoteCard