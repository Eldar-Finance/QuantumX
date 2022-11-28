import {
  Address,
  BigUIntValue,
  BytesValue,
  ContractFunction,
  ResultsParser,
  SmartContract,
} from "@elrondnetwork/erdjs/out";
import { EGLD_VAL, provider } from "api/sc/sc";
import BigNumber from "bignumber.js";

export const getEgldByLkmex = async (balance) => {
  const contractAddress = new Address(
    "erd1qqqqqqqqqqqqqpgqmua7hcd05yxypyj7sv7pffrquy9gf86s535qxct34s"
  );
  const contract = new SmartContract({ address: contractAddress });
  const realBlance = balance * EGLD_VAL;
  const query = contract.createQuery({
    func: new ContractFunction("simulate_swap_lkmex_to_token"),
    args: [
      BytesValue.fromHex("45474c44"),
      new BigUIntValue(new BigNumber(realBlance)),
    ],
  });
  const resultsParser = new ResultsParser();

  const queryResponse = await provider.queryContract(query);
  const bundle = resultsParser.parseUntypedQueryResponse(queryResponse);

  return bundle;
};
