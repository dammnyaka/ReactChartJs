import React, { useState } from 'react'
import { useRef } from 'react';
import { Pie, getDatasetAtEvent, getElementAtEvent  } from 'react-chartjs-2';

import './Profile.scss'

const Profile = ({items, change, backProfile}) => {

  const [crypto, setCrypto] = useState('');
  const [total, setTotal] = useState(0);

  const [isData,setData] = useState([]);
  const asd = useRef()
  
  const plusChange = (item) => {
    if(item.current_price*crypto > 0) {
       let obj = {
         labels: item.name,
         datasets: [{
           id: item.id,
           data: item.current_price*crypto,
           backgroundColor: `#${Math.random().toString(16).substring(2,8)}`
         }]
       }
       if(isData.find(item=> item.labels === obj.labels)) {
        const post = isData.find(i=> i.labels === obj.labels)
        post.datasets[0].data = post.datasets[0].data + obj.datasets[0].data
       } else {
        setData(prevData=> [...prevData,obj])
       }
      setTotal(total + (item.current_price*crypto))
    }
    setCrypto('')
  }

  const  minusChange = (item) => {
    if(total - (item.current_price* crypto) >= 0){
      const post = isData.find(i=> i.labels === item.name)
      post.datasets[0].data = post.datasets[0].data > 0 ?
       post.datasets[0].data - item.current_price* crypto : post.datasets[0].data = 0
      setTotal(total - (item.current_price* crypto)) 
    }else {
      setTotal(0)
    }
    setCrypto('')
  }

  const chartRef = useRef();
  const onClick = (event) => {
    console.log(getDatasetAtEvent(chartRef.current, event));
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
                              ref={asd}
                              value={crypto.id} 
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
              ref={chartRef}
              onClick={onClick}
              data={{
                labels: isData.map(x=> x.labels),
                datasets: [{
                  id: isData.map(x=> x.datasets[0].id),
                  data: isData.map(x=> x.datasets[0].data),
                  backgroundColor: isData.map(x=> x.datasets[0].backgroundColor),
                }]
              }}
              options= {{
                        maintainAspectRatio: false,
                        
                    }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile;