import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router';
import { ArrowLeft, ArrowLeftIcon, PlusIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../lib/axios';

const CreatePage = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) {
            toast.error("All fields are required!");
            return;
        }

        setLoading(true);
        // sleep for 1 second to show loading state
        await new Promise(resolve => setTimeout(resolve, 1000));
        try {
            await api.post('/notes/new', {
                title: title.trim(),
                content: content.trim()
            });
            toast.success("Idea noted successfully!");
            navigate("/");
        } catch (error) {
            console.error("Error in adding idea: ", error);
            if (error.response && error.response.status === 429) {
                toast.error("Woaaah! You're generating ideas faster than I can keep up! Please slow down a bit.", { duration: 5000, icon: '🛑' });
            } else
                toast.error("I failed to add your idea! Please try again later.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='min-h-full'>
            <div className='container mx-auto px-4 py-8'>
                <div className='max-w-2xl mx-auto rounded-md'>
                    <Link to="/" className='btn btn-ghost bg-base-300 border border-base-300 hover:border-white group whitespace-nowrap mb-6'>
                        <ArrowLeftIcon className='size-5 group-hover:animate-[spin_1s]' />
                        <span className='max-w-0 group-hover:max-w-[15ch] overflow-hidden transition-all duration-300'>
                            See All Your Ideas
                        </span>
                    </Link>
                    <div className='card bg-base-100'>
                        <div className='mt-1 card-body gap-5'>
                            <h2 className='card-title text-3xl mb-2 mx-auto'>Note your idea!</h2>
                            <form onSubmit={handleSubmit} className=''>
                                <div className='flex flex-col gap-5 form-control mb-4'>
                                    <label className='label'>
                                        <span className='label-text text-xl text-primary'>Title</span>
                                    </label>
                                    <input
                                        type='text'
                                        placeholder='Name your idea!'
                                        className='input input-bordered rounded-2xl w-full'
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>
                                <div className='flex flex-col gap-5 form-control mb-4'>
                                    <label className='label'>
                                        <span className='label-text text-xl text-primary'>Content</span>
                                    </label>
                                    <textarea
                                        placeholder='Describe your idea . . .'
                                        className='textarea textarea-bordered w-full min-h-50 rounded-2xl'
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                    ></textarea>
                                </div>
                                <div className='card-actions justify-end'>
                                    <button type='submit' className='group btn btn-primary rounded-2xl p-5 border hover:text-primary hover:bg-transparent hover transition-all duration-300 flex flex-row whitespace-nowrap' disabled={loading}><span><PlusIcon className='opacity-0 w-0 group-hover:animate-[spin_1s_1] group-hover:opacity-100 group-hover:w-auto transition-all duration-300' /></span><span>{loading ? "Adding . . ." : "Add Idea"}</span></button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default CreatePage