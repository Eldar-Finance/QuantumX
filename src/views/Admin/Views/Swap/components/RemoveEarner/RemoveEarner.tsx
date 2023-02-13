import { Flex, Input, Text } from "@chakra-ui/react";
import { BytesValue } from "@elrondnetwork/erdjs/out";
import { scCall } from "api/sc/calls";
import ActionButton from "components/ActionButton/ActionButton";

import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  name: yup.string(),
});

const RemoveEarner = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const name = values.name;
      scCall("smartSwap", "removeEarner", [BytesValue.fromUTF8(name)]);
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
          Remove Earner
        </Text>

        <Input
          mb={4}
          w="full"
          onChange={formik.handleChange}
          isInvalid={formik.touched.name && Boolean(formik.errors.name)}
          placeholder="Label Name"
          name="name"
        />

        <ActionButton type="submit" px={8} py={5}>
          Send{" "}
        </ActionButton>
      </Flex>
    </form>
  );
};

export default RemoveEarner;
