import { Link } from 'react-router';
import { PlusIcon } from 'lucide-react';
import React from 'react'

const Navbar = () => {
    return (
        <header className='bg-blue border-b-3 border-base-content/10'>
            <div className='mx-auto max-w-6xl p-4'>
                <div className='flex items-center justify-between'>
                    <Link to={"/"}>
                        <h1 className='group text-3xl font-bold text-primary font-mono tracking-tighter bg-primary/5 p-2 border border-primary/0 hover:border-primary rounded-md'>
                            <span className='flex flex-row'>
                                {/* Always visible */}
                                <text>I</text>
                                {/* Expanding part */}
                                <text
                                    className="overflow-hidden whitespace-nowrap max-w-0 opacity-0 group-hover:max-w-[10ch] group-hover:opacity-100 transition-all duration-300 ease-in"
                                >
                                    dea
                                </text>
                                {/* Always visible */}
                                <text>S</text>

                                {/* Expanding part */}
                                <text
                                    className="overflow-hidden whitespace-nowrap max-w-0 opacity-0 group-hover:max-w-[10ch] group-hover:opacity-100 transition-all duration-300 ease-out"
                                >
                                    tore
                                </text>
                            </span>
                            {/* <text className='block transition-all group-hover:hidden duration-300'>
                                IS
                            </text>
                            <text className='hidden transition-all group-hover:block duration-300'>
                                IdeaStore
                            </text> */}
                        </h1>
                    </Link>
                    <div className='group flex items-center'>
                        <Link to={"/create"} className='btn btn-primary group-hover:gap-1 hover:bg-primary/0 hover:text-primary transition-all duration-300'>
                            <PlusIcon className='size-5 group-hover:animate-[pulse_1s_ease-in_infinite]' />
                            <span className='overflow-hidden whitespace-nowrap opacity-0 max-w-0 group-hover:opacity-100 group-hover:max-w-100 transition-all duration-300'>
                                New Idea
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navbar