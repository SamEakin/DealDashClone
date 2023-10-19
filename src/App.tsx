import { faker } from '@faker-js/faker';
import { Container, Grid } from '@mantine/core';
import { useState } from 'react';
import './App.css';
import ItemCard from './components/ItemCard';

interface Item {
  id: number,
  name: string,
  description: string,
  src: string
}

function generateItem(): Item {
  return {
    id: faker.number.int({ max: 1000000 }),
    name: faker.commerce.product(),
    description: faker.commerce.productDescription(),
    src: faker.image.urlLoremFlickr({ category: 'animals' })
  }
}

function App() {
  const [items, setItems] = useState([generateItem(), generateItem(), generateItem()])

  function removeItem(id: number) {
    let newItems = items
    newItems = newItems.filter(item => item.id !== id)
    newItems.push(generateItem())
    setItems(newItems)
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
              />
            </Grid.Col>
          )
        })}
      </Grid>
    </Container>
  )
}

export default App
