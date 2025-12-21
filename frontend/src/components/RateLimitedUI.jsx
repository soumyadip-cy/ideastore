import { ZapIcon } from 'lucide-react';
import React from 'react'

const RateLimitedUI = () => {
    return (
        <div className='max-w-6xl mx-auto px-4 py-8'>
            <div className='bg-primary/10 border border-primary/30 rounded-lg shadow-md'>
                <div className='flex flex-col md:flex-row items-center p-6'>
                    <div className='shrink-0 bg-primary/20 rounded-full mb-4 md:mb-0 md:mr-6'>
                        <ZapIcon className='size-10 text-primary' />
                    </div>
                    <div className='flex-1 text-center md:text-left'>
                        <h3 className='text-2xl '>
                            Rate Limit Reached!
                        </h3>
                        <p className='text-base-content mb-1'>
                            Woah woah! Cool down buddy. You've hit the rate limit.
                            Take a deep breath, maybe grab a coffee, and try again in a bit.
                        </p>
                        <p className='text-sm text-base-content/70'>
                            Quality beats quantity. Let's keep things smooth for everyone!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RateLimitedUI;