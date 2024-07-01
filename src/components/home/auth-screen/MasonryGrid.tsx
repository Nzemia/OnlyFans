import Image from 'next/image'


const MasonryGrid = () => {
    return (
        <div className='p-5 sm:p-8'>
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 [&>div:not(:first-child)]:mt-8">
                {[...Array(15)].map((_, i) => (
                    <div key={i} className='relative overflow-hidden rounded-md'>
                        <Image
                            src={`/featured/${i + 1}.jpg`}
                            alt="featured-cat"
                            width={500}
                            height={500}
                            className='cursor-pointer'
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MasonryGrid