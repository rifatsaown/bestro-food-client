import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import orderCover from "../../assets/shop/banner2.jpg";
import Cover from "../Shared/Cover";
import { useState } from "react";

const Order = () => {
    const [tabIndex, setTabIndex] = useState(0);
  return (
    <div>
      <Cover title={"order food"} img={orderCover}></Cover>
      <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <TabList>
          <Tab>Title 1</Tab>
          <Tab>Title 2</Tab>
        </TabList>
        <TabPanel></TabPanel>
        <TabPanel></TabPanel>
      </Tabs>
    </div>
  );
};

export default Order;
