import { Box, Flex, Input, Select, Text } from "@chakra-ui/react";
import { U64Value } from "@multiversx/sdk-core/out";
import { gasLimit } from "api/net.config";
import { scCall } from "api/sc/calls";
import { scQuery } from "api/sc/queries";
import BigNumber from "bignumber.js";
import ActionButton from "components/ActionButton/ActionButton";

import { useFormik } from "formik";
import { useState } from "react";
import { setElrondBalance } from "utils/functions/formatBalance";
import useGetFarmCreators from "views/Panel/hooks/useGetFarmCreators";
import useGetFarmIds from "views/Panel/hooks/useGetFarmIds";
import * as yup from "yup";

const validationSchema = yup.object({
  value: yup.number(),
});

interface IProps {
  placeholder?: string;
  title: string;
  scFunc:
    | "forceHarvestAllUsers";
  isAmount?: boolean;
}

const RunAutoHarvest = ({ isAmount, scFunc, placeholder, title }: IProps) => {
  const [gasLimit, setGasLimit] = useState(600000000);

  const handleChangeGasLimit = () => (e) => {
    setGasLimit(e.target.value);
    if (e.target.value === "") {
      setGasLimit(600000000);
    }
  }

  const formik = useFormik({
    initialValues: {
      id: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const number = values.id;
      scCall("farms2", scFunc, [
        isAmount
          ? new U64Value(new BigNumber(Number(setElrondBalance(Number(number)))))
          : new U64Value(new BigNumber(Number(number))),
      ],
      gasLimit,
      `Processing auto-harvest in Farm ${number}`,
      `Completed auto-harvest in Farm ${number}`,
      `Failed auto-harvest in Farm ${number}`
      );
    },
  });

  const { farmIds } = useGetFarmIds();

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
