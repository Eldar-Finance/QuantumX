import { Flex, Input, Text } from "@chakra-ui/react";
import ActionButton from "components/ActionButton/ActionButton";

import { useFormik } from "formik";
import * as yup from "yup";
import { forceUpdateUsername } from "../services";

const validationSchema = yup.object({
  address: yup.string(),
  username: yup.string(),
});

const RegisterUsername = () => {
  // const { triggerTx } = useScTransaction();

  const formik = useFormik({
    initialValues: {
      address: "",
      username: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      forceUpdateUsername(values.username, values.address);
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
          Force Update Username
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
          isInvalid={formik.touched.username && Boolean(formik.errors.username)}
          placeholder="Username"
          name="username"
        />

        <ActionButton type="submit" px={8} py={5}>
          Force Update Username{" "}
        </ActionButton>
      </Flex>
    </form>
  );
};

export default RegisterUsername;
