import MyModal from "components/Modal/Modal";
import { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { IHubCreatorInfo } from "utils/types/sc.interface";
import AddNfts from "./AddNfts/AddNfts";
import AllActions from "./AllActions/AllActions";
import RemoveNFTs from "./RemoveNFTs/RemoveNFTs";

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
      <SwipeableViews index={view} onChangeIndex={handleView}>
        <AllActions handleView={handleView} />
        <AddNfts
          onClose={() => handleView(0)}
          collection={hubInfo.collection}
          id={hubInfo.id}
        />
        <RemoveNFTs
          collection={hubInfo.collection}
          id={hubInfo.id}
          onClose={() => handleView(0)}
          nonces={hubInfo.nftsNonces}
        />
      </SwipeableViews>
    </MyModal>
  );
};

export default HubActionModal;
