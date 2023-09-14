import { Flex, Input } from "@chakra-ui/react";
import { Address, AddressValue, BytesValue } from "@multiversx/sdk-core/out";
import { scCall } from "api/sc/calls";
import ActionButton from "components/ActionButton/ActionButton";

import { useFormik } from "formik";
import { ChangeEvent } from "react";
import { validateAddress } from "utils/functions/validates";
import * as yup from "yup";

const validationSchema = yup.object({
  fields: yup.array().of(yup.string()),
});

export type SCFuncTypes = "addAvailableExtensions";

interface IProps {
  scFunc: SCFuncTypes;
  placeholder: string;
}

const DinamicForm = ({ scFunc, placeholder }: IProps) => {
  const formik = useFormik({
    initialValues: {
      fields: [""],
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const array = values.fields
        .filter((value) => value !== "")
        .map((value) => {
          return validateAddress(value)
            ? new AddressValue(new Address(value))
            : BytesValue.fromUTF8(value);
        });

      scCall("tagsWsp", scFunc, [...array]);
    },
  });

  const addField = () => {
    formik.setValues({ fields: [...formik.values.fields, ""] });
  };
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    if (index + 1 === formik.values.fields.length) {
      addField();
    }
    if (e.currentTarget.value === "") {
      formik.setValues({
        fields: [...formik.values.fields.filter((val, i) => i !== index)],
      });
    } else {
      formik.handleChange(e);
    }
  };
  return (
    <form onSubmit={formik.handleSubmit}>
      <Flex
        flexDirection={"column"}
        width="full"
        mb={8}
        // maxW={{ xs: "300px", tablet: "450px" }}
      >
        {formik.values.fields.map((field, i) => {
          return (
            <Input
              key={i}
              mb={4}
              w="full"
              onChange={(e) => handleOnChange(e, i)}
              placeholder={placeholder}
              name={`fields.${i}`}
            />
          );
        })}

        <ActionButton type="submit" px={8} py={5}>
          Send{" "}
        </ActionButton>
      </Flex>
    </form>
  );
};

export default DinamicForm;
