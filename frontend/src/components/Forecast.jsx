import React from 'react'
import { iconUrlFromCode } from '../services/weatherServices';

function Forecast({title,items}) {
    if (!items) {
        return null;
      }
  return (
    <div>
        <div className='flex items-center justify-start my-6'>
        <p className='text-white font-medium uppercase'>{title}</p>
        </div>
    <hr className='my-2'/>
    <div className='flex flex-row items-center justify-between text-white'>
        {items.map((item)=>(
        <div className='flex flex-col items-center justify-center'>
            <p className='font-light text-sm'>{item.title}</p>
            <img
            src={iconUrlFromCode(item.icon)}
            className='w-12 my-1'
            alt=''
            />
            <p className='font-medium'>22°</p>
        </div>
        ))}
        </div>
    </div>
  )
}

export default Forecast