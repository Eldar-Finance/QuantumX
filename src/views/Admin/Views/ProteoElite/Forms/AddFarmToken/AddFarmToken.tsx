import { Center, Input } from "@chakra-ui/react";
import { BytesValue } from "@multiversx/sdk-core/out";
import { scCall } from "api/sc/calls";
import { proteoEliteWsp } from "api/sc/sc";
import ActionButton from "components/ActionButton/ActionButton";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  tokenI: yup.string().required(),
});

const AddFarmToken = () => {
  const formik = useFormik({
    initialValues: {
      tokenI: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      scCall(
        proteoEliteWsp,
        "setAddFarmToken",
        [BytesValue.fromUTF8(values.tokenI)],
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

        <ActionButton type="submit" px={8} py={5}>
          Add Farm Token
        </ActionButton>
      </Center>
    </form>
  );
};

export default AddFarmToken;
