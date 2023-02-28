import { Box, Center, Input, Select, Stack } from "@chakra-ui/react";
import { BigUIntValue, BytesValue } from "@multiversx/sdk-core/out";
import { scCall } from "api/sc/calls";
import { proteoEliteWsp } from "api/sc/sc";
import BigNumber from "bignumber.js";
import ActionButton from "components/ActionButton/ActionButton";
import { useFormik } from "formik";
import { setElrondBalance } from "utils/functions/formatBalance";
import { proteoFarms, proteoFarmsArr } from "views/Farms/constants";
import { proteoPools, proteoPoolsArr } from "views/Pools/constants";
import * as yup from "yup";

const validationSchema = yup.object({
  tokenI: yup.string().required(),
  reward: yup.number().required(),
  sproteo: yup.number(),
});

const PrepareUserClaming = () => {
  const formik = useFormik({
    initialValues: {
      tokenI: proteoFarms.PROTEOEGLDLP.token,
      reward: "",
      sproteo: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const { tokenIdentifier } = proteoFarms[values.tokenI]
        ? proteoFarms[values.tokenI]
        : proteoPools[values.tokenI];
      scCall(
        proteoEliteWsp,
        "prepareClaiming",
        [
          BytesValue.fromUTF8(tokenIdentifier),
          new BigUIntValue(new BigNumber(setElrondBalance(values.sproteo, 18))),
          new BigUIntValue(new BigNumber(setElrondBalance(values.reward, 18))),
        ],
        400000000
      );
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Center flexDirection={"column"}>
        <Stack mb={4}>
          <Select
            onChange={formik.handleChange}
            variant="filled"
            bg="#0F1535"
            _focus={{
              bg: "#0F1535",
            }}
            _hover={{
              bg: "#0F1535",
            }}
            cursor="pointer"
            name="tokenI"
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
          <Input
            mb={2}
            width={{ xs: "300px", tablet: "450px" }}
            onChange={formik.handleChange}
            placeholder="SProteo amount"
            name="sproteo"
            isInvalid={formik.touched.sproteo && Boolean(formik.errors.sproteo)}
          />
          <Input
            mb={2}
            width={{ xs: "300px", tablet: "450px" }}
            onChange={formik.handleChange}
            placeholder="Extra reward amount"
            name="reward"
            isInvalid={formik.touched.reward && Boolean(formik.errors.reward)}
          />
        </Stack>

        <ActionButton type="submit" px={8} py={5}>
          <Box>3 - Prepare Users Claiming</Box>
        </ActionButton>
      </Center>
    </form>
  );
};

export default PrepareUserClaming;
