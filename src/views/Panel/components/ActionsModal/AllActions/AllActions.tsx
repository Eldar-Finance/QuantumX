import { Box, Grid, ModalBody, ModalHeader, Text } from "@chakra-ui/react";
import ActionButton from "components/ActionButton/ActionButton";
import PanelBox from "components/PanelBox/PanelBox";
import { IScPanelFarms } from "utils/types/sc.interface";
import { deleteFarm } from "views/Panel/scServices/farmsCalls";

interface IProps {
  handleView: (view: number) => void;
  farm: IScPanelFarms;
}
const AllActions = ({ handleView, farm }: IProps) => {
  return (
    <>
      <ModalHeader>Farm Actions</ModalHeader>
      <ModalBody mb={5}>
        <Grid
          templateColumns={{ xs: "1fr", md: "1fr 1fr" }}
          textAlign="center"
          gap={5}
        >
          <PanelBox
            display={"flex"}
            flexDir="column"
            justifyContent={"center"}
            alignItems="center"
          >
            <Text mb={3}>Early Unbonding Fee: {farm.earlyUnbondingFee}%</Text>

            <ActionButton onClick={() => handleView(1)}>Edit Fees</ActionButton>
          </PanelBox>
          <PanelBox
            display={"flex"}
            flexDir="column"
            justifyContent={"center"}
            alignItems="center"
          >
            <Text flex={1}>Unbonding Period: {farm.unbondingPeriod} Days</Text>

            <ActionButton onClick={() => handleView(2)}>
              Set Unbonding period
            </ActionButton>
          </PanelBox>
          <PanelBox
            display={"flex"}
            flexDir="column"
            justifyContent={"center"}
            alignItems="center"
          >
            <Text flex={1}>
              Delete the farm.
            </Text>
            <Text fontSize={'sm'} mt={5}>
              1 - staked funds will be returned to stakers
            </Text>
            <Text fontSize={'sm'}>
              2 - run until not failed
            </Text>
            <Text fontSize={'sm'} mb={5}>
              3 - unclaimed rewards will be lost
            </Text>
            <ActionButton
              bg="danger"
              // onClick={() => deleteFarm(farm.farm.farmId)}
              onClick={() => {}}
              disabled={true}
              // change pointer
              cursor={"not-allowed"}

            >
              Delete Farm
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
                Every new deposit will place the rewards exactly after the
                previous one.
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
