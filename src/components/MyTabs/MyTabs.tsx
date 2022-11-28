import {
  Box,
  BoxProps,
  Tab,
  TabList,
  TabListProps,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";

interface IProps {
  tabData: {
    tabText: string;
    tabPanel: JSX.Element;
  }[];

  tabListProps?: TabListProps;
  tabListWarapperProps?: BoxProps;
  tabProps?: any;
}

const MyTabs = ({
  tabData,
  tabListProps,
  tabProps,
  tabListWarapperProps,
}: IProps) => {
  return (
    <Tabs variant={"unstyled"} isLazy {...tabProps}>
      <Box overflow={"auto"} {...tabListWarapperProps}>
        <TabList
          bg="black.dark"
          w="fit-content"
          borderRadius={"full"}
          {...tabListProps}
        >
          {tabData.map((e) => (
            <Tab
              key={e.tabText}
              _selected={{
                bg: "main",
                color: "black.dark",
              }}
              fontSize={{ xs: "sm", md: "md", xl: "lg" }}
              py={"10px"}
              px={{ xs: "20px", md: "30px", xl: "40px" }}
              borderRadius={"full"}
              fontWeight="500"
            >
              <Text>{e.tabText}</Text>
            </Tab>
          ))}
        </TabList>
      </Box>
      <TabPanels>
        {tabData.map((e) => (
          <TabPanel key={e.tabText} px={0}>
            {e.tabPanel}
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};

export default MyTabs;
