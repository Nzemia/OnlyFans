"use client";


import Image from 'next/image'
import { useState } from 'react';
import Features from './Features';


const MasonryGrid = () => {
    const [ hoverIndex, setHoverIndex ] = useState<number | null>(null);
    const [ mousePosition, setMousePosition ] = useState<{x:number, y:number}>({x:0, y:0});


    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
        if(hoverIndex === index) {
            const rectangular = (e.target as HTMLDivElement).getBoundingClientRect(); 
            const x = ((e.clientX - rectangular.left) / rectangular.width) * 100;
            const y = ((e.clientY - rectangular.top) / rectangular.height) * 100;
            setMousePosition({ x, y });
        }
    }



    return (
        <div className='p-5 sm:p-8'>
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 [&>div:not(:first-child)]:mt-8">
                {[...Array(15)].map((_, i) => (
                    <div key={i} className='relative overflow-hidden rounded-md'
                        onMouseEnter={() => setHoverIndex(i)}
                        onMouseLeave={() => setHoverIndex(null)}
                        onMouseMove={(e) => handleMouseMove(e, i)}                    
                    >
                        <Image
                            src={`/featured/${i + 1}.jpg`}
                            alt="featured-cat"
                            width={500}
                            height={500}
                            className='cursor-pointer hover:scale-150 transition-transform duration-500 ease-in-out'
                            style={{
                                transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`
                            }}
                        />
                    </div>                    
                ))}
            </div>

            <Features />
        </div>
    )
}

export default MasonryGrid