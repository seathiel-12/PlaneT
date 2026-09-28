function Logo() {
  return (
    <div className='flex gap-2 items-center'>
       <img src='/planet-mark.svg' alt='' aria-hidden='true' className='h-12 w-12' />
        <p className='text-2xl font-bold playfair-display text-black'>Plane<span className='text-(--sb-blue-300)'>T</span></p>
    </div>
  )
}

export default Logo
