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
  disabled?: boolean;
}

const ExtensionSelect = ({ onSelect, disabled, selectedExtention }: IProps) => {
  const { extensionsInfo } = useGetExtensionsList();

  return (
    <Box>
      <Menu placement="bottom-end">
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon />}
          position={"relative"}
          disabled={disabled}
        >
          {selectedExtention ? (
            `.${selectedExtention?.extension}`
          ) : (
            <Spinner size={"sm"} />
          )}
        </MenuButton>
        <MenuList maxH={"250px"} overflow={"auto"} bg="black.light" zIndex={10}>
          {extensionsInfo.map((einfo) => (
            <MenuItem
              key={einfo.extension}
              onClick={() => onSelect(einfo)}
              bg="black.light"
              _hover={{
                bg: "black.base",
              }}
            >
              {einfo.extension}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Box>
  );
};

export default ExtensionSelect;
