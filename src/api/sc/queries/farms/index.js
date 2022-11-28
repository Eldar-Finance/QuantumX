import {
  AbiRegistry,
  Address,
  AddressValue,
  BigUIntValue,
  BytesValue,
  ContractFunction,
  NetworkConfig,
  ResultsParser,
  SmartContract,
  SmartContractAbi,
} from "@elrondnetwork/erdjs/out";
import { contractAddr } from "api/net.config";
import BigNumber from "bignumber.js";
import { abiPath, provider } from "../../sc";

const stringAddress = contractAddr;
const address = new Address(stringAddress.crowfunding);
const abiUrl = abiPath + "/crowdfunding.abi.json";
const implementsInterfaces = "EldarCrowd";

export const getUserFarmEarnings1 = async (balance, attributes) => {
  if (typeof balance === "string") {
    balance = Number(balance);
  }
  await NetworkConfig.getDefault().sync(provider);
  const abiRegistry = await AbiRegistry.load({
    urls: [abiUrl],
  });
  const abi = new SmartContractAbi(abiRegistry, [implementsInterfaces]);
  const contract = new SmartContract({
    address: address,
    abi: abi,
  });

  const interaction = contract.methods.calculateRewardsForGivenPosition([
    new AddressValue(new Address()),
  ]);

  const queryResponse = await contract.runQuery(
    provider,
    interaction.buildQuery()
  );
  const response = interaction.interpretQueryResponse(queryResponse);

  return response;
};
export const getUserFarmEarnings2 = async (
  balance,
  attributes,
  contractAddress = ""
) => {
  // const response = await contract.runQuery(provider, {
  //   func: new ContractFunction("calculateRewardsForGivenPosition"),
  //   args: [
  //     new BigUIntValue(new BigNumber(balance)),
  //     BytesValue.fromHex(Buffer.from(attributes, "base64")),
  //   ],
  // });

  const contract = new SmartContract({ address: new Address(contractAddress) });
  const query = contract.createQuery({
    func: new ContractFunction("calculateRewardsForGivenPosition"),
    args: [
      new BigUIntValue(new BigNumber(balance)),
      BytesValue.fromHex(Buffer.from(attributes, "base64")),
    ],
  });
  const resultsParser = new ResultsParser();

  const queryResponse = await provider.queryContract(query);
  const bundle = resultsParser.parseUntypedQueryResponse(queryResponse);

  return bundle;
};
