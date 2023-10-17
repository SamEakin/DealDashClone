import { useState } from "react";

export function MyButton({currentBid, onClick}) {
	
	return (
	  <button onClick={onClick}>
		current bid = { currentBid }
	  </button>
	);
  }