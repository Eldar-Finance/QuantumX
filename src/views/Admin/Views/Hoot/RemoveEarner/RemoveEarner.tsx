import { Flex, Input, Text } from "@chakra-ui/react";
import { Address, AddressValue, BytesValue } from "@multiversx/sdk-core/out";
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
      address: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const address = values.address;
      scCall("hootWsp", "removeEarner", [
        new AddressValue(new Address(address))
      ]);
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
          isInvalid={formik.touched.address && Boolean(formik.errors.address)}
          placeholder="Address"
          name="address"
        />

        <ActionButton type="submit" px={8} py={5}>
          Send{" "}
        </ActionButton>
      </Flex>
    </form>
  );
};

export default RemoveEarner;
