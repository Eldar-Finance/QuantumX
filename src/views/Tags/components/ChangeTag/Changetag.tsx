import { Box, Flex, Heading, Input } from "@chakra-ui/react";
import ActionButton from "components/ActionButton/ActionButton";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { IScQxTagExtension } from "utils/types/sc.interface";
import useGetQTag, { useGetExtensionsList } from "views/Tags/hooks/useGetQTag";
import { registerTag } from "views/Tags/services/calls";
import * as Yup from "yup";
import CardButtons from "../CardButtons/CardButtons";
import ExtensionSelect from "../ExtensionSelect/ExtensionSelect";
import TagCard from "../TagCard/TagCard";
const validationSchema = Yup.object({
  tag: Yup.string().required("Required"),
  extention: Yup.object().required("Required"),
});

const ChangeTag = () => {
  const { extensionsInfo } = useGetExtensionsList();
  const [canUpdateUsername, setCanUpdateUsername] = useState(true);
  const [canUpdateExtension, setCanUpdateExtension] = useState(false);
  const { tagInfo } = useGetQTag();
  const formik = useFormik({
    initialValues: {
      tag: "",
      extention: null,
    },

    onSubmit: (values) => {
      registerTag(values.tag, values.extention);
    },
    validationSchema: validationSchema,
  });

  const handleSelectExtension = (val: IScQxTagExtension) => {
    formik.setFieldValue("extention", val, false);
  };

  useEffect(() => {
    if (extensionsInfo.length > 0) {
      formik.setFieldValue("extention", extensionsInfo[0], false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [extensionsInfo]);
  useEffect(() => {
    if (tagInfo.username !== "") {
      formik.setFieldValue("tag", tagInfo.username, false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tagInfo.username]);

  const handleUpdateUsername = () => {
    setCanUpdateUsername(true);
    setCanUpdateExtension(false);
  };
  const handleUpdateExtension = () => {
    setCanUpdateUsername(false);
    setCanUpdateExtension(true);
  };
  return (
    //@ts-ignore
    <TagCard as="form" onSubmit={formik.handleSubmit} maxW={"800px"}>
      <Heading fontSize={"md"} mb={3}>
        {" "}
        Your QuantumXTag : {tagInfo.tag}
      </Heading>
      <Box mb={1}>Update :</Box>
      <Flex mb={10} gap={4}>
        <ActionButton onClick={handleUpdateUsername}>Username</ActionButton>
        <ActionButton onClick={handleUpdateExtension}>Extension</ActionButton>
      </Flex>
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
          value={formik.values.tag}
          disabled={!canUpdateUsername}
        />
        <ExtensionSelect
          onSelect={handleSelectExtension}
          selectedExtention={formik.values.extention}
          disabled={!canUpdateExtension}
        />
      </Flex>
      <CardButtons />
    </TagCard>
  );
};

export default ChangeTag;
