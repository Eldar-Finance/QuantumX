import { Box, Center, Flex, Select } from "@chakra-ui/react";
import { BytesValue } from "@multiversx/sdk-core/out";
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

const ForceWithdraw = () => {
  const formik = useFormik({
    initialValues: {
      title: proteoFarms.AEROWEGLD.token,
    },
    validationSchema: validationSchema,
    onSubmit: async () => {},
  });

  const handleForceWithDraw = async () => {
    const values = formik.values;
    const { tokenIdentifier } = proteoFarms[values.title]
      ? proteoFarms[values.title]
      : proteoPools[values.title];
    if (tokenIdentifier) {
      const res = await scCall(
        proteoEliteWsp,
        "forceWithdrawAllStaked",
        [BytesValue.fromUTF8(tokenIdentifier)],
        50000000
      );
    }
  };
  const handleRefound = async () => {
    const values = formik.values;
    const { tokenIdentifier } = proteoFarms[values.title]
      ? proteoFarms[values.title]
      : proteoPools[values.title];
    if (tokenIdentifier) {
      const res = await scCall(
        proteoEliteWsp,
        "refundAllStakers",
        [BytesValue.fromUTF8(tokenIdentifier)],
        50000000
      );
    }
  };

  return (
    //@ts-ignore
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
        <Flex justifyContent={"space-around"} w="full" wrap={"wrap"}>
          <ActionButton onClick={handleForceWithDraw} px={8} py={5} mb={2}>
            Force Withdraw
          </ActionButton>
          <ActionButton onClick={handleRefound} px={8} py={5}>
            Refund Stakers
          </ActionButton>
        </Flex>
      </Center>
    </Box>
  );
};

export default ForceWithdraw;
