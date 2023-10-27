import { Box, Flex, Input, Select, Text } from "@chakra-ui/react";
import { Address, AddressValue, U64Value } from "@multiversx/sdk-core/out";
import { gasLimit } from "api/net.config";
import { scCall } from "api/sc/calls";
import { scQuery } from "api/sc/queries";
import BigNumber from "bignumber.js";
import ActionButton from "components/ActionButton/ActionButton";

import { useFormik } from "formik";
import { config } from "process";
import { useEffect, useState } from "react";
import { setElrondBalance } from "utils/functions/formatBalance";
import useGetFarmCreators from "views/Panel/hooks/useGetFarmCreators";
import useGetFarmIds from "views/Panel/hooks/useGetFarmIds";
import useGetUsersToAutoHarvest from "views/Panel/hooks/useGetUsersToAutoHarvest";
import * as yup from "yup";

const validationSchema = yup.object({
  value: yup.number(),
});

interface IProps {
  placeholder?: string;
  title: string;
  scFunc:
    | "forceHarvestAuto";
  isAmount?: boolean;
}

const RunAutoHarvest = ({ isAmount, scFunc, placeholder, title }: IProps) => {
  const [gasLimit, setGasLimit] = useState(200000000);
  const [users, setUsers] = useState([]);

  const handleChangeGasLimit = () => (e) => {
    setGasLimit(e.target.value);
    if (e.target.value === "") {
      setGasLimit(200000000);
    }
  }

  const formik = useFormik({
    initialValues: {
      id: "",
      user: ""
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const farmId = values.id;
      const userAddress = values.user;
      scCall("farms2", scFunc, [
        new AddressValue(new Address(userAddress)),
        isAmount
          ? new U64Value(new BigNumber(Number(setElrondBalance(Number(farmId)))))
          : new U64Value(new BigNumber(Number(farmId))),
      ],
      gasLimit,
      `Processing auto-harvest for User erd...${userAddress.substring(userAddress.length - 4)} in Farm ${farmId}`,
      `Completed auto-harvest for User erd...${userAddress.substring(userAddress.length - 4)} in Farm ${farmId}`,
      `Failed auto-harvest for User erd...${userAddress.substring(userAddress.length - 4)} in Farm ${farmId}`,
      );
    },
  });

  const { farmIds } = useGetFarmIds();
  const { usersToAutoHarvest, isLoading, error } = useGetUsersToAutoHarvest(formik.values.id);

  useEffect(() => {
    setUsers(usersToAutoHarvest);
  }
  , [usersToAutoHarvest]);

  // useEffect(() => {
  //   setUsers([]);
  // }, [formik.values.id]);
  
  const handleFarmIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    formik.handleChange(e);
    // Your custom logic here
    setUsers([])
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Flex
        flexDirection={"column"}
        width="full"
        mb={8}
        maxW={{ xs: "300px", tablet: "450px" }}
      >
        <Text as="h2" fontSize={"1.8rem"} mb={5}>
          {title}
        </Text>
        <Select
          onChange={handleFarmIdChange}
          variant="filled"
          bg="#0F1535"
          mb={4}
          _focus={{
            bg: "#0F1535",
          }}
          _hover={{
            bg: "#0F1535",
          }}
          cursor="pointer"
          name="id"
        >
          <Box as="option" value={""} bg="#252943 !important">
            Select Farm ID
          </Box>
          {farmIds.map((item) => {
            return (
              <Box key={item.toString()} as="option" value={item.toString()} bg="#252943 !important">
                {item}
              </Box>
            );
          })}
        </Select>
        <Select
          onChange={formik.handleChange}
          variant="filled"
          bg="#0F1535"
          mb={4}
          _focus={{
            bg: "#0F1535",
          }}
          _hover={{
            bg: "#0F1535",
          }}
          cursor="pointer"
          name="user"
        >
          {users.length > 0 ?
          <Box as="option" value={""} bg="#252943 !important">
            Select User
          </Box> :
          <Box as="option" value={""} bg="#252943 !important">
            ... Loading ...
          </Box>}
          {users.length > 0 && users.sort((a, b) => b.stakePercentage - a.stakePercentage).map((item) => {
            const firstFourChars = item.address.substring(0, 4);
            const lastFourChars = item.address.substring(item.address.length - 4);
            const epochs = item.epochsSinceLastHarvest > 1000 ? "never" : item.epochsSinceLastHarvest.toString()+' epochs';
            return (
              <Box key={item.address} as="option" value={item.address} bg="#252943 !important">
                {`${firstFourChars}...${lastFourChars}`} &nbsp;&nbsp; - &nbsp;&nbsp; {item.stakePercentage}% &nbsp;&nbsp; - &nbsp;&nbsp; {epochs}
              </Box>
            );
          })}
        </Select>

        <Input
          mb={4}
          w="full"
          onChange={handleChangeGasLimit()}
          placeholder={`Current value: ${gasLimit.toLocaleString()}`}
          name="gas"
        />

        <ActionButton type="submit" px={8} py={5}>
          Run
        </ActionButton>
      </Flex>
    </form>
  );
};

export default RunAutoHarvest;
