import MyModal from "components/Modal/Modal";
import useGetStakersReport from "views/Panel/hooks/useGetStakersReport";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  farmId: number;
}

const ReporModal = ({ isOpen, onClose, farmId }: IProps) => {
  const {} = useGetStakersReport(farmId);
  return <MyModal isOpen={isOpen} onClose={onClose} size={"4xl"}></MyModal>;
};

export default ReporModal;
