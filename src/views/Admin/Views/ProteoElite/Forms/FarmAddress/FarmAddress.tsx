import { Center, Input } from "@chakra-ui/react";
import { Address, AddressValue, BytesValue } from "@multiversx/sdk-core/out";
import { scCall } from "api/sc/calls";
import { proteoEliteWsp } from "api/sc/sc";
import ActionButton from "components/ActionButton/ActionButton";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  tokenI: yup.string().required(),
  address: yup.string().required(),
});

const FarmAddress = () => {
  const formik = useFormik({
    initialValues: {
      tokenI: "",
      address: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      scCall(
        proteoEliteWsp,
        "setFarmScAddress",
        [
          BytesValue.fromUTF8(values.tokenI),
          new AddressValue(new Address(values.address)),
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
          placeholder="Token Identifier"
          name="tokenI"
          isInvalid={formik.touched.tokenI && Boolean(formik.errors.tokenI)}
        />
        <Input
          mb={2}
          width={{ xs: "300px", tablet: "450px" }}
          onChange={formik.handleChange}
          placeholder="Farm Address"
          name="address"
          isInvalid={formik.touched.address && Boolean(formik.errors.address)}
        />
        <ActionButton type="submit" px={8} py={5}>
          Set Farm Address
        </ActionButton>
      </Center>
    </form>
  );
};

export default FarmAddress;
