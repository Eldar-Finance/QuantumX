import { Box, Center, Select } from "@chakra-ui/react";
import { BytesValue } from "@elrondnetwork/erdjs/out";
import { scCall } from "api/sc/calls";
import ActionButton from "components/ActionButton/ActionButton";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectAllowedTokens } from "redux/slices/fastSwap/fastSwap";
import { fetchAllowedTokens } from "redux/slices/fastSwap/funcs";
import { useAppDispatch } from "utils/hooks/redux";
import * as yup from "yup";

const validationSchema = yup.object({
  token: yup.string().required(),
});

const RemoveToken = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAllowedTokens());
  }, [dispatch]);

  const { data: allowedTokens } = useSelector(selectAllowedTokens);
  const formik = useFormik({
    initialValues: {
      token: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const res = await scCall(
        "smartSwap",
        "removeWhitelistedTokens",
        [BytesValue.fromUTF8(values.token)],
        20000000
      );
    },
  });

  return (
    //@ts-ignore
    <Box as="form" w="full" onSubmit={formik.handleSubmit}>
      <Center flexDirection={"column"}>
        <Select
          onChange={formik.handleChange}
          variant="filled"
          bg="#0F1535"
          mb={4}
          _focus={{
            bg: "#0F1535",
          }}
          _hover={{
            bg: "#0F1535",
          }}
          cursor="pointer"
          name="token"
        >
          <Box as="option" value={""} bg="#252943 !important">
            Select token
          </Box>
          {allowedTokens.map((item) => {
            return (
              <Box key={item} as="option" value={item} bg="#252943 !important">
                {item}
              </Box>
            );
          })}
        </Select>
        <ActionButton type="submit" px={8} py={5}>
          Remove Token
        </ActionButton>
      </Center>
    </Box>
  );
};

export default RemoveToken;
