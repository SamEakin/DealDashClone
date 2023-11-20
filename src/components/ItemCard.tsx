import { faker } from "@faker-js/faker";
import { Badge, Box, Button, Card, Group, Image, Text } from "@mantine/core";
import { DateTime } from "luxon";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";

interface ItemCardProps {
  id: number;
  name: string;
  description: string;
  src: string;
  bidAmount: number;
  handleExpiredItem: (id: number, soldAmount: number, soldTo: string) => any;
  alreadyExpired?: boolean;
  soldAmount?: number;
  soldTo?: string;
  botActivity: boolean;
}
export default function ItemCard(props: ItemCardProps) {
  const user = useContext(UserContext);
  const [total, setTotal] = useState(props.soldAmount ? props.soldAmount : 0);
  const [deadline, setDeadline] = useState(
    DateTime.now().plus({ seconds: 15 })
  );

  const [remainingTime, setRemainingTime] = useState("0");
  const [expired, setExpired] = useState(
    props.alreadyExpired ? props.alreadyExpired : false
  );
  const [highestBidder, setHighestBidder] = useState<string | null>(null);
  const [backgroundColor, setBackgroundColor] = useState({
    backgroundColor: "white",
  });

  function handleBid(name: string) {
    setDeadline((oldDeadline) => oldDeadline.plus({ seconds: 5 }));
    setHighestBidder(name);
    setTotal((oldTotal) => oldTotal + 1);
    if (name === user.name) {
      user.handleBid();
    }
  }

  function getTime() {
    const timeLeft = deadline.diff(DateTime.now(), ["seconds"]);
    if (timeLeft.seconds <= 0) {
      setExpired(true);
    } else {
      setRemainingTime(timeLeft.toFormat("m:ss"));
      determineBackgroundColor();
    }
  }

  function isHighestBidder() {
    if (highestBidder == user.name) return true;
    return false;
  }

  function determineColor() {
    const timeLeft = deadline.diff(DateTime.now(), ["seconds"]);
    if (expired) return "red";
    if (timeLeft.seconds <= 30) return "yellow";
    return "green";
  }

  function determineBackgroundColor() {
    const timeLeft = deadline.diff(DateTime.now(), ["seconds"]).seconds;
    if (highestBidder == user.name) {
      setBackgroundColor({ backgroundColor: "#e6ffe6" }); // light green
    } else if (timeLeft < 10) {
      setBackgroundColor({ backgroundColor: "#fff2e1" }); // light orange
    } else {
      setBackgroundColor({ backgroundColor: "white" });
    }
  }

  function botPlaceBid() {
    if (Math.random() > 0.85) {
      handleBid(faker.person.firstName());
    }
  }

  useEffect(() => {
    if (props.botActivity && !props.alreadyExpired) {
      const interval = setInterval(() => botPlaceBid(), 1000);
      return () => clearInterval(interval);
    }
  }, [props.botActivity]);

  useEffect(() => {
    if (!props.alreadyExpired) {
      const interval = setInterval(() => getTime(), 250);
      return () => clearInterval(interval);
    }
  }, [deadline]);

  useEffect(() => {
    if (!props.alreadyExpired && expired && highestBidder) {
      props.handleExpiredItem(props.id, total, highestBidder);
    } else if (!props.alreadyExpired && expired) {
      props.handleExpiredItem(props.id, total, "");
    }
  }, [expired]);

  return (
    <Card
      shadow="lg"
      padding="lg"
      radius="md"
      withBorder
      mb="lg"
      mt="lg"
      style={backgroundColor}
    >
      <Card.Section>
        <Image src={props.src} height={160} alt={props.name} />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>
          {props.name} {!expired ? `- ${remainingTime}` : null}
        </Text>
        <Badge size="xl" color={determineColor()} variant="light">
          ${total}
        </Badge>
      </Group>

      <Text size="sm" c="dimmed">
        {props.description}
      </Text>

      {highestBidder ? (
        <Badge bg={highestBidder == user.name ? "green" : "gray"}>
          Highest Bidder: {highestBidder}
        </Badge>
      ) : null}

      <Box style={{ display: "flex", justifyContent: "center" }}>
        {!expired ? (
          <Button
            mt="lg"
            bg={expired ? "gray" : "cyan"}
            onClick={() => handleBid(user.name)}
            disabled={user.bids == 0 || isHighestBidder()}
          >
            Bid
          </Button>
        ) : (
          <Badge bg={props.soldTo ? "green" : "red"} mt="lg">
            {props.soldTo ? `Won by: ${props.soldTo}` : "Expired"}
          </Badge>
        )}
      </Box>
    </Card>
  );
}
