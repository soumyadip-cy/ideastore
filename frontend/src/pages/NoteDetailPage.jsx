import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import api from '../lib/axios';
import { Link, useNavigate, useParams } from 'react-router';
import Loading from '../components/Loading';
import { ArrowLeftIcon, PlusIcon, Trash2Icon } from 'lucide-react';

const NoteDetailPage = () => {

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  const handleDelete = async (e) => {
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
      navigate("/");
    } catch (error) {
      console.error("Error deleting note: ", error);
      toast.error("I cannot forget that idea right now. Please try again later.");
    }
  }

  const handleSave = async (e) => {
    e.preventDefault();
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("All fields are required!");
      return;
    }

    setSaving(true);
    // sleep for 1 second to show loading state
    await new Promise(resolve => setTimeout(resolve, 1000));
    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Idea changed successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error in changing idea: ", error);
      if (error.response && error.response.status === 429) {
        toast.error("Woaaah! You're changing ideas faster than I can keep up! Please slow down a bit.", { duration: 5000, icon: '🛑' });
      } else
        toast.error("I failed to change your idea! Please try again later.");
    } finally {
      setSaving(false);
    }
  }

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.error("Error fetching note details: ", error);
        toast.error("I failed fetch the details of that idea. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchNote();
  }, [id]);

  if (loading) {
    return (
      <div className='min-h-full'>

        <div className='max-w-7xl mx-auto p-4 mt-6'>

          <Loading message={"Fetching idea details..."} />
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-full'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto'>
          <div className='flex items-center justify-between mb-6'>
            <Link to="/" className='btn btn-ghost bg-base-300 border border-base-300 hover:border-white group whitespace-nowrap'>
              <ArrowLeftIcon className='size-5 group-hover:animate-[spin_1s]' />
              <span className='max-w-0 group-hover:max-w-[15ch] overflow-hidden transition-all duration-300'>
                See All Your Ideas
              </span>
            </Link>
            <button onClick={handleDelete} className='btn btn-error btn-outline group whitespace-nowrap'>
              <Trash2Icon className='size-5 group-hover:animate-wiggle' />
              <span className='max-w-0 group-hover:max-w-[15ch] overflow-hidden transition-all duration-300'>
                Forget This Idea
              </span>
            </button>
          </div>
          {
            note &&
            <div className="card bg-base-100">
              <div className='mt-1 card-body gap-5'>
                <h2 className='card-title text-3xl mb-2 mx-auto'>Revisit your idea!</h2>
                <form onSubmit={handleSave} className=''>
                  <div className='flex flex-col gap-5 form-control mb-4'>
                    <label className='label'>
                      <span className='label-text text-xl text-primary'>Title</span>
                    </label>
                    <input
                      type='text'
                      placeholder='Name your idea!'
                      className='input input-bordered rounded-2xl w-full'
                      value={note.title}
                      onChange={(e) => setNote({ ...note, title: e.target.value })}
                    />
                  </div>
                  <div className='flex flex-col gap-5 form-control mb-4'>
                    <label className='label'>
                      <span className='label-text text-xl text-primary'>Content</span>
                    </label>
                    <textarea
                      placeholder='Describe your idea . . .'
                      className='textarea textarea-bordered w-full min-h-50 rounded-2xl'
                      value={note.content}
                      onChange={(e) => setNote({ ...note, content: e.target.value })}
                    ></textarea>
                  </div>
                  <div className='card-actions justify-end'>
                    <button type='submit' className='group btn btn-primary rounded-2xl p-5 border hover:text-primary hover:bg-transparent hover transition-all duration-300 flex flex-row whitespace-nowrap' disabled={saving}><span><PlusIcon className='opacity-0 w-0 group-hover:animate-[spin_1s_1] group-hover:opacity-100 group-hover:w-auto transition-all duration-300' /></span><span>{saving ? "Changing . . ." : "Changing Idea"}</span></button>
                  </div>
                </form>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default NoteDetailPage