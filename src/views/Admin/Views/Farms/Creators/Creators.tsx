import { Box, Heading } from "@chakra-ui/react";
import useGetFarmCreators from "views/Panel/hooks/useGetFarmCreators";
import DynamicFormAndTable from "../commons/DynamicFormAndTable/DynamicFormAndTable";

const Creators = () => {
  const { creators } = useGetFarmCreators();
  return (
    <Box w="full">
      <Heading mb={10} textAlign="center">
        Creators
      </Heading>
      <DynamicFormAndTable
        items={creators}
        dinamuyFormPlaceHolder="Creator..."
        dinamuyFormScFunc="forceAddCreator"
        removeItemScFunc="forceRemoveCreator"
      />{" "}
    </Box>
  );
};

export default Creators;
