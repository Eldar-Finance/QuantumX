import {
  FormControl,
  FormLabel,
  Heading,
  Input,
  ModalBody,
  ModalHeader,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import BigNumber from "bignumber.js";
import ActionButton from "components/ActionButton/ActionButton";
import MyModal from "components/Modal/Modal";
import { FormikProvider, useFormik } from "formik";
import { useEffect, useMemo, useState } from "react";
import { formatBalanceDolar } from "utils/functions/formatBalance";
import { formatTokenI } from "utils/functions/tokens";
import useGetMultiplePrices from "utils/hooks/useGetMultiplePrices";
import useGetTokenPrice from "utils/hooks/useGetTokenPrice";
import useGetUserTokens from "utils/hooks/useGetUserTokens";
import { sendUserTokens } from "views/Dashboard/services";
import AmountField from "./AmountField";
import FeeSlider from "./FeeSlider";

const defaultFee = 7;

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}
export interface IFormData {
  address: string;
  amount: string;
  fee: string;
  data: string;
}
const initialValues: IFormData = {
  address: "",
  amount: "",
  fee: new BigNumber(defaultFee).multipliedBy(1000000).toString(),
  data: "",
};
const TransactionModal = ({ isOpen, onClose }: IProps) => {
  const [userTokens] = useGetUserTokens();
  // const [tokens, setTokens] = useState([]);
  const [selectedToken, setSelectedToken] = useState<any>();
  const [egldPrice] = useGetTokenPrice("EGLD");
  const [missingPrices] = useGetMultiplePrices(
    userTokens.filter((t) => !Boolean(t.price)).map((t) => t.identifier)
  );
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      sendUserTokens(
        values.address,
        {
          ...selectedToken,
          amount: values.amount,
        },
        values.fee,
        values.data
      );
    },
  });

  const tokens = useMemo(() => {
    const newTokens = userTokens.map((token) => {
      const missingPrice = missingPrices.find(
        (p) => p.tokenI === token.identifier
      );
      const missinEgldPrice = token.identifier === "EGLD" ? egldPrice : null;
      const price = missinEgldPrice || missingPrice?.price || token.price;

      return {
        ...token,
        price: price,
      };
    });

    const tokensOrdered = newTokens.sort(
      (a, b) =>
        formatBalanceDolar(b, b.price, false) -
        formatBalanceDolar(a, a.price, false)
    );
    return tokensOrdered;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userTokens, egldPrice]);

  useEffect(() => {
    const initialToken =
      tokens.length > 0 ? tokens.find((t) => t.identifier === "EGLD") : null;
    setSelectedToken(initialToken);
  }, [tokens]);

  const egldGas = new BigNumber(10495000)
    .multipliedBy(formik.values.fee)
    .toString();

  return (
    <MyModal
      isOpen={isOpen}
      onClose={onClose}
      size={"3xl"}
      background="black.baseDark"
    >
      <ModalHeader>
        <Heading>Send</Heading>
      </ModalHeader>
      <FormikProvider value={formik}>
        <ModalBody pb="10">
          {/* @ts-ignore */}
          <VStack gap={"15px"} as="form" onSubmit={formik.handleSubmit}>
            {/* To address */}
            <FormControl
              isInvalid={formik.errors.address && formik.touched.address}
            >
              <FormLabel>To</FormLabel>
              <Input
                onChange={formik.handleChange}
                placeholder="address"
                name="address"
                border={"none"}
                bg="black.base"
                h="52px"
              />
            </FormControl>

            {/* Amount */}
            <AmountField
              selectedToken={selectedToken}
              setSelectedToken={setSelectedToken}
              tokens={tokens}
              formik={formik}
            />
            {/* Fee */}
            <FeeSlider
              egldGas={egldGas}
              egldPrice={egldPrice}
              formik={formik}
              defaultFee={defaultFee}
            />

            {/* Data */}
            <FormControl isInvalid={formik.errors.data && formik.touched.data}>
              <FormLabel>Data</FormLabel>
              <Textarea
                onChange={formik.handleChange}
                placeholder="Data"
                name="data"
                border={"none"}
                bg="black.base"
                h="52px"
                isDisabled={selectedToken?.identifier !== "EGLD"}
              />
            </FormControl>

            {selectedToken && (
              <ActionButton type="submit">
                Send {formatTokenI(selectedToken.identifier)}
              </ActionButton>
            )}
          </VStack>
        </ModalBody>
      </FormikProvider>
    </MyModal>
  );
};

export default TransactionModal;
