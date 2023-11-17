import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
} from "@chakra-ui/react";
import { IScQxTagExtension } from "utils/types/sc.interface";
import { useGetExtensionsList } from "views/Tags/hooks/useGetQTag";

interface IProps {
  onSelect: (extention: IScQxTagExtension) => void;
  selectedExtention: IScQxTagExtension;
  specificCollection?: { [key: string]: boolean };
  disabled?: boolean;
  itemClicked?: boolean;
}

const ExtensionSelect = ({ onSelect, disabled, selectedExtention, specificCollection, itemClicked }: IProps) => {
  const { extensionsInfo } = useGetExtensionsList();

  const filteredExtensions = extensionsInfo.filter((extension) => {
    if (specificCollection) {
      if (
        specificCollection["QXFLM-06e81a"] != true &&
        extension.extension === "flamie"
      ) {
        return false;
      }
      if (
        specificCollection["QXHR-9b0bc6"] != true &&
        extension.extension === "hero"
      ) {
        return false;
      }
    }
    return true;
  });

  return (
    <Box>
      <Menu placement="bottom-end">
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon />}
          position={"relative"}
          disabled={disabled}
          style={{
            opacity: itemClicked ? 1 : 0.5,
          }}
        >
          {selectedExtention ? (
            `.${selectedExtention?.extension}`
          ) : (
            <Spinner size={"sm"} />
          )}
        </MenuButton>
        <MenuList maxH={"250px"} overflow={"auto"} bg="black.light" zIndex={10}>
          {filteredExtensions.map((extension) => (
            <MenuItem
              key={extension.extension}
              onClick={() => onSelect(extension)}
              bg="black.light"
              _hover={{
                bg: "black.base",
              }}
            >
              {extension.extension}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Box>
  );
};

export default ExtensionSelect;
