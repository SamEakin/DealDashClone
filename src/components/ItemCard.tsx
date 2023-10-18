import { Badge, Button, Card, Group, Image, Text } from "@mantine/core";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";

interface ItemCardProps {
  id: number,
  name: string,
  description: string,
  src: string,
  bidAmount: number,
}
export default function ItemCard(props: ItemCardProps) {

  const [total, setTotal] = useState(0);
  const [deadline, setDeadline] = useState(DateTime.now().plus({ seconds: 10 }));
  const [remainingTime, setRemainingTime] = useState('0');
  const [expired, setExpired] = useState(false);

  function handleBid() {
    const newDeadline = deadline.plus({ minutes: 1 })
    setDeadline(newDeadline)
    setTotal(total + 1);
  }

  function getTime() {
    const timeLeft = deadline.diff(DateTime.now(), ["seconds"]);
    if (timeLeft.seconds <= 0) {
      setExpired(true)
    } else {
      setRemainingTime(timeLeft.toFormat('m:ss'))
    }
  }

  useEffect(() => {
    const interval = setInterval(() => getTime(), 1000);

    return () => clearInterval(interval);
  }, [deadline]);

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder mb="lg" mt="lg">
      <Card.Section>
        <Image
          src={props.src}
          height={160}
          alt={props.name}
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{props.name} - { expired? "SOLD" : remainingTime}</Text>
        <Badge size="xl" color={expired ? "red" : "green"} variant="light">
          ${total}
        </Badge>
      </Group>

      <Text size="sm" c="dimmed">
        {props.description}
      </Text>

      <Button bg={expired ? "gray" : "cyan"} onClick={handleBid} disabled={expired}>
        Bid
      </Button>
    </Card>
  )
}