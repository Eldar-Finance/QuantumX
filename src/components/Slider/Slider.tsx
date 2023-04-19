import {
  Box,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";
import { useState } from "react";

interface IProps {
  defaultValue: number;
  onChange: (val: number) => void;
  minValue?: number;
  maxValue?: number;
  step?: number;
  sliderMarks?: {
    value: number;
    label: string;
  }[];
}

export default function ChkSlider({
  defaultValue,
  onChange,
  maxValue = 100,
  minValue = 0,
  step = 1,
  sliderMarks = [
    {
      label: "25%",
      value: 25,
    },
    {
      label: "50%",
      value: 50,
    },
    {
      label: "75%",
      value: 75,
    },
  ],
}: IProps) {
  const [sliderValue, setSliderValue] = useState(defaultValue);

  const labelStyles = {
    mt: "2",
    ml: "-2.5",
    fontSize: "sm",
  };

  const handleChange = (val: number) => {
    onChange(val);
    setSliderValue(val);
  };

  return (
    <Box pt={6} pb={2}>
      <Slider
        aria-label="slider"
        onChange={handleChange}
        min={minValue}
        max={maxValue}
        step={step}
        defaultValue={defaultValue}
      >
        {sliderMarks?.map((sm) => (
          <SliderMark key={sm.label} value={sm.value} {...labelStyles}>
            {sm.label}
          </SliderMark>
        ))}

        <SliderMark
          value={sliderValue}
          textAlign="center"
          bg="blue.500"
          color="white"
          mt="-10"
          ml="-5"
          w="12"
          rounded={"sm"}
        >
          {sliderValue}M
        </SliderMark>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </Box>
  );
}
