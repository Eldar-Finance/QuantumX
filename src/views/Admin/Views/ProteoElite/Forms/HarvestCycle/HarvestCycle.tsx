import { Center, Input } from "@chakra-ui/react";
import { BigUIntValue, BytesValue } from "@elrondnetwork/erdjs/out";
import { scCall } from "api/sc/calls";
import { proteoEliteWsp } from "api/sc/sc";
import BigNumber from "bignumber.js";
import ActionButton from "components/ActionButton/ActionButton";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  tokenI: yup.string().required(),
  duration: yup.number().required(),
});

const HarvestCycle = () => {
  const formik = useFormik({
    initialValues: {
      tokenI: "",
      duration: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      let timestamp = 0;
      if (values.duration !== "") {
        timestamp = Number(values.duration);
      }
      scCall(
        proteoEliteWsp,
        "setHarvestCycle",
        [
          BytesValue.fromUTF8(values.tokenI),
          new BigUIntValue(new BigNumber(timestamp)),
        ],
        50000000
      );
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Center flexDirection={"column"}>
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
          placeholder="Duration Days"
          name="duration"
          isInvalid={formik.touched.duration && Boolean(formik.errors.duration)}
        />
        <ActionButton type="submit" px={8} py={5}>
          Set Harvest Cycle
        </ActionButton>
      </Center>
    </form>
  );
};

export default HarvestCycle;
