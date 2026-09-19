export const LoadingSkeletonLarge = () => (
  <div className="grid grid-cols-[repeat(2,1fr)] gap-10 my-5">
    {Array.from({ length: 2 }).map((_, index) => (
    <div key={index} className="rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden animate-pulse">
        <div className="w-full bg-white rounded-2xl border border-gray-200 py-10 px-10 shadow-lg">
        
        <div className="flex items-center justify-between px-2">

            {/* --------------- */}

            <div className='flex gap-4 items-center text-center'>
                    <div>
                        <p className='rounded-lg w-20 h-5 bg-gray-200 mt-2'></p>
                    </div>
                    
                    <div className='text-center'>                        
                        <div className='flex items-center gap-2'>
                            <hr className='border-[0.5px] border-gray-300 w-15  '/>
                            <div className="rounded-full w-5 h-5 bg-gray-200"></div>
                            <hr className='border-[0.5px] border-gray-300 w-15'/>
                        </div>
                        
                    </div>
                    

                    <div>
                        <p className='rounded-lg w-20 h-5 bg-gray-200 mt-2'></p>
                    </div>
                </div>

            {/* ----------------------- */}

     <div className=' text-right border-l-[0.5px] border-l-gray-300 pl-10 min-w-max'>
            <p className='w-15 h-3 bg-gray-200 flex justify-self-end rounded-md'></p>
                <div
                    className={'rounded-md bg-gray-200 w-20 h-4  mt-1'}
                />
        </div>
            </div>
                <hr className="border-gray-400 my-5 mx-auto" />

                <div className="flex justify-between items-center pr-3">
                    <div className="flex items-center gap-2">
                        <div className='rounded-full p-3 bg-gray-200'/>
                        <p className='bg-gray-200 w-20 h-5 rounded-xl'></p>
                    </div>
                <p className={'rounded-md w-25 h-10 bg-gray-200 translate-x-1'}></p>
                </div>
            </div>
    </div>    ))}


  </div>
);
