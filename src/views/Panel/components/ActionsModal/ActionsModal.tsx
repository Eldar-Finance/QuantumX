import MyModal from "components/Modal/Modal";
import { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { IScPanelFarms } from "utils/types/sc.interface";
import AllActions from "./AllActions/AllActions";
import DepositView from "./DespositView/DespositView";
import EditFeeView from "./EditFeeView/EditFeeView";
import UnboundingView from "./UnboundingView/UnboundingView";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  farm: IScPanelFarms;
}

const ActionsModal = ({ isOpen, onClose, farm }: IProps) => {
  const [view, setView] = useState<number>(0);
  const handleView = (view: number) => {
    setView(view);
  };
  return (
    <MyModal isOpen={isOpen} onClose={onClose} size={"4xl"}>
      <SwipeableViews index={view} onChangeIndex={handleView}>
        <AllActions farm={farm} handleView={handleView} />
        <EditFeeView farm={farm.farm} onClose={() => handleView(0)} />
        <UnboundingView farm={farm.farm} onClose={() => handleView(0)} />
        <DepositView farm={farm.farm} onClose={() => handleView(0)} />
      </SwipeableViews>
    </MyModal>
  );
};

export default ActionsModal;
