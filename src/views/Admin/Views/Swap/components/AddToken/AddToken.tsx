import { Flex, Input } from "@chakra-ui/react";
import { BytesValue } from "@elrondnetwork/erdjs/out";
import { scCall } from "api/sc/calls";
import ActionButton from "components/ActionButton/ActionButton";
import { useFormik } from "formik";
import { isValidIdentifier } from "utils/functions/validates";
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
      // split tokenI values separated by come  into an array
      const tokens = values.tokenI.split(",");

      const scTokensToSend = tokens.filter((tokenI) =>
        isValidIdentifier(tokenI)
      );

      const parteTokensToBytesValues = scTokensToSend.map((tokenI) => {
        return BytesValue.fromUTF8(tokenI);
      });
      if (parteTokensToBytesValues.length > 0) {
        scCall(
          "smartSwap",
          "addWhitelistedTokens",
          parteTokensToBytesValues,
          20000000
        );
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Flex flexDirection={"column"} maxW="300px" mb={10}>
        <Input
          mb={2}
          onChange={formik.handleChange}
          placeholder="Token Identifier"
          name="tokenI"
          isInvalid={formik.touched.tokenI && Boolean(formik.errors.tokenI)}
        />

        <ActionButton type="submit" px={8} py={5}>
          Add Token
        </ActionButton>
      </Flex>
    </form>
  );
};

export default AddToken;
