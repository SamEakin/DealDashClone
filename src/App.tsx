import { useState } from 'react';
import './App.css';
import CurrentBid from './components/CurrentBid';
import MyButton from './components/MyButton';

function App() {

  const [currentBid, setCurrentBid] = useState(1);
  const [total, setTotal] = useState(0);


  function handleClick() {
    console.log("clicked")
    setTotal(total + currentBid)
  }


  return (
    <>
      <CurrentBid currentBidAmount={total} />
      <MyButton bidAmount={currentBid} onClick={handleClick} />
    </>
  )
}

export default App
