import { Flex, Heading, Input } from "@chakra-ui/react";
import ActionButton from "components/ActionButton/ActionButton";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { formatBalance } from "utils/functions/formatBalance";
import { formatTokenI } from "utils/functions/tokens";
import useGetUserTokens from "utils/hooks/useGetUserTokens";
import { IScQxTagExtension } from "utils/types/sc.interface";
import useGetQTag, { useGetExtensionsList } from "views/Tags/hooks/useGetQTag";
import { useGetUserNameUpdateCost } from "views/Tags/hooks/useGetUserNameUpdateCost";
import { replaceExtension, updsteUserName } from "views/Tags/services/calls";
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

const ChangeTag = () => {
  const { usernameUpdateCost } = useGetUserNameUpdateCost();
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
      if (canUpdateUsername) {
        updsteUserName(values.tag, usernameUpdateCost);
      } else {
        replaceExtension(values.extention);
      }
    },
    validationSchema: validationSchema,
  });
  const [_, costToken] = useGetUserTokens(
    canUpdateUsername
      ? usernameUpdateCost?.token
      : formik.values.extention
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
  useEffect(() => {
    if (tagInfo.username !== "") {
      formik.setFieldValue("tag", tagInfo.username, false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tagInfo.username]);

  const handleUpdateUsername = () => {
    setCanUpdateUsername(true);
    setCanUpdateExtension(false);

    const userExtension = extensionsInfo.find(
      (ext) => ext.extension === tagInfo.extension
    );

    if (userExtension) {
      formik.setFieldValue("extention", userExtension, true);
    }
  };
  const handleUpdateExtension = () => {
    setCanUpdateUsername(false);
    setCanUpdateExtension(true);

    formik.setFieldValue("tag", tagInfo.username, true);
  };

  const isInvalid = formik.touched.tag && Boolean(formik.errors.tag);

  return (
    //@ts-ignore
    <TagCard as="form" onSubmit={formik.handleSubmit} maxW={"800px"}>
      <Heading fontSize={"md"} mb={3}>
        {" "}
        Your QuantumXTag : {tagInfo.tag}
      </Heading>

      <Flex mb={10} gap={4} flexDir={{ xs: "column", md: "row" }}>
        <ActionButton onClick={handleUpdateUsername}>
          Update Username
        </ActionButton>
        <ActionButton onClick={handleUpdateExtension}>
          Replace Extension
        </ActionButton>
      </Flex>
      <Flex
        w="full"
        bg="black.base"
        rounded={"md"}
        px="3"
        py="2"
        gap={4}
        mb={1}
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
      <Flex mb={14} fontSize={"sm"} color="tomato">
        {isInvalid && formik.errors.tag}
      </Flex>
      <CardButtons
        isInvalid={
          isInvalid ||
          formatBalance(costToken, true) <
            formatBalance(
              {
                balance: canUpdateUsername
                  ? usernameUpdateCost?.amount
                  : formik.values.extention.amount,
                decimals: costToken?.decimals,
              },
              true
            )
        }
        cost={
          canUpdateUsername
            ? usernameUpdateCost
              ? `${formatBalance({
                  balance: usernameUpdateCost.amount,
                  decimals: costToken?.decimals,
                })} ${formatTokenI(usernameUpdateCost.token)}`
              : ""
            : formik.values.extention
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

export default ChangeTag;
