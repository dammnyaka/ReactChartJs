import React, { useState } from 'react'
import { useRef } from 'react';
import { Pie } from 'react-chartjs-2';


import './Profile.scss'

const Profile = ({items, change, backProfile}) => {

  const [crypto, setCrypto] = useState('');
  const [total, setTotal] = useState(0)
  const [usd] = useState(1);

  const [isData,setData] = useState([])
  // const asd = useRef()
  const plusChange = (item) => {
    if(item.current_price*crypto>0 && item.name) {
      let obj = {
                  labels: item.name,
                  datasets: [{
                    data: item.current_price*crypto,
                    backgroundColor: `#${Math.random().toString(16).substring(7)}`
                  }]
                }
      setTotal(total + (item.current_price*crypto))
      setData(...isData.push(obj))
    } 
  }
  
  const  minusChange = (item) => {
    if(total - (usd * item.current_price* crypto) >= 0){
      setTotal(total - (usd * item.current_price* crypto)) 
    }else {
      setTotal(0)
    }
    // setCrypto('')
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
                              name={item.name}
                              // defaultValue=''
                              // ref={asd}
                              // value={crypto} 
                              onChange={e=> {
                                  setCrypto(e.target.value)
                                }
                              }
                              />
                            <button className='profile_but-plus active' onClick={()=> plusChange(item)}>+</button>
                          </div>
                      </div>)}
                    </div>
                  </div>
          </div>
          <button 
            onClick={()=>backProfile(true)} 
            className='profile_block-back'>
             back
           </button>
        </div>
        <div className='profile_block-line'></div>
        <div className='profile_block-value'>
          <div className='profile_pie'>
           <Pie
              data={{
                labels: isData.map(x=>x.labels),
                datasets: [{
                  data: isData.map(x=> x.datasets[0].data),
                  backgroundColor: isData.map(x=> x.datasets[0].backgroundColor)
                }]
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile;