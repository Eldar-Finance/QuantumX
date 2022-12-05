import {
  Center,
  Checkbox,
  CheckboxGroup,
  Grid,
  ModalBody,
  ModalFooter,
  Spinner,
  Text,
} from "@chakra-ui/react";
import ActionButton from "components/ActionButton/ActionButton";
import { useState } from "react";

import RowItem from "../RowItem/RowItem";
const WhatGet = ({ tokensData, handleSubmit }) => {
  const [selectedValues, setSelectedValues] = useState([]);
  const handleChange = (values) => {
    if (values.length <= 5) {
      setSelectedValues(values);
    }
  };
  const onSubmit = () => {
    const dataValues = tokensData.filter((t) => {
      return selectedValues.includes(t.identifier);
    });
    handleSubmit(dataValues);
  };
  return (
    <>
      <ModalBody pt={2}>
        <Text
          fontSize={"xl"}
          textAlign="center"
          as={"h3"}
          fontWeight="bold"
          mb={6}
        >
          Select up to 5 tokens
        </Text>
        <Center width={"full"} flexDirection="column">
          <CheckboxGroup onChange={handleChange} value={selectedValues}>
            <Grid templateColumns={"1fr 1fr"} columnGap="4">
              {tokensData.map((el, i) => {
                return (
                  <Checkbox value={el.identifier} key={el.identifier}>
                    <RowItem key={el.identifier} token={el} />
                  </Checkbox>
                );
              })}
            </Grid>
          </CheckboxGroup>

          {tokensData.length === 0 && (
            <Center minH={"150px"}>
              <Spinner size={"xl"} />
            </Center>
          )}
        </Center>
      </ModalBody>
      <ModalFooter mb={3} flexDirection="column">
        <ActionButton
          mr={3}
          fontSize={"xl"}
          onClick={onSubmit}
          width="full"
          borderRadius="8px"
          height="50px"
          textTransform="uppercase"
        >
          CONFIRM
        </ActionButton>
      </ModalFooter>
    </>
  );
};

export default WhatGet;
