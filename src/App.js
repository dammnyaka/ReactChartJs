import './App.scss'
import { useEffect, useState } from 'react';
import axios from 'axios';

import { InputConverter } from './component/InputConverter.jsx';
import { Coin } from './component/Coin.jsx';
import { Charter } from './component/Charter.jsx';
import  Profile  from './component/Profile.jsx';

function App() {

  const apiCoin = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';
  const apiMarket = (id) => `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=14&interval=daily`;
  
  const [nameState, setNameState] = useState([]);
  const [current, setCurrent] = useState();
  const [item, setItem] = useState([]);
  const [isProfile,setProfile] = useState(true)
  const [searchCard, setSearchCard] = useState('');
  
  const [isLoading, setLoading] = useState(false);
  useEffect(()=> {
    setLoading(false)
    axios.get(apiCoin).then(({data})=> {
      setNameState(data)
    }).finally(()=> setLoading(true)).catch(()=> console.log('error'))
    axios.get(apiMarket(item.id)).then(({data})=> {
      setCurrent(data.prices)
    }).finally(()=> setLoading(true)).catch(()=> console.log('error'))
  },[item]);
  

  const list =  nameState && nameState.filter(item => {
      return (
        item.name.toLowerCase().trim().includes(searchCard.toLowerCase()) ||
        item.symbol.toLowerCase().trim().includes(searchCard.toLowerCase())
      );
    }
  );
  const change = e => {setSearchCard(e.target.value);};


  const [amo1,setAmo1] = useState(1);
  const [amo2,setAmo2] = useState(1);
  const [cur1,setCur1] = useState('Bitcoin');
  const [cur2,setCur2] = useState('Bitcoin');
  
  const handleAmo1 = (amo1) =>{
    const cu1 =  nameState.filter((i)=>  {return i.name === cur1 })
    const ew1 = cu1.map(i=>i.current_price)
    const cu2 =  nameState.filter((i)=>  {return i.name === cur2 })
    const ew2 = cu2.map(i=>i.current_price)
    setAmo2(amo1 * ew1 / ew2);
    setAmo1(amo1);
  }
  const handleCur1 = (cur1) => {
    const cu1 =  nameState.filter((i)=>  {return i.name === cur1 })
    const ew1 = cu1.map(i=>i.current_price)
    const cu2 =  nameState.filter((i)=>  {return i.name === cur2 })
    const ew2 = cu2.map(i=>i.current_price)
    setAmo2(amo1 * ew1 / ew2);
    setCur1(cur1);
  }

  const handleAmo2 = (amo2, ) =>{
    const cu1 =  nameState.filter((i)=>  {return i.name === cur1 })
    const ew1 = cu1.map(i=>i.current_price)
    const cu2 =  nameState.filter((i)=>  {return i.name === cur2 })
    const ew2 = cu2.map(i=>i.current_price)
    setAmo1(amo2 * ew2 / ew1);
    setAmo2(amo2);
  }
  const handleCur2 = (cur2) => {
    const cu1 =  nameState.filter((i)=>  {return i.name === cur1 })
    const ew1 = cu1.map(i=>i.current_price)
    const cu2 =  nameState.filter((i)=>  {return i.name === cur2 })
    const ew2 = cu2.map(i=>i.current_price)
    setAmo1(amo2 * ew2 / ew1);
    setCur2(cur2);
  }


  return (
    <div className="App">
      <div className='app_block'>
        <div className='header'>
          <div onClick={()=> setProfile(false)} className='header_profile'>
            <h2>
              <span>P</span>
              <span>r</span>
              <span>o</span>
              <span>f</span>
              <span>i</span>
              <span>l</span>
              <span>e</span>
            </h2>
            <h1>
              <span>P</span>
              <span>r</span>
              <span>o</span>
              <span>f</span>
              <span>i</span>
              <span>l</span>
              <span>e</span>
            </h1>
          </div>
          <div className='header_title' >
            <a href="/">BLOCKCHAIN</a>
          </div>
        </div>
          {isProfile ? 
            <div className='main'>
              {isLoading ? nameState &&
              <div> 
                <div className='main_convert'>
                  <InputConverter
                    items={nameState}
                    amo={amo1}
                    cur={cur1}
                    onAmo={handleAmo1}
                    onCur={handleCur1}
                  />
                  <InputConverter
                    items={nameState}
                    amo={amo2}
                    cur={cur2}
                    onAmo={handleAmo2}
                    onCur={handleCur2}
                  />
                </div>
                <div className='main_coin'>
                  <Coin  
                    items={nameState} 
                    obj={setItem}
                  />
                </div>
              </div> :
              <div className='loading'>Loading...</div>}
              <div className='main_charts'>
                  {current && 
                   <Charter
                    chartData={{
                      labels: current.map((item)=> { 
                        let myDate = new Date(item[0])
                        return myDate.toLocaleDateString()
                      }),
                      datasets: [{
                        label: item.name,
                        data: current.map(item=> item[1]),
                        backgroundColor: ['#bb9e88'],
                        borderColor: '#bb9e88',
                        borderWidth: 2,
                        lineTension: 0.3,
                        pointBorderWidth: 2,
                      }],
                      
                    }}
                   />}
              </div>
          </div> : 
            <div>
              {nameState &&<Profile 
                  backProfile={setProfile}
                  items={list}
                  change={change}
              />}
            </div>
          }
      </div>
    </div>
  );
}

export default App;
