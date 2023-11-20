import { faker } from "@faker-js/faker";
import { Container, Divider, Grid } from "@mantine/core";
import { useState } from "react";
import ItemCard from "./ItemCard";

interface Item {
  id: number;
  name: string;
  description: string;
  src: string;
  soldAmount?: number;
  soldTo?: string;
}

interface ItemsContainerProps {
  botActivity: boolean;
}

export default function ItemsContainer(props: ItemsContainerProps) {
  const [items, setItems] = useState([
    generateItem(),
    generateItem(),
    generateItem(),
  ]);
  const [expiredItems, setExpiredItems] = useState<Item[]>([]);

  function generateItem(): Item {
    return {
      id: faker.number.int({ min: 10, max: 1000000000 }),
      name: faker.commerce.product(),
      description: faker.commerce.productDescription(),
      src: faker.image.urlLoremFlickr({ category: "animals" }),
    };
  }

  function removeItem(id: number, soldAmount: number, soldTo: string) {
    setItems((oldItems) => [
      ...oldItems.filter((item) => item.id !== id),
      generateItem(),
    ]);

    // Add to expired array
    const expiredItem = items.find((item) => item.id === id);
    if (expiredItem) {
      expiredItem.soldAmount = soldAmount;
      expiredItem.soldTo = soldTo;
      setExpiredItems((oldItems) => [...oldItems, expiredItem]);
    }
  }

  return (
    <Container p="xl">
      <Grid p="lg" maw={1000}>
        {items.map((item) => {
          return (
            <Grid.Col span={4} key={item.id}>
              <ItemCard
                id={item.id}
                name={item.name}
                description={item.description}
                src={item.src}
                bidAmount={1}
                handleExpiredItem={removeItem}
                botActivity={props.botActivity}
              />
            </Grid.Col>
          );
        })}
      </Grid>

      <Divider my="lg" />

      <Grid p="lg" maw={1000}>
        {expiredItems.map((item) => {
          return (
            <Grid.Col span={4} key={item.id}>
              <ItemCard
                id={item.id}
                name={item.name}
                description={item.description}
                src={item.src}
                bidAmount={1}
                handleExpiredItem={removeItem}
                alreadyExpired={true}
                soldAmount={item.soldAmount}
                soldTo={item.soldTo}
                botActivity={false}
              />
            </Grid.Col>
          );
        })}
      </Grid>
    </Container>
  );
}
