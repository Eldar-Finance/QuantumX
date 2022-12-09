import { Center, Input, Text } from "@chakra-ui/react";
import {
  Address,
  AddressValue,
  BigUIntValue,
  BytesValue,
} from "@elrondnetwork/erdjs/out";
import { scCall } from "api/sc/calls";
import { fastp2pSwapWsp } from "api/sc/sc";
import BigNumber from "bignumber.js";
import ActionButton from "components/ActionButton/ActionButton";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  name: yup.string(),
  address: yup.string(),
  percent: yup.number(),
});

const AddEarner = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      percent: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const name = values.name;
      const address = values.address;
      const percent = Number(values.percent) * 100;

      scCall(
        fastp2pSwapWsp,
        "addEarner",
        [
          BytesValue.fromUTF8(name),
          new AddressValue(new Address(address)),
          new BigUIntValue(new BigNumber(percent)),
        ],
        60000000
      );
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Center flexDirection={"column"} width="full" mb={8}>
        <Text as="h2" fontSize={"1.8rem"} mb={5}>
          Add Earner
        </Text>

        <Input
          mb={4}
          width={{ xs: "300px", tablet: "450px" }}
          onChange={formik.handleChange}
          isInvalid={formik.touched.name && Boolean(formik.errors.name)}
          placeholder="Label Name"
          name="name"
        />
        <Input
          mb={4}
          width={{ xs: "300px", tablet: "450px" }}
          onChange={formik.handleChange}
          isInvalid={formik.touched.address && Boolean(formik.errors.address)}
          placeholder="Address"
          name="address"
        />
        <Input
          mb={4}
          width={{ xs: "300px", tablet: "450px" }}
          onChange={formik.handleChange}
          isInvalid={formik.touched.percent && Boolean(formik.errors.percent)}
          placeholder="Percent"
          name="percent"
        />

        <ActionButton type="submit" px={8} py={5}>
          Send{" "}
        </ActionButton>
      </Center>
    </form>
  );
};

export default AddEarner;
