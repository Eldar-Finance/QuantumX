import { Grid } from "@chakra-ui/react";
import DinamicForm, { SCFuncTypes } from "../DinamicForm/DinamicForm";
import ItemList, { ScFuncsRemoveType } from "../ItemList/ItemList";

interface IProps {
  items: string[];
  dinamuyFormPlaceHolder: string;
  dinamuyFormScFunc: SCFuncTypes;
  removeItemScFunc: ScFuncsRemoveType;
  onAction?: (value: string) => void;
  actionTexArr?: string[];
}

const DynamicFormAndTable = ({
  items,
  dinamuyFormPlaceHolder,
  dinamuyFormScFunc,
  removeItemScFunc,
  onAction,
  actionTexArr,
}: IProps) => {
  return (
    <Grid templateColumns={{ xs: "1fr", md: "1fr 1fr" }} gap={10} w="full">
      <DinamicForm
        placeholder={dinamuyFormPlaceHolder}
        scFunc={dinamuyFormScFunc}
      />
      <ItemList
        optionList={items}
        scFunc={removeItemScFunc}
        onAction={onAction}
        actionTexArrt={actionTexArr}
      />
    </Grid>
  );
};

export default DynamicFormAndTable;
