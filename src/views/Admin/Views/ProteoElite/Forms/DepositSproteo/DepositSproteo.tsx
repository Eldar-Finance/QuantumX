import { Center, Input } from "@chakra-ui/react";
import { contractAddr, toknesID } from "api/net.config";
import { ESDTTransfer } from "api/sc/calls";
import ActionButton from "components/ActionButton/ActionButton";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  amount: yup.number().required(),
});

const DepositSproteo = () => {
  const formik = useFormik({
    initialValues: {
      amount: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      ESDTTransfer({
        funcName: "depositSproteoToElite",
        token: { identifier: toknesID.sProteo },
        val: Number(values.amount),
        contractAddr: contractAddr.proteoElite,
        gasL: 50000000,
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Center flexDirection={"column"}>
        <Input
          mb={4}
          width={{ xs: "300px", tablet: "450px" }}
          onChange={formik.handleChange}
          placeholder="amount"
          name="amount"
          type="number"
          isInvalid={formik.touched.amount && Boolean(formik.errors.amount)}
        />
        <ActionButton type="submit" px={8} py={5}>
          Send sProteo to Elite
        </ActionButton>
      </Center>
    </form>
  );
};

export default DepositSproteo;
