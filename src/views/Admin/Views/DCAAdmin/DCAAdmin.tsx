import { Box, Center, Input } from "@chakra-ui/react";
import { Address, AddressValue, BytesValue } from "@elrondnetwork/erdjs/out";
import { scCall } from "api/sc/calls";
import { dcaWsp } from "api/sc/sc";
import ActionButton from "components/ActionButton/ActionButton";
import { useFormik } from "formik";
import * as yup from "yup";
import FeesTable from "./components/FeesTable/FeesTable";

const validationSchema = yup.object({
  identifier: yup.string().required(),
  address: yup.string().required(),
});

const DCAAdmin = () => {
  const formik = useFormik({
    initialValues: {
      identifier: "",
      address: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      scCall(dcaWsp, "addToken", [
        BytesValue.fromUTF8(values.identifier),
        new AddressValue(new Address(values.address)),
      ]);
    },
  });

  return (
    <Center flexDirection={"column"} width="fit-content">
      <Box mb={10}>
        <form onSubmit={formik.handleSubmit}>
          <Input
            mb={4}
            onChange={formik.handleChange}
            name="identifier"
            placeholder="Token Identifier"
            isInvalid={
              formik.touched.identifier && Boolean(formik.errors.identifier)
            }
          />
          <Input
            mb={4}
            onChange={formik.handleChange}
            name="address"
            placeholder="Maiar Pair Address"
            isInvalid={formik.touched.address && Boolean(formik.errors.address)}
          />
          <Center>
            <ActionButton type="submit" px={8} py={5}>
              Send{" "}
            </ActionButton>
          </Center>
        </form>
      </Box>

      <FeesTable />
    </Center>
  );
};

export default DCAAdmin;
