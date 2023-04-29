import { Box, Heading, useDisclosure } from "@chakra-ui/react";

import { getFromAllTokens } from "api/rest/elrondApi/tokens";
import dynamic from "next/dynamic";
import { useState } from "react";
import { formatBalance, setElrondBalance } from "utils/functions/formatBalance";
import useGetMultipleElrondTokens from "utils/hooks/useGetMultipleElrondTokens";
import { IScQxTagExtension } from "utils/types/sc.interface";
import { useGetExtensionsList } from "views/Tags/hooks/useGetQTag";
import DynamicFormAndTable from "../commons/DynamicFormAndTable/DynamicFormAndTable";
import { setExtensionCost } from "../services";
const CostModal: any = dynamic(() => import("../CostModal/CostModal"));
const Extensions = () => {
  const { extensionsInfo } = useGetExtensionsList();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [selectedExtension, setExtension] = useState<IScQxTagExtension>();
  const { tokens: mxToekens } = useGetMultipleElrondTokens(
    extensionsInfo.map((extension) => extension.token)
  );
  const handleSetextensionsCost = (extension: string) => {
    const extensionInfo = extensionsInfo.find(
      (extensionInfo) => extensionInfo.extension === extension
    );

    if (!extensionInfo) return;
    setExtension(extensionInfo);
    onOpen();
  };

  const handleSubmit = async (values: {
    tokenI: string;
    costAmount: string;
    nonce: number;
  }) => {
    if (selectedExtension) {
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

        setExtensionCost(
          selectedExtension.extension,
          values.tokenI,
          realCost,
          values?.nonce ? Number(values.nonce) : 0
        );
      }
    }
  };
  return (
    <Box w="full">
      <Heading mb={10} textAlign="center">
        Extensions
      </Heading>
      <DynamicFormAndTable
        items={extensionsInfo.map((extension) => extension.extension)}
        dinamuyFormPlaceHolder="Extension..."
        dinamuyFormScFunc="addAvailableExtensions"
        removeItemScFunc="removeAvailableExtensions"
        onAction={handleSetextensionsCost}
        actionTexArr={extensionsInfo.map(
          (extension) =>
            `${formatBalance({
              balance: extension.amount,
              decimals: mxToekens.find((t) => t.identifier === extension.token)
                ?.decimals,
            })} ${extension.token}`
        )}
      />
      {isOpen && (
        <CostModal
          isOpen={isOpen}
          onClose={onClose}
          title="Update Extension Cost"
          onSubmit={handleSubmit}
        />
      )}
    </Box>
  );
};

export default Extensions;
