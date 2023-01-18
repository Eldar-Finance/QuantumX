import { Box, Center, Spinner, Text } from "@chakra-ui/react";
import SearchTable from "components/Tables/SearchTable";
import { useEffect } from "react";
import { fetchCreatorInfo } from "redux/slices/hub/funcs";
import { selectHubCreatorsInfo } from "redux/slices/hub/hub-slice";
import { formatBalance } from "utils/functions/formatBalance";
import { formatTokenI } from "utils/functions/tokens";
import { useAppDispatch, useAppSelector } from "utils/hooks/redux";
import { hubColumns, IHubCreatorTableInfo } from "./columns";

const HubTable = () => {
  const dispatch = useAppDispatch();
  const { data, status } = useAppSelector(selectHubCreatorsInfo);
  useEffect(() => {
    dispatch(fetchCreatorInfo());
  }, [dispatch]);

  const tableData: IHubCreatorTableInfo[] = data.map((creatorInfo) => {
    const data: IHubCreatorTableInfo = {
      available: creatorInfo.nftsNonces.length,
      collection: creatorInfo.collection,
      cost: `${formatBalance({
        balance: creatorInfo.price,
        decimals: 18,
      })} ${formatTokenI(creatorInfo.token)}`,
      id: creatorInfo.id,
      withdrawable: `${formatBalance({
        balance: creatorInfo.withdrawableFounds,
        decimals: 18,
      })} ${formatTokenI(creatorInfo.token)}`,
      hub: creatorInfo,
    };

    return data;
  });
  return (
    <Box w="full" maxW={"1100px"} mx="auto" minH="70vh" overflow={"auto"}>
      {status === "loading" ? (
        <Center mt={10}>
          <Spinner />
        </Center>
      ) : (
        <>
          {status === "succeeded" && tableData.length === 0 ? (
            <Text textAlign={"center"}>Access is temporarily restricted.</Text>
          ) : (
            <SearchTable tableData={tableData} columnsData={hubColumns} />
          )}
        </>
      )}
    </Box>
  );
};

export default HubTable;
