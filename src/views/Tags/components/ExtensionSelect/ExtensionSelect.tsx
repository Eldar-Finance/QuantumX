import { ChevronDownIcon } from "@chakra-ui/icons";
import { Box, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import ActionButton from "components/ActionButton/ActionButton";

const extentions = ["quantumx", "eldar", "multiversx"];

interface IProps {
  onSelect: (extention: string) => void;
  selectedExtention: string;
}

const ExtensionSelect = ({ onSelect, selectedExtention }: IProps) => {
  return (
    <Box>
      <Menu>
        <MenuButton
          as={ActionButton}
          rightIcon={<ChevronDownIcon />}
          position={"relative"}
        >
          .{selectedExtention}
        </MenuButton>
        <MenuList maxH={"250px"} overflow={"auto"} bg="black.light" zIndex={10}>
          {extentions.map((extention) => (
            <MenuItem
              key={extention}
              onClick={() => onSelect(extention)}
              bg="black.light"
              _hover={{
                bg: "black.base",
              }}
            >
              {extention}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Box>
  );
};

export default ExtensionSelect;
