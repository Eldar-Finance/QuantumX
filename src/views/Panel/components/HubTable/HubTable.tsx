import { Box } from "@chakra-ui/react";
import SearchTable from "components/Tables/SearchTable";
import { useEffect } from "react";
import { fetchCreatorInfo } from "redux/slices/hub/funcs";
import { selectHubCreatorsInfo } from "redux/slices/hub/hub-slice";
import { formatTokenI } from "utils/functions/tokens";
import { useAppDispatch, useAppSelector } from "utils/hooks/redux";
import { hubColumns, IHubCreatorTableInfo } from "./columns";

const HubTable = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector(selectHubCreatorsInfo);
  useEffect(() => {
    dispatch(fetchCreatorInfo());
  }, [dispatch]);

  const tableData: IHubCreatorTableInfo[] = data.map((creatorInfo) => {
    const data: IHubCreatorTableInfo = {
      available: creatorInfo.nftsNonces.length,
      collection: creatorInfo.collection,
      cost: `${creatorInfo.price} ${formatTokenI(creatorInfo.token)}`,
      id: creatorInfo.id,
      withdrawable: `${creatorInfo.withdrawableFounds} ${formatTokenI(
        creatorInfo.token
      )}`,
      hub: creatorInfo,
    };

    return data;
  });
  return (
    <Box w="full" maxW={"1100px"} mx="auto" minH="70vh" overflow={"auto"}>
      <SearchTable tableData={tableData} columnsData={hubColumns} />
    </Box>
  );
};

export default HubTable;
