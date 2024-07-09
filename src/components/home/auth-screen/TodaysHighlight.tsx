"use client";

import React from 'react';
import { CldVideoPlayer } from 'next-cloudinary';


const TodaysHighlight = () => {
    return (
        <div className='w-full md:w-3/4 mx-auto'>
            <CldVideoPlayer 
                width="960"
                height="540"
                className='rounded-md'
                src='vid1_isii3s'
            />
        </div>
    )
}

export default TodaysHighlight