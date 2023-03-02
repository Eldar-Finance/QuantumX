import { Center, Input } from "@chakra-ui/react";
import { BytesValue } from "@multiversx/sdk-core/out";
import { scCall } from "api/sc/calls";
import { proteoEliteWsp } from "api/sc/sc";
import ActionButton from "components/ActionButton/ActionButton";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  lpTokenI: yup.string().required(),
  rewardstokenI: yup.string().required(),
});

const SetRewardTokenforDualFarm = () => {
  const formik = useFormik({
    initialValues: {
      lpTokenI: "",
      rewardstokenI: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      scCall(
        proteoEliteWsp,
        "setDualfarmRewardToken",
        [
          BytesValue.fromUTF8(values.lpTokenI),
          BytesValue.fromUTF8(values.rewardstokenI),
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
          placeholder="Lp token identifier"
          name="lpTokenI"
          isInvalid={formik.touched.lpTokenI && Boolean(formik.errors.lpTokenI)}
        />
        <Input
          mb={2}
          width={{ xs: "300px", tablet: "450px" }}
          onChange={formik.handleChange}
          placeholder="Rewards token identifier"
          name="rewardstokenI"
          isInvalid={
            formik.touched.rewardstokenI && Boolean(formik.errors.rewardstokenI)
          }
        />

        <ActionButton type="submit" px={8} py={5}>
          Set reward token for Dual Farm
        </ActionButton>
      </Center>
    </form>
  );
};

export default SetRewardTokenforDualFarm;
