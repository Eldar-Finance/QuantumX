import { Box, BoxProps } from "@chakra-ui/react";
import { getTextBySortKey } from "utils/functions/general";
import { SORTTYPE } from "utils/types/farms.interface";

interface IProps extends BoxProps {
  sortList: SORTTYPE[];
  sortSelectorOpen: boolean;
  onchange: (s: SORTTYPE) => void;
}

const MiniSortModal = ({
  sortList,
  sortSelectorOpen,
  onchange,
  ...props
}: IProps) => {
  return (
    <Box
      position={"absolute"}
      // bg="red"
      w="260px"
      maxH={"272px"}
      right="0"
      bottom={"-120px"}
      borderRadius="5px"
      zIndex={"9"}
      py={"12px"}
      px={"24px"}
      bg={"black.base"}
      border="0.5px solid #a8a8a8a3"
      boxShadow={"0px 4px 20px rgb(0 0 0 / 30%)"}
      {...props}
    >
      {sortList.map((s) => {
        return (
          <Box
            key={s}
            py={2}
            cursor="pointer"
            fontWeight={"500"}
            _hover={{ fontWeight: "600" }}
            onClick={() => onchange(s)}
          >
            {getTextBySortKey(s)}
          </Box>
        );
      })}
    </Box>
  );
};

export default MiniSortModal;
