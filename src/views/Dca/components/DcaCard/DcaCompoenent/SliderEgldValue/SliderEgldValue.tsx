import {
  Box,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";
import { SliderIcon } from "components/Icons/ui";
import { formatBalance } from "utils/functions/formatBalance";
const labelStyles = {
  mt: "2",
  ml: "-2.5",
  fontSize: "sm",
};
const SliderEgldValue = ({ value, setValue, balance }) => {
  const realBalance = formatBalance({ balance: balance, decimals: 18 }, true);
  if (!realBalance) {
    return null;
  }
  return (
    <>
      {balance !== 0 && (
        <Box pb={2} px={3} mb={10}>
          <Slider
            defaultValue={value}
            aria-label="slider-egld-amount"
            onChange={(val) => setValue(val)}
            min={0}
            step={0.0001}
            max={realBalance}
          >
            <SliderMark value={0} {...labelStyles}>
              0%
            </SliderMark>
            <SliderMark value={0.25 * realBalance} {...labelStyles}>
              25%
            </SliderMark>
            <SliderMark value={0.5 * realBalance} {...labelStyles}>
              50%
            </SliderMark>
            <SliderMark value={0.75 * realBalance} {...labelStyles}>
              75%
            </SliderMark>
            <SliderMark value={1 * realBalance} {...labelStyles}>
              100%
            </SliderMark>

            <SliderTrack h="10px" borderRadius={"full"} bg="black.baseDark">
              <SliderFilledTrack bg="black.base" />
            </SliderTrack>
            <SliderThumb boxSize={6} bg="transparent">
              <Box
                color="tomato"
                as={SliderIcon}
                fontSize={{ xs: "25px", md: "35px" }}
              />
            </SliderThumb>
          </Slider>
        </Box>
      )}
    </>
  );
};

export default SliderEgldValue;
