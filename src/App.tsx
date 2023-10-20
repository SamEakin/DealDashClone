import { AppShell, Burger, Button, Image, Modal, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { useState } from 'react';
import './App.css';
import ItemsContainer from './components/ItemsContainer';

function App() {
  const [opened, { toggle }] = useDisclosure();
  const [modalOpened, modalHandler] = useDisclosure(false);

  const [bids, setBids] = useState(10);

  function handleBid() {
    const remainingBids = bids - 1;
    setBids(remainingBids)
    if (remainingBids == 0) modalHandler.open();
  }

  function handleBuyBids() {
    setBids(10);
    modalHandler.close();
  }

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <Title order={1}>Scamville</Title>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        Bids: {bids}
      </AppShell.Navbar>

      <AppShell.Main>
        <ItemsContainer bids={bids} handleBid={handleBid} />
        <Modal opened={modalOpened} onClose={() => modalHandler.close()} title="Buy more bids BROKIE...">
          <Image src="https://www.rollingstone.com/wp-content/uploads/2022/12/andrew-tate-video-analysis.jpg?w=1581&h=1054&crop=1" />
          <Button onClick={handleBuyBids} >Buy Bids</Button>
        </Modal>
      </AppShell.Main>


    </AppShell>
  )
}

export default App
