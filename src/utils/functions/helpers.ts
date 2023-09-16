import { contractAddr } from "api/net.config";
import { getInterface, provider } from "api/sc/sc";
import axios from "axios";
export const getReturnedDataOfscCall = async (workspace, txHash, funcName) => {
  const AbiRegistry = (await import("@multiversx/sdk-core/out")).AbiRegistry;
  const ResultsParser = (await import("@multiversx/sdk-core/out"))
    .ResultsParser;
  const SmartContract = (await import("@multiversx/sdk-core/out"))
    .SmartContract;
  // const SmartContractAbi = (await import("@multiversx/sdk-core/out"))
  //   .SmartContractAbi;

  const parser = new ResultsParser();
  const { address, abiUrl, implementsInterfaces } = getInterface(workspace);
  const response = await axios.get(abiUrl);

  const abiRegistry = await AbiRegistry.create(response.data);
  //const abi = new SmartContractAbi(abiRegistry, [implementsInterfaces]);
  const contract = new SmartContract({
    address: address,
    abi: abiRegistry,
  });
  const transactionOnNetwork = await provider.getTransaction(txHash); // add True as 2nd argument
  const endpointDefinition = contract.getEndpoint(funcName);

  const res = parser.parseOutcome(transactionOnNetwork, endpointDefinition);

  return res;
};

export const getScOfWrapedEgld = (shard: number): string => {
  switch (shard) {
    case 0:
      return contractAddr.wrapEgld;
    case 1:
      return contractAddr.wrapEgldShar1;
    case 2:
      return contractAddr.wrapEgldShar2;

    default:
      return contractAddr.wrapEgldShar1;
      break;
  }
};
