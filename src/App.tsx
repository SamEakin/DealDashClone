import { useState } from 'react'
import './App.css'
import { MyButton } from './components/myButton'

function App() {

	const [currentBid, setCurrentBid] = useState(0);

	function handleClick() {
		setCurrentBid(currentBid + 1)
	}


  return (
    <>
      <MyButton currentBid={currentBid} onClick={handleClick}/>
      <MyButton currentBid={currentBid} onClick={handleClick}/>
    </>
  )
}

export default App
