import React from 'react'

function TopButton() {

  const cities = [
  {
    id:1,
    title:'Colombo'
  },
  {
    id:2,
    title:'Colombo'
  },
]
  return <div className="flex item-center justify-around my-6">
      {cities.map((city)=>(
        <button key={city.id} className="text-white text-lg font-medium">{city.title}</button>
      ))}
    </div>
  
}

export default TopButton;