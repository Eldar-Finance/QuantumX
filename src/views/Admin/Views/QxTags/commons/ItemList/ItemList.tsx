import {
  Box,
  Checkbox,
  CheckboxGroup,
  Divider,
  Flex,
  Grid,
} from "@chakra-ui/react";
import { BytesValue } from "@multiversx/sdk-core/out";
import { scCall } from "api/sc/calls";
import ActionButton from "components/ActionButton/ActionButton";
import { Fragment, useState } from "react";
import { formatAddress } from "utils/functions/formatAddress";
import { validateAddress } from "utils/functions/validates";

export type ScFuncsRemoveType = "removeAvailableExtensions";

interface IProps {
  scFunc: ScFuncsRemoveType;
  optionList: string[];
  onAction?: (value: string) => void;
}

const ItemList = ({ scFunc, optionList, onAction }: IProps) => {
  const [checkedValues, setCheckedValues] = useState([]);
  const handleChange = (values) => {
    setCheckedValues(values);
  };
  const handleSubmit = () => {
    const array = checkedValues.map((value) => {
      return BytesValue.fromUTF8(value);
    });
    scCall("farms2", scFunc, [...array]);
  };
  return (
    <Box>
      <CheckboxGroup colorScheme="linkedin" onChange={handleChange}>
        <Grid templateColumns={{ xs: "1fr", tablet: "1fr 1fr" }} gap={3}>
          {optionList.map((option, i) => {
            return (
              <Fragment key={option}>
                <Flex
                  w="full"
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Checkbox value={option}>
                    {validateAddress(option) ? formatAddress(option) : option}
                  </Checkbox>
                  <ActionButton
                    onClick={() => (onAction ? onAction(option) : null)}
                  >
                    Set Cost
                  </ActionButton>
                </Flex>
                {(i + 1) % 2 === 0 && <Divider gridColumn={"1 / 3"} />}
              </Fragment>
            );
          })}
        </Grid>
      </CheckboxGroup>
      <Flex justifyContent={"flex-end"}>
        <ActionButton
          bg="danger"
          mt={6}
          onClick={handleSubmit}
          disabled={checkedValues.length === 0}
        >
          Remove
        </ActionButton>
      </Flex>
    </Box>
  );
};

export default ItemList;
