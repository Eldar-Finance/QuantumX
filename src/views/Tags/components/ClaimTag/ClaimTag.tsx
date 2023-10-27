import { Flex, Heading, Input } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { formatBalance } from "utils/functions/formatBalance";
import { formatTokenI } from "utils/functions/tokens";
import useGetAccountToken from "utils/hooks/useGetAccountToken";
import { IScQxTagExtension } from "utils/types/sc.interface";
import { useGetExtensionsList } from "views/Tags/hooks/useGetQTag";
import { registerTag } from "views/Tags/services/calls";
import * as Yup from "yup";
import CardButtons from "../CardButtons/CardButtons";
import ExtensionSelect from "../ExtensionSelect/ExtensionSelect";
import TagCard from "../TagCard/TagCard";
import { network } from "api/net.config";
import axios from "axios";
import { useAppSelector } from "utils/hooks/redux";
import { selectUserAddress } from "redux/slices/userAcount/account-slice";
import { getIsTagAvailable } from "views/Tags/services/queries";

const validationSchema = Yup.object({
  //validate only numbers and letters
  tag: Yup.string()
    .matches(/^[a-zA-Z0-9]+$/, "Only alphanumerical chars are allowed")
    .required("Required"),
  extention: Yup.object().required("Required"),
});
const ClaimTag = () => {

  const { extensionsInfo, isLoading } = useGetExtensionsList();

  const [data, setData] = useState(null);
  const userAddress = useAppSelector(selectUserAddress);

  const isTagAvailable = async (username: string, extension: string): Promise<Boolean> => {
    return getIsTagAvailable(username, extension);
  };


  const fetchData = async (url: string) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      throw new Error('Failed to fetch data from the API');
    }
  };

  const formik = useFormik({
    initialValues: {
      tag: "",
      extention: null,
    },

    onSubmit: async (values) => {
      const isAvailabletag = await isTagAvailable(values.tag, values.extention.extension);
      if (isAvailabletag) {
        registerTag(values.tag, values.extention);
      } else {
        formik.setFieldError("tag", "Tag already exists");
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

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const apiURL = `${network.apiAddress}/accounts/${userAddress}/collections?size=350`;
  
        const responseData = await fetchData(apiURL);
        const collectionsToCheck = ["QXFLM-06e81a", "QXHR-9b0bc6"];
        
        if (responseData) {
          const exists = collectionsToCheck.reduce((acc, collection) => {
            const exists = responseData.some(item => item.collection === collection);
            acc[collection] = exists;
            return acc;
          }, {});
          setData(exists);
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    };
    fetchDataFromApi();
  }, []);

  const isInvalid = formik.touched.tag && Boolean(formik.errors.tag);

  return (
    //@ts-ignore
    <TagCard textAlign={"center"} as="form" onSubmit={formik.handleSubmit}>
      <Heading fontSize={"md"} mb={10}>
        {" "}
        Your QuantumXTag should contain only alphanumeric characters (Aa-Zz and 0-9).
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
            formik.setFieldError("tag", null); //  clear the tag error
          }}
          selectedExtention={formik.values.extention}
          specificCollection={data}
          itemClicked={true}
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
