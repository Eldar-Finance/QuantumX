import { Input, InputProps } from "@chakra-ui/react";
import React, { forwardRef, useImperativeHandle, useState } from "react";

interface IProps extends InputProps {
  onChangeInput: (value: string) => void;
  tranformValue: (value: string) => any;
}

// eslint-disable-next-line react/display-name
const InputText = forwardRef(
  ({ onChangeInput, tranformValue, ...props }: IProps, ref) => {
    const [renderVal, setRenderVal] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setRenderVal(e.target.value);
      onChangeInput(tranformValue(e.target.value));
    };
    const setValue = (val: string) => {
      setRenderVal(val);
    };

    useImperativeHandle(ref, () => ({
      setValue: setValue,
    }));

    return <Input {...props} value={renderVal} onChange={handleChange} />;
  }
);

export default InputText;
