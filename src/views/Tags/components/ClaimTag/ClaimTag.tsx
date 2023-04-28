import { Flex, Heading, Input } from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CardButtons from "../CardButtons/CardButtons";
import ExtensionSelect from "../ExtensionSelect/ExtensionSelect";
import TagCard from "../TagCard/TagCard";
const validationSchema = Yup.object({
  tag: Yup.string().required("Required"),
  extention: Yup.string().required("Required"),
});

const ClaimTag = () => {
  const formik = useFormik({
    initialValues: {
      tag: "",
      extention: "quantumx",
    },

    onSubmit: (values) => {
      console.log("values", values);
    },
    validationSchema: validationSchema,
  });

  const handleSelectExtension = (val: string) => {
    formik.setFieldValue("extention", val, false);
  };

  return (
    //@ts-ignore
    <TagCard textAlign={"center"} as="form" onSubmit={formik.handleSubmit}>
      <Heading fontSize={"md"} mb={10}>
        {" "}
        Your QuantumXTag should contain alphanumeric characters (a-z an 0-9
        only)
      </Heading>

      <Flex
        w="full"
        bg="black.base"
        rounded={"md"}
        px="3"
        py="2"
        mb={14}
        gap={4}
        position={"relative"}
      >
        <Input
          variant={"unstyled"}
          flex={1}
          name="tag"
          onChange={formik.handleChange}
        />
        <ExtensionSelect
          onSelect={handleSelectExtension}
          selectedExtention={formik.values.extention}
        />
      </Flex>
      <CardButtons />
    </TagCard>
  );
};

export default ClaimTag;
