import { AppShell, Burger, Button, Image, Modal, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { createContext, useState } from "react";
import "./App.css";
import ItemsContainer from "./components/ItemsContainer";

interface User {
  id: number;
  name: string;
  bids: number;
  handleBid: () => void;
}

export const User = createContext<User>({
  id: 1,
  name: "Samuel",
  bids: 1,
  handleBid: () => console.log("handleBid"),
});

function App() {
  const [opened, { toggle }] = useDisclosure();
  const [modalOpened, modalHandler] = useDisclosure(false);
  const [id, setId] = useState(1);
  const [name, setName] = useState("Samuel");
  const [bids, setBids] = useState(2);
  const [botActivity, setBotActivity] = useState(false);

  function handleBid() {
    const remainingBids = bids - 1;
    setBids(remainingBids);
    if (remainingBids == 0) modalHandler.open();
  }

  function handleBuyBids() {
    setBids(bids + 10);
    modalHandler.close();
  }

  function handleBotActivityToggle() {
    setBotActivity(!botActivity);
  }

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <Title order={1}>Scamville</Title>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        Bids: {bids}
        <Button onClick={handleBuyBids}>Buy Bids</Button>
        <Button
          onClick={handleBotActivityToggle}
          bg={botActivity ? "red" : "green"}
        >
          {botActivity ? "Disable " : "Enable "}
          Bot Activity
        </Button>
      </AppShell.Navbar>

      <AppShell.Main>
        <User.Provider value={{ id: id, name: name, bids, handleBid }}>
          <ItemsContainer />
        </User.Provider>
        <Modal
          opened={modalOpened}
          onClose={() => modalHandler.close()}
          title="Buy more bids BROKIE..."
        >
          <Image src="https://www.rollingstone.com/wp-content/uploads/2022/12/andrew-tate-video-analysis.jpg?w=1581&h=1054&crop=1" />
          <Button onClick={handleBuyBids}>Buy Bids</Button>
        </Modal>
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
