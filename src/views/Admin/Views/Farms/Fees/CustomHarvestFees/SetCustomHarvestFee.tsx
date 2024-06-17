import { Flex, HStack, Input, Text } from "@chakra-ui/react";
import { U64Value } from "@multiversx/sdk-core/out";
import { scCall } from "api/sc/calls";
import BigNumber from "bignumber.js";
import ActionButton from "components/ActionButton/ActionButton";

import { useFormik } from "formik";
import { setElrondBalance } from "utils/functions/formatBalance";
import * as yup from "yup";

const validationSchema = yup.object({
  farmId: yup.number(),
  fee: yup.number(),
});

interface IProps {
  placeholder?: string;
  title: string;
  feeLabel: string;
}

const SetCustomHarvestFee = ({ placeholder, title }: IProps) => {
  const formik = useFormik({
    initialValues: {
      farmId: "",
      fee: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const farmId = Number(values.farmId);
      const fee = Number(values.fee);
      
      if (fee > 0) {
        scCall("farms2", "setCustomHarvestFee", [
          new U64Value(new BigNumber(farmId)),
          new U64Value(new BigNumber(fee * 100)),
        ]);
      } else {
        scCall("farms2", "clearCustomHarvestFee", [
          new U64Value(new BigNumber(farmId)),
        ]);
      }
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
        <Text as="h2" fontSize={"1.8rem"}>
          {title}
        </Text>
        <Text mb={5}>
          (leave fee input EMPTY to clear custom fee and use the Default Harvest Fee)
        </Text>
        <HStack>
          <Input
            mb={4}
            w="full"
            onChange={formik.handleChange}
            isInvalid={formik.touched.farmId && Boolean(formik.errors.farmId)}
            placeholder={placeholder || "Farm"}
            name="farmId"
          />
    
          <Input
            mb={4}
            w="full"
            onChange={formik.handleChange}
            isInvalid={formik.touched.fee && Boolean(formik.errors.fee)}
            placeholder={placeholder || "Fee"}
            name="fee"
          />
        </HStack>

        <ActionButton type="submit" px={8} py={5}>
          Set
        </ActionButton>
      </Flex>
    </form>
  );
};

export default SetCustomHarvestFee;
