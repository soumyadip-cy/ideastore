import React from 'react';
import { Loader } from 'lucide-react';

const Loading = ({ message }) => {
    return (
        <div className='size-max m-auto flex flex-row gap-5 text-primary'>
            <span className='flex flex-row'>
                {message}
            </span>
            <Loader className='animate-spin [animation-duration:5s]' />
        </div>
    )
}

export default Loading