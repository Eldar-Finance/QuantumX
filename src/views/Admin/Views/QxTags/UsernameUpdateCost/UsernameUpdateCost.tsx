import { useDisclosure } from "@chakra-ui/react";
import { getFromAllTokens } from "api/rest/elrondApi/tokens";
import ActionButton from "components/ActionButton/ActionButton";
import dynamic from "next/dynamic";
import { setElrondBalance } from "utils/functions/formatBalance";
import { setUsernameUpdateCost } from "../services";
const CostModal: any = dynamic(() => import("../CostModal/CostModal"));

const UsernameUpdateCost = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const handleSubmit = async (values: {
    tokenI: string;
    costAmount: string;
    nonce: string;
  }) => {
    let elrondTokenArr = [];
    try {
      const { data } = await getFromAllTokens({
        identifier: values.tokenI,
      });
      elrondTokenArr = [...data];
    } catch (error) {}
    if (elrondTokenArr?.length > 0 || values.tokenI === "EGLD") {
      const elrondToken = elrondTokenArr[0];
      const realCost = setElrondBalance(
        values.costAmount,
        elrondToken?.decimals
      );
      setUsernameUpdateCost(
        values.tokenI,
        realCost,
        values?.nonce ? Number(values.nonce) : 0
      );
    }
  };
  return (
    <>
      <ActionButton onClick={onOpen} px={8} py={5} my={4}>
        Set Username Update Cost
      </ActionButton>
      {isOpen && (
        <CostModal
          isOpen={isOpen}
          onClose={onClose}
          title="Update Username Cost"
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
};

export default UsernameUpdateCost;
