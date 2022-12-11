import { Center, Input, Text } from "@chakra-ui/react";
import { BytesValue } from "@elrondnetwork/erdjs/out";
import { scCall } from "api/sc/calls";
import { fastp2pSwapWsp } from "api/sc/sc";
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

      scCall(
        fastp2pSwapWsp,
        "removeEarner",
        [BytesValue.fromUTF8(name)],
        60000000
      );
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Center flexDirection={"column"} width="full" mb={8}>
        <Text as="h2" fontSize={"1.8rem"} mb={5}>
          Remove Earner
        </Text>

        <Input
          mb={4}
          width={{ xs: "300px", tablet: "450px" }}
          onChange={formik.handleChange}
          isInvalid={formik.touched.name && Boolean(formik.errors.name)}
          placeholder="Label Name"
          name="name"
        />

        <ActionButton type="submit" px={8} py={5}>
          Send{" "}
        </ActionButton>
      </Center>
    </form>
  );
};

export default RemoveEarner;
