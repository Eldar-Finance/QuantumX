import { Center, FormControl, FormLabel, Text } from "@chakra-ui/react";
import BigNumber from "bignumber.js";
import ChkSlider from "components/Slider/Slider";
import {
  formatBalance,
  formatBalanceDolar,
} from "utils/functions/formatBalance";
const FeeSlider = ({ formik, egldGas, egldPrice, defaultFee }) => {
  const handleChangeFee = (fee: number) => {
    const realFee = new BigNumber(fee).multipliedBy(1000).toString();
    formik.setFieldValue("fee", realFee, false);
  };
  return (
  <>
      <FormControl isInvalid={formik.errors.fee && formik.touched.fee}>
        <FormLabel>Fee</FormLabel>
        <Center
          justifyContent={"flex-start"}
          bg="black.base"
          h="52px"
          rounded={"md"}
          px="4"
        >
          <Text>
            ≈{" "}
            {formatBalance({
              balance: egldGas,
              decimals: 15,
            })}{" "}
            EGLD (≈ $
            {formatBalanceDolar(
              {
                balance: egldGas,
                decimals: 15,
              },
              egldPrice,
              true
            )}
            )
          </Text>
        </Center>
        <ChkSlider
          defaultValue={defaultFee}
          onChange={handleChangeFee}
          maxValue={400}
          minValue={50}
          sliderMarks={[
            {
              label: "30%",
              value: 150,
            },
            {
              label: "50%",
              value: 250,
            },
            {
              label: "70%",
              value: 350,
            },
          ]}
          step={1}
        />
      </FormControl>
    </>
  );
};

export default FeeSlider;
