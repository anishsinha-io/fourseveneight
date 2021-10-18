import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import Posts from "../post/Posts";
import Questions from "../question/Questions";
import { TabPanel, a11yProps } from "../ui/MaterialUITabConfig";

const BasicTabs = () => {
  const [value, setValue] = useState<number>(0);

  const handleChange = (
    e: React.SyntheticEvent<Element, Event>,
    newValue: number
  ) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "#7e7e7e" }}>
        <Tabs
          TabIndicatorProps={{ style: { backgroundColor: "black" } }}
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            label={<span style={{ color: "black" }}>Posts</span>}
            {...a11yProps(0)}
          />
          <Tab
            label={<span style={{ color: "black" }}>Questions</span>}
            {...a11yProps(1)}
          />

          <Tab
            label={<span style={{ color: "black" }}>Explore</span>}
            {...a11yProps(2)}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Posts />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Questions />
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </Box>
  );
};

export default BasicTabs;
