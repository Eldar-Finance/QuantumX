import { Box, Checkbox, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useEffect } from "react";
import {
  addSwapInfoToAllConvertTokens,
  handleConverterToken,
  selectToTokenDust,
} from "redux/slices/moondustx/moondustx-slice";
import {
  formatBalance,
  formatBalanceDolar,
  formatNumber,
} from "utils/functions/formatBalance";
import { formatTokenI } from "utils/functions/tokens";
import { useAppDispatch, useAppSelector } from "utils/hooks/redux";
import { IElrondAccountToken } from "utils/types/elrond.interface";
import { INomalSmartSwap } from "utils/types/others.interface";
import useGetSwapInfo from "views/Swap/hooks/useGetSwapInfo";

interface IProps {
  token: IElrondAccountToken;
}
const RowToken = ({ token }: IProps) => {
  const dispatch = useAppDispatch();
  const selectedToToken = useAppSelector(selectToTokenDust);
  const { data } = useGetSwapInfo(
    token.identifier,
    selectedToToken,
    formatBalance(token, true).toString()
  );

  const handleSelect = (
    tokenI: string,
    swapData: INomalSmartSwap[],
    remove: boolean,
    balance: string
  ) => {
    dispatch(
      handleConverterToken({
        identifier: tokenI,
        data: swapData,
        remove,
        balance,
      })
    );
  };

  useEffect(() => {
    if (data) {
      dispatch(
        addSwapInfoToAllConvertTokens({
          identifier: token.identifier,
          data: data as INomalSmartSwap[],
          balance: token.balance,
        })
      );
    }
  }, [data, dispatch, token.balance, token.identifier]);

  return (
    !data ? null :
    <Box>
      <Checkbox
        value={token.identifier}
        w="full"
        sx={{
          "& .chakra-checkbox__label": {
            w: "full",
          },
        }}
        _hover={{
          opacity: "0.6",
        }}
        onChange={(e) =>
          handleSelect(
            e.target.value,
            data as INomalSmartSwap[],
            e.target.checked === false,
            token.balance
          )
        }
        disabled={data === undefined}
      >
        <Flex gap={3} alignItems="center" w="full">
          {token?.assets && (
            <Box rounded={"full"} boxSize={{ xs: "30px", md: "37px" }}>
              <Image alt="" src={token.assets.svgUrl} width={37} height={37} />
            </Box>
          )}
          <Flex flexDir={"column"} gap={1} flex={1}>
            <Flex fontSize={"14px"} fontWeight="600" gap={2}>
              <Text>{formatBalance(token)}</Text>
              <Text>{formatTokenI(token.identifier)}</Text>
            </Flex>
            <Flex fontSize={"sm"} color="GrayText">
              ≈ ${formatBalanceDolar(token, token.price)}
            </Flex>
          </Flex>
          <Flex>
            {data && (
              <Flex
                color="GrayText"
                columnGap={2}
                flexDir={{ xs: "column", md: "row" }}
                alignItems="flex-end"
                fontSize={{ xs: "sm", md: "md" }}
              >
                <Text>
                  ≈{" "}
                  {formatNumber(
                    (data[data.length - 1] as INomalSmartSwap).amountReceiv
                  )}
                </Text>
                <Text>{formatTokenI(selectedToToken)}</Text>
              </Flex>
            )}
          </Flex>
        </Flex>
      </Checkbox>
    </Box>
  );
};

export default RowToken;
