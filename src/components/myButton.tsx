import { useState } from "react";

export function MyButton() {
	const [currentBid, setCurrentBid] = useState(0);

	function handleClick() {
		setCurrentBid(currentBid + 1)
	}
	
	return (
	  <button onClick={handleClick}>
		{ currentBid } bid
	  </button>
	);
  }