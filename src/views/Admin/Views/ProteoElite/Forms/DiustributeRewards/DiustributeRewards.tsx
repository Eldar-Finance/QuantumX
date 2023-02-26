import { Box, Center, Select } from "@chakra-ui/react";
import { BytesValue } from "@elrondnetwork/erdjs/out";
import { scCall } from "api/sc/calls";
import { proteoEliteWsp } from "api/sc/sc";
import ActionButton from "components/ActionButton/ActionButton";
import { useFormik } from "formik";
import { proteoFarms, proteoFarmsArr } from "views/Farms/constants";
import { proteoPools, proteoPoolsArr } from "views/Pools/constants";
import * as yup from "yup";

const validationSchema = yup.object({
  title: yup.string().required(),
});

const DiustributeRewards = () => {
  const formik = useFormik({
    initialValues: {
      title: proteoPoolsArr[0].token,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const { tokenIdentifier } = proteoFarms[values.title]
        ? proteoFarms[values.title]
        : proteoPools[values.title];

      const res = await scCall(
        proteoEliteWsp,
        "forceDistributeUnclaimed",
        [BytesValue.fromUTF8(tokenIdentifier)],
        400000000
      );
    },
  });

  return (
    // @ts-ignore
    <Box as="form" w="full" onSubmit={formik.handleSubmit}>
      <Center flexDirection={"column"}>
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
          name="title"
        >
          {proteoFarmsArr.map((pf) => {
            return (
              <Box
                key={pf.tokenIdentifier}
                as="option"
                value={pf.token}
                bg="#252943 !important"
              >
                {pf.stakedCoin}
              </Box>
            );
          })}
          {proteoPoolsArr.map((pf) => {
            return (
              <Box
                key={pf.tokenIdentifier}
                as="option"
                value={pf.token}
                bg="#252943 !important"
              >
                {pf.stakedCoin}
              </Box>
            );
          })}
        </Select>
        <ActionButton type="submit" px={8} py={5}>
          1 - Force-Distribute before Harvest
        </ActionButton>
      </Center>
    </Box>
  );
};

export default DiustributeRewards;
