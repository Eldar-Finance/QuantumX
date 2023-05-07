import { Flex, Heading, Input } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useEffect } from "react";
import { formatBalance } from "utils/functions/formatBalance";
import { formatTokenI } from "utils/functions/tokens";
import useGetAccountToken from "utils/hooks/useGetAccountToken";
import { IScQxTagExtension } from "utils/types/sc.interface";
import { useGetExtensionsList, useGetQxAllTags } from "views/Tags/hooks/useGetQTag";
import { registerTag } from "views/Tags/services/calls";
import * as Yup from "yup";
import CardButtons from "../CardButtons/CardButtons";
import ExtensionSelect from "../ExtensionSelect/ExtensionSelect";
import TagCard from "../TagCard/TagCard";
const validationSchema = Yup.object({
  //validate only numbers and letters
  tag: Yup.string()
    .matches(/^[a-zA-Z0-9]+$/, "Only alphanumerical chars are allowed")
    .required("Required"),
  extention: Yup.object().required("Required"),
});
const ClaimTag = () => {

  const { extensionsInfo, isLoading } = useGetExtensionsList();
  const { dataTagsInfo, error } = useGetQxAllTags();

  const isTagAlreadyExist = async (username: string, extension: string): Promise<boolean> => {
    return dataTagsInfo.some(t => t.username === username && t.extension === extension);
  };

  const formik = useFormik({
    initialValues: {
      tag: "",
      extention: null,
    },

    onSubmit: async (values) => {
      const isTagExist = await isTagAlreadyExist(values.tag, values.extention.extension);
      if (isTagExist) {
        formik.setFieldError("tag", "Tag already exists");
      } else {
        registerTag(values.tag, values.extention);
      }
    },
    validationSchema: validationSchema,
  });

  const { accountToken: costToken } = useGetAccountToken(
    formik.values.extention
      ? (formik.values.extention as IScQxTagExtension)?.token
      : null
  );
  const handleSelectExtension = (val: IScQxTagExtension) => {
    formik.setFieldValue("extention", val, false);
  };

  useEffect(() => {
    if (extensionsInfo.length > 0) {
      formik.setFieldValue("extention", extensionsInfo[0], false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [extensionsInfo]);

  const isInvalid = formik.touched.tag && Boolean(formik.errors.tag);

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
        mb={1}
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
          onSelect={(selectedExtension) => {
            formik.setFieldValue("extention", selectedExtension);
            formik.setFieldError("tag", null); // clear the tag error
          }}
          selectedExtention={formik.values.extention}
        />
      </Flex>
      <Flex mb={14} fontSize={"sm"} color="tomato">
        {isInvalid && formik.errors.tag}
      </Flex>
      <CardButtons
        isInvalid={
          isInvalid ||
          formatBalance(costToken, true) <
          formatBalance(
            {
              balance: formik.values.extention?.amount,
              decimals: costToken?.decimals,
            },
            true
          )
        }
        cost={
          formik.values.extention
            ? `${formatBalance({
              balance: (formik.values.extention as IScQxTagExtension).amount,
              decimals: costToken?.decimals,
            })} ${formatTokenI(formik.values.extention.token)}`
            : ""
        }
      />
    </TagCard>
  );
};

export default ClaimTag;
