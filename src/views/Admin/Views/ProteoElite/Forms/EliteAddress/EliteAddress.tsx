import { Center, Input } from "@chakra-ui/react";
import { Address, AddressValue } from "@elrondnetwork/erdjs/out";
import { scCall } from "api/sc/calls";
import { proteoEliteWsp } from "api/sc/sc";
import ActionButton from "components/ActionButton/ActionButton";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  address: yup.string().required(),
});

const EliteAddress = () => {
  const formik = useFormik({
    initialValues: {
      address: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      scCall(
        proteoEliteWsp,
        "setEliteScAddress",
        [new AddressValue(new Address(values.address))],
        50000000
      );
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Center flexDirection={"column"}>
        <Input
          mb={4}
          width={{ xs: "300px", tablet: "450px" }}
          onChange={formik.handleChange}
          placeholder="Elite Address"
          name="address"
          isInvalid={formik.touched.address && Boolean(formik.errors.address)}
        />
        <ActionButton type="submit" px={8} py={5}>
          Set Elite Address
        </ActionButton>
      </Center>
    </form>
  );
};

export default EliteAddress;
