import { Text } from "@mantine/core";

interface CurrentBidProps {
  currentBidAmount: number
}

export default function CurrentBid({currentBidAmount}: CurrentBidProps){
  return (
    <Text>
      { currentBidAmount }
    </Text>
  )
}