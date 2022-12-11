import { Center, Input } from "@chakra-ui/react";
import { BytesValue } from "@elrondnetwork/erdjs/out";
import { scCall } from "api/sc/calls";
import { fastp2pSwapWsp } from "api/sc/sc";
import ActionButton from "components/ActionButton/ActionButton";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  tokenI: yup.string().required(),
});

const AddToken = () => {
  const formik = useFormik({
    initialValues: {
      tokenI: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      scCall(
        fastp2pSwapWsp,
        "addToken",
        [BytesValue.fromUTF8(values.tokenI)],
        20000000
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
          Add Token
        </ActionButton>
      </Center>
    </form>
  );
};

export default AddToken;
