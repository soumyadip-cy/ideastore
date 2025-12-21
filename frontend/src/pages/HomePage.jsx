import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { Loader } from 'lucide-react';

import api from '../lib/axios';
import Navbar from '../components/Navbar';
import RateLimitedUI from '../components/RateLimitedUI';
import NoteCard from '../components/NoteCard';
import Loading from '../components/Loading';
import NotesNotFound from '../components/NotesNotFound';

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {

        // Using fetch() to get notes from the backend API
        // const res = await fetch('http://localhost:5001/api/notes/');
        // const data = await res.json();
        // console.log(data);

        // Using axios to get notes from the backend API
        const res = await api.get('/notes/');
        const data = res.data;
        console.log(data);
        setNotes(data);
        setIsRateLimited(false);
      } catch (error) {
        console.error('Error fetching notes:', error);
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Couldn't fetch notes. Please try again later.");
          console.log("Notes couldn't be fetched!");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchNotes();
  }, []);

  return (
    <div className='min-h-full'>
      {isRateLimited && <RateLimitedUI />}

      <div className='max-w-7xl mx-auto p-4 mt-6'>
        {
          loading && <Loading message={"Finding your ideas..."} />
        }
        {!loading && notes.length === 0 && !isRateLimited && <NotesNotFound />}
        {/* {
          !loading && notes.length > 0 &&
          <h1 className='text-primary text-4xl mb-15 pl-5 pb-5 border-b border-l rounded-bl-4xl'>Your Ideas . . .</h1>
        } */}
        {
          notes.length > 0 && !loading && !isRateLimited && (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
              {notes.map((note) => (
                <NoteCard key={note._id} note={note} refreshNotes={setNotes} />
              ))}
            </div>
          )
        }
      </div>
    </div>
  );
}

export default HomePage