import { Flex, Input, Text } from "@chakra-ui/react";
import ActionButton from "components/ActionButton/ActionButton";

import { useFormik } from "formik";
import * as yup from "yup";
import { forceReplaceExtension } from "../services";

const validationSchema = yup.object({
  address: yup.string(),
  extension: yup.string(),
});

const RegisterExtension = () => {
  // const { triggerTx } = useScTransaction();

  const formik = useFormik({
    initialValues: {
      address: "",
      extension: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      forceReplaceExtension(values.extension, values.address);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Flex
        flexDirection={"column"}
        width="full"
        mb={8}
        maxW={{ xs: "300px", tablet: "450px" }}
      >
        <Text as="h2" fontSize={"1.8rem"} mb={5}>
          Force Replace Extension
        </Text>
        <Input
          mb={4}
          w="full"
          onChange={formik.handleChange}
          isInvalid={formik.touched.address && Boolean(formik.errors.address)}
          placeholder="Address"
          name="address"
        />

        <Input
          mb={4}
          w="full"
          onChange={formik.handleChange}
          isInvalid={
            formik.touched.extension && Boolean(formik.errors.extension)
          }
          placeholder="Extension"
          name="extension"
        />

        <ActionButton type="submit" px={8} py={5}>
          Force Register Extension{" "}
        </ActionButton>
      </Flex>
    </form>
  );
};

export default RegisterExtension;
