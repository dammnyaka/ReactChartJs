import React from 'react'
import './Coin.scss'

export const Coin = ({ items, obj }) => {
  
  return (
    <div className='coin'>
      {items && items.map((item)=> (
      <div 
        onClick={() => obj(item)}
        key={item.id} 
        className='coin_block'
       >
        <div className='coin_icna'>
          <img className='coin_icon' src={item.image} alt="icon" />
          <div className='coin_symbol'>{item.symbol}</div>
          <div className='coin_name'>{item.name}</div>
        </div>
        <div className='coin_prices'>{`Price: $ ${item.current_price.toFixed(2)}`}</div>
        <div className='coin_cap'>{`Market cap: $ ${item.market_cap}`}</div>
        <div style={item.price_change_percentage_24h < 0 ? {color:'#bb9e88'}:{color:'#00bfff'}} className='coin_change'>
          <div>{`${item.price_change_24h.toFixed(5)} 24h`}</div>
          <div>{`${item.price_change_percentage_24h.toFixed(2)}% 24h`}</div> 
        </div>
      </div>
      ))}
    </div>
  )
}

