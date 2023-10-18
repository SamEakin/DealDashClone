import { useState } from 'react';
import './App.css';
import ItemCard from './components/ItemCard';
import { faker } from '@faker-js/faker';
import { Grid, Container } from '@mantine/core';


const items = [
  {
    id: 1,
    name: faker.commerce.product(),
    description: faker.commerce.productDescription(),
    src: faker.image.urlLoremFlickr({ category: 'animals' })
  },
  {
    id: 2,
    name: faker.commerce.product(),
    description: faker.commerce.productDescription(),
    src: faker.image.urlLoremFlickr({ category: 'animals' })
  },
  {
    id: 3,
    name: faker.commerce.product(),
    description: faker.commerce.productDescription(),
    src: faker.image.urlLoremFlickr({ category: 'animals' })
  }
];

function App() {
  return (
    <Container p="xl">
      <Grid p="lg" maw={400}>
        {items.map((item) => {
          return (
            <ItemCard
              id={item.id}
              name={item.name}
              description={item.description}
              src={item.src}
              bidAmount={1}
            />
          )
        })}
      </Grid>
    </Container>
  )
}

export default App
