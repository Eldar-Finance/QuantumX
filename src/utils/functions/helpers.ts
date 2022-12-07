import { getInterface, provider } from "api/sc/sc";
import axios from "axios";
export const getReturnedDataOfscCall = async (workspace, txHash, funcName) => {
  const AbiRegistry = (await import("@elrondnetwork/erdjs/out")).AbiRegistry;
  const ResultsParser = (await import("@elrondnetwork/erdjs/out"))
    .ResultsParser;
  const SmartContract = (await import("@elrondnetwork/erdjs/out"))
    .SmartContract;
  const SmartContractAbi = (await import("@elrondnetwork/erdjs/out"))
    .SmartContractAbi;

  const parser = new ResultsParser();
  const { address, abiUrl, implementsInterfaces } = getInterface(workspace);
  const response = await axios.get(abiUrl);

  const abiRegistry = await AbiRegistry.create(response.data);
  const abi = new SmartContractAbi(abiRegistry, [implementsInterfaces]);
  const contract = new SmartContract({
    address: address,
    abi: abi,
  });
  const transactionOnNetwork = await provider.getTransaction(txHash);
  const endpointDefinition = contract.getEndpoint(funcName);

  const res = parser.parseOutcome(transactionOnNetwork, endpointDefinition);

  return res;
};
