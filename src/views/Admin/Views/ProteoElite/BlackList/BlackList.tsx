import { CheckIcon, CopyIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  Flex,
  Icon,
  Input,
  Text,
  useClipboard,
} from "@chakra-ui/react";
import { Address, AddressValue } from "@multiversx/sdk-core/out";
import { scCall } from "api/sc/calls";
import { proteoEliteWsp } from "api/sc/sc";
import ActionButton from "components/ActionButton/ActionButton";
import { useEffect, useState } from "react";
import { fetchListOfBlacklisted } from "redux/slices/proteo/funcs";
import { formatAddress } from "utils/functions/formatAddress";
import { useAppDispatch, useAppSelector } from "utils/hooks/redux";
const BlackList = () => {
  const dispatch = useAppDispatch();
  const blackListAdderss = useAppSelector(
    (state) => state.proteo.blackList.data
  );

  useEffect(() => {
    dispatch(fetchListOfBlacklisted());
  }, [dispatch]);

  return (
    <Box mt={12}>
      <Text fontSize={"3xl"} fontWeight="bold" textAlign={"center"} mb={4}>
        Black List Zone
      </Text>
      <Box>
        {blackListAdderss.map((address) => {
          return (
            <Center key={address}>
              {" "}
              <AddressComponent address={address} />
            </Center>
          );
        })}
      </Box>
      <BlackListForm />
    </Box>
  );
};

export default BlackList;

const AddressComponent = ({ address }) => {
  const { hasCopied, onCopy } = useClipboard(address);
  return (
    <Flex
      justifyContent={"center"}
      alignItems={"flex-end"}
      marginBottom={"15px"}
      marginLeft={"10px"}
    >
      {formatAddress(address)}

      <Box marginLeft={"5px"} onClick={onCopy} cursor={"pointer"}>
        {hasCopied ? (
          <Icon as={CheckIcon} fontSize={"14px"} />
        ) : (
          <Icon as={CopyIcon} fontSize={"14px"} />
        )}
      </Box>
    </Flex>
  );
};

const BlackListForm = () => {
  const [address, setAddress] = useState("");
  const handleAdd = () => {
    scCall(
      proteoEliteWsp,
      "addBlacklisted",
      [new AddressValue(new Address(address))],
      50000000
    );
  };
  const handelRemove = () => {
    scCall(
      proteoEliteWsp,
      "removeBlacklisted",
      [new AddressValue(new Address(address))],
      50000000
    );
  };
  return (
    <Center flexDirection={"column"}>
      <Input
        mb={4}
        width={{ xs: "300px", tablet: "450px" }}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Address"
        name="address"
      />
      <ActionButton type="submit" px={8} py={5} onClick={handleAdd} mb={5}>
        Add Black Listed
      </ActionButton>
      <ActionButton type="submit" px={8} py={5} onClick={handelRemove}>
        Remove Black Listed
      </ActionButton>
    </Center>
  );
};
