import MyModal from "components/Modal/Modal";
import { useState } from "react";
import { IHubCreatorInfo } from "utils/types/sc.interface";
import AddNfts from "./AddNfts/AddNfts";
import AllActions from "./AllActions/AllActions";
import RemoveNFTs from "./RemoveNFTs/RemoveNFTs";
import { Box, Divider, Flex } from "@chakra-ui/react";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  hubInfo: IHubCreatorInfo;
}

const HubActionModal = ({ hubInfo, isOpen, onClose }: IProps) => {
  const [view, setView] = useState<number>(0);
  const handleView = (view: number) => {
    setView(view);
  };

  return (
    <MyModal isOpen={isOpen} onClose={onClose} size={"4xl"} isCentered={false}>
      <Box className="flex flex-col">    
        <AllActions handleView={handleView} />
        
        {view > 0 && <Divider />}
        
        <AddNfts
          onClose={() => handleView(0)}
          collection={hubInfo.collection}
          id={hubInfo.id}
          view={view}
        />
        
        <RemoveNFTs
          collection={hubInfo.collection}
          id={hubInfo.id}
          onClose={() => handleView(0)}
          nonces={hubInfo.nftsNonces}
          view={view}
        />
      </Box>
    </MyModal>
  );
};

export default HubActionModal;
