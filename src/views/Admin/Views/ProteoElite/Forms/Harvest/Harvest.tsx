import { Box, Center, Select } from "@chakra-ui/react";
import {
  BytesValue,
  List,
  ListType,
  U64Type,
  U64Value,
} from "@multiversx/sdk-core/out";
import axiosEldar2 from "api/rest/axiosEldar2";
import { scCall } from "api/sc/calls";
import { proteoEliteWsp } from "api/sc/sc";
import BigNumber from "bignumber.js";
import ActionButton from "components/ActionButton/ActionButton";
import { useFormik } from "formik";
import { proteoFarms, proteoFarmsArr } from "views/Farms/constants";
import { proteoPools, proteoPoolsArr } from "views/Pools/constants";
import * as yup from "yup";

const validationSchema = yup.object({
  title: yup.string().required(),
});

const Harvest = () => {
  const formik = useFormik({
    initialValues: {
      title: proteoFarms.PROTEOEGLDLP.token,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const {
        hc,
        wsp,

        tokenIdentifier,
        aprEndpoint,
      } = proteoFarms[values.title]
        ? proteoFarms[values.title]
        : proteoPools[values.title];
      if (wsp) {
        const resApr = await axiosEldar2.get(aprEndpoint);
        if (resApr) {
          const aprs = resApr.data;
          const aprToSend = aprs.slice(Number("-" + (hc + 1))).map((item) => {
            return {
              ...item,
              apr: Number(
                new BigNumber(item.apr).multipliedBy(1000).toFixed(0)
              ),
            };
          });

          const epochValues = aprToSend.map((item) => {
            return new U64Value(new BigNumber(item.epoch));
          });
          const aprValues = aprToSend.map((item) => {
            return new U64Value(new BigNumber(item.apr));
          });

          const res = await scCall(
            proteoEliteWsp,
            "harvest",
            [
              BytesValue.fromUTF8(tokenIdentifier),
              new List(new ListType(new U64Type()), epochValues),
              new List(new ListType(new U64Type()), aprValues),
            ],
            50000000
          );
        }
      }
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
          2 - Harvest
        </ActionButton>
      </Center>
    </Box>
  );
};

export default Harvest;
