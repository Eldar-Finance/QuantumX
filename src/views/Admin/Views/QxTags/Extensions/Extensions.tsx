import { Box, Heading, useDisclosure } from "@chakra-ui/react";

import { getFromAllTokens } from "api/rest/elrondApi/tokens";
import dynamic from "next/dynamic";
import { useState } from "react";
import { setElrondBalance } from "utils/functions/formatBalance";
import { IScQxTagExtension } from "utils/types/sc.interface";
import { useGetExtensionsList } from "views/Tags/hooks/useGetQTag";
import DynamicFormAndTable from "../commons/DynamicFormAndTable/DynamicFormAndTable";
import { setExtensionCost } from "../services";
const CostModal: any = dynamic(() => import("../CostModal/CostModal"));
const Extensions = () => {
  const { extensionsInfo } = useGetExtensionsList();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [selectedExtension, setExtension] = useState<IScQxTagExtension>();
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
          0
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
