import { Grid, ModalBody, ModalHeader } from "@chakra-ui/react";
import ActionButton from "components/ActionButton/ActionButton";

interface IProps {
  handleView: (view: number) => void;
}
const AllActions = ({ handleView }: IProps) => {
  return (
    <>
      <ModalHeader>Hub Actions</ModalHeader>
      <ModalBody mb={5}>
        <Grid
          templateColumns={{ xs: "1fr", md: "1fr 1fr" }}
          textAlign="center"
          gap={5}
        >
          <ActionButton onClick={() => handleView(1)}>Add NFTs</ActionButton>
          <ActionButton onClick={() => handleView(2)}>Remove NFTs</ActionButton>
        </Grid>
      </ModalBody>
    </>
  );
};

export default AllActions;
