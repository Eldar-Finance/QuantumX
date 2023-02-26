import { Center, Input, Stack } from "@chakra-ui/react";
import { BigUIntValue, BytesValue } from "@elrondnetwork/erdjs/out";
import { scCall } from "api/sc/calls";
import { proteoEliteWsp } from "api/sc/sc";
import BigNumber from "bignumber.js";
import ActionButton from "components/ActionButton/ActionButton";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  tokenI: yup.string().required(),
  reward: yup.string().required(),
  sproteo: yup.string().required(),
});

const PrepareUserClaming = () => {
  const formik = useFormik({
    initialValues: {
      tokenI: "",
      reward: "",
      sproteo: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      scCall(
        proteoEliteWsp,
        "prepareClaiming",
        [
          BytesValue.fromUTF8(values.tokenI),
          new BigUIntValue(new BigNumber(values.sproteo)),
          new BigUIntValue(new BigNumber(values.reward)),
        ],

        50000000
      );
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Center flexDirection={"column"}>
        <Stack mb={4}>
          <Input
            mb={2}
            width={{ xs: "300px", tablet: "450px" }}
            onChange={formik.handleChange}
            placeholder="Token Identifier"
            name="tokenI"
            isInvalid={formik.touched.tokenI && Boolean(formik.errors.tokenI)}
          />
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
          3 - Prepare Users Claiming
        </ActionButton>
      </Center>
    </form>
  );
};

export default PrepareUserClaming;
