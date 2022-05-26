import React, { useState } from 'react'
import { Pie } from 'react-chartjs-2';


import './Profile.scss'

const Profile = ({items, change, backProfile}) => {

  const [crypto, setCrypto] = useState(0);
  const [total, setTotal] = useState(0)
  const [usd] = useState(1);


  const sData = {
    labels: [456],
    datasets: [{
      id: 1,
      data: [123],
      backgroundColor: ['rgb(187,158,136,0.7)','rgb(255,161,181,0.8)','rgb(128,174,255,0.8)'],
    }],
}

const [isData,setData] = useState(sData)
  const plusChange = (item) => {
    if(usd * item.current_price*crypto>0) {
      setTotal(total + (usd * item.current_price*crypto))
      setData({
        labels:[...sData.labels,item.name],
        datasets:[{id:[...sData.datasets.map(i=>i.id),item.id],
                   data:[...sData.datasets.map(i=>i.data),item.current_price*crypto],
                   backgroundColor:[...sData.datasets.map(i=>i.backgroundColor)],
                }]})
    }
    setCrypto(0)
  }
  const  minusChange = (item) => {
    if(total - (usd * item.current_price* crypto) >= 0){
      setTotal(total - (usd * item.current_price* crypto)) 
    }else {
      setTotal(0)
    }
    setCrypto(0)
  }
  return (
    <div className='profile'>
      <div className='profile_block'>
        <div className='profile_block-change'>
          <div className='profile_menu'>
                <div>{`Profile cost ${total.toFixed(2)} $`}</div>
                <input className='profile_menu-search' type="text" name="" id="" placeholder='search...' onChange={change}/>
                <div className='profile_item'>
                   <div className='profile_item-scrollbar'>
                   {items.map((item)=>
                      <div key={item.id} className='profile_bar'>                      
                          <div className='profile_bar-icon'>{item.name}</div>
                          <div className='profile_bar-price'>{item.current_price}</div>
                          <div className='profile_bar-navigation'>
                            <button className='profile_bar-minus' onClick={()=>minusChange(item)}>-</button>
                            <input type="number" 
                              placeholder='0'
                              value={crypto.id} 
                              onChange={e=> { 
                                let value = e.target.value;
                                value = value.replace(/^\D+$/);
                                setCrypto(value);
                              }} 
                              />
                            <button className='profile_but-plus active'  onClick={()=>{plusChange(item);}}>+</button>
                          </div>
                      </div>)}
                    </div>
                  </div>
          </div>
          <button 
            onClick={()=>backProfile(true)} 
            className='profile_block-back'
           >
             back
           </button>
        </div>
        <div className='profile_block-line'></div>
        <div className='profile_block-value'>
          <div className='profile_pie'>
          <Pie
          data={isData}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile;