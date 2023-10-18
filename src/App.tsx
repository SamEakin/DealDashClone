import { faker } from '@faker-js/faker';
import { Container, Grid } from '@mantine/core';
import './App.css';
import ItemCard from './components/ItemCard';


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
      <Grid p="lg" maw={1000}>
        {items.map((item) => {
          return (
            <Grid.Col span={4}>
              <ItemCard
                id={item.id}
                name={item.name}
                description={item.description}
                src={item.src}
                bidAmount={1}
              />
            </Grid.Col>
          )
        })}
      </Grid>
    </Container>
  )
}

export default App
