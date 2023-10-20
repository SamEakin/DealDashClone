import { Badge, Button, Card, Group, Image, Text } from "@mantine/core";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";

interface ItemCardProps {
  id: number;
  name: string;
  description: string;
  src: string;
  bidAmount: number;
  handleExpiredItem: (id: number, soldAmount: number) => any;
  handleBid?: () => any;
  bids?: number;
  alreadyExpired?: boolean;
  soldAmount?: number;
}
export default function ItemCard(props: ItemCardProps) {

  const [total, setTotal] = useState(props.soldAmount ? props.soldAmount : 0);
  const [deadline, setDeadline] = useState(DateTime.now().plus({ seconds: 10 }));

  const [remainingTime, setRemainingTime] = useState('0');
  const [expired, setExpired] = useState(props.alreadyExpired ? props.alreadyExpired : false);
  const [highestBidder, setHighestBidder] = useState<string | null>(null);

  function handleBid() {
    const newDeadline = deadline.plus({ seconds: 30 });
    setDeadline(newDeadline);
    setHighestBidder("myself");
    setTotal(total + 1);
    if (props.handleBid) props.handleBid();
  }

  function getTime() {
    const timeLeft = deadline.diff(DateTime.now(), ["seconds"]);
    if (timeLeft.seconds <= 0) {
      setExpired(true)
    } else {
      setRemainingTime(timeLeft.toFormat('m:ss'))
    }
  }

  function determineColor() {
    const timeLeft = deadline.diff(DateTime.now(), ["seconds"]);
    if (expired) return "red"
    if (timeLeft.seconds <= 30) return "yellow"
    return "green"
  }

  useEffect(() => {
    if (!props.alreadyExpired) {
      const interval = setInterval(() => getTime(), 250);
      return () => clearInterval(interval);
    }
  }, [deadline]);

  useEffect(() => {
    if (!props.alreadyExpired && expired) {
      props.handleExpiredItem(props.id, total);
    }
  }, [expired]);

  return (
    <Card shadow="lg" padding="lg" radius="md" withBorder mb="lg" mt="lg">
      <Card.Section>
        <Image
          src={props.src}
          height={160}
          alt={props.name}
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{props.name} - {expired ? "SOLD" : remainingTime}</Text>
        <Badge size="xl" color={determineColor()} variant="light">
          ${total}
        </Badge>
      </Group>

      <Text size="sm" c="dimmed">
        {props.description}
      </Text>

      {highestBidder ? <Text>Highest Bidder: {highestBidder}</Text> : null}

      <Button bg={expired ? "gray" : "cyan"} onClick={handleBid} disabled={expired || props.bids == 0}>
        Bid
      </Button>
    </Card>
  )
}