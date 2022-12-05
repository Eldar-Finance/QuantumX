import { ChevronDownIcon } from "@chakra-ui/icons";
import { Box, Flex, Icon, Text, useOutsideClick } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { getTextBySortKey } from "utils/functions/strings";
import { SORTTYPE } from "utils/types/farms.interface";

const MinisortModal: any = dynamic(() =>
  import("./MiniSorModal/MiniSortModal")
);

interface IProps {
  onchange: (sort: SORTTYPE) => void;
  sortKey: SORTTYPE;
  sorts: SORTTYPE[];
}

const Selector = ({ onchange, sortKey, sorts }: IProps) => {
  const [sortSelectorOpen, setSortSelectorOpen] = useState(false);
  const ref = useRef();
  useOutsideClick({
    ref: ref,
    handler: () => setSortSelectorOpen(false),
  });

  const sortList = sorts.filter((s) => s !== sortKey);
  const handleOnChange = (s) => {
    setSortSelectorOpen(false);
    onchange(s);
  };
  return (
    <Box position={"relative"} ref={ref}>
      <Flex
        bg={"black.baseDark"}
        borderRadius={"md"}
        justifyContent={"space-between"}
        w={{ xs: "full", md: "180px" }}
        py={{ xs: "10px", xl: "13px" }}
        px={"20px"}
        flexDir="row"
        alignItems={"center"}
        cursor="pointer"
        fontSize="sm"
        onClick={() => setSortSelectorOpen(true)}
      >
        <Text>{getTextBySortKey(sortKey)}</Text>
        <Icon as={ChevronDownIcon} />
      </Flex>
      {sortSelectorOpen && (
        <MinisortModal
          onchange={handleOnChange}
          sortList={sortList}
          sortSelectorOpen={sortSelectorOpen}
          bottom={"-150px"}
        />
      )}
    </Box>
  );
};

export default Selector;
