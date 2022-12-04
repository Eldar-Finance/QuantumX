import { Box, Grid, ModalBody, ModalHeader, Text } from "@chakra-ui/react";
import ActionButton from "components/ActionButton/ActionButton";
import PanelBox from "components/PanelBox/PanelBox";
import { IScFarm2 } from "utils/types/sc.interface";
import { deleteFarm } from "views/Panel/scServices";

interface IProps {
  handleView: (view: number) => void;
  farm: IScFarm2;
}
const AllActions = ({ handleView, farm }: IProps) => {
  return (
    <>
      <ModalHeader>Farm Actions</ModalHeader>
      <ModalBody mb={5}>
        <Grid templateColumns={"1fr 1fr"} textAlign="center" gap={5}>
          <PanelBox
            display={"flex"}
            flexDir="column"
            justifyContent={"center"}
            alignItems="center"
          >
            <Text>Rewards Harvested Fee : 0%</Text>
            <Text mb={3}>Early Unbound Fee : 3%</Text>

            <ActionButton onClick={() => handleView(1)}>Edit Fees</ActionButton>
          </PanelBox>
          <PanelBox
            display={"flex"}
            flexDir="column"
            justifyContent={"center"}
            alignItems="center"
          >
            <Text flex={1}>Unbounding Period: 3 Days</Text>

            <ActionButton onClick={() => handleView(2)}>
              Set Unbound
            </ActionButton>
          </PanelBox>
          <PanelBox
            display={"flex"}
            flexDir="column"
            justifyContent={"center"}
            alignItems="center"
          >
            <Text flex={1}>
              Delete the farm (Fund will be automatically return to stakers)
            </Text>

            <ActionButton bg="danger" onClick={() => deleteFarm(farm.farmId)}>
              Cancel Farm
            </ActionButton>
          </PanelBox>
          <PanelBox
            display={"flex"}
            flexDir="column"
            justifyContent={"center"}
            alignItems="center"
          >
            <Box flex={1} mb={3}>
              <Text>Deposit rewards for the period you want.</Text>
              <Text>
                You will no be able to deposit rewards until this period ends
              </Text>
            </Box>

            <ActionButton onClick={() => handleView(3)}>
              Deposit Rewards
            </ActionButton>
          </PanelBox>
        </Grid>
      </ModalBody>
    </>
  );
};

export default AllActions;
