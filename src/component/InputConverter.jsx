import React from 'react'
import './InputConverter.scss'
export const InputConverter = ({items, amo, cur, onAmo, onCur}) => {

  return (
    <div className='input_block'>
     <input type="text" value={amo} onChange={e=> onAmo(e.target.value)} />
     <select  value={cur} onChange={e=> onCur(e.target.value)}>
      {items.map(item=>( 
        <option key={item.id} value={item.current_price}>{item.name}</option>
       ))}
      </select>
    </div>
  )
}

