//require statments
var {
  AbiRegistry,
  ContractFunction,
  ResultsParser,
  SmartContract,
  SmartContractAbi,
  Address,
} = require("@elrondnetwork/erdjs/out");
var {
  ProxyNetworkProvider,
} = require("@elrondnetwork/erdjs-network-providers/out");
var abiFile = require("./public/api/sft-rewards-sc.abi.json");

const provider = new ProxyNetworkProvider("https://api.multiversx.com", {
  timeout: 30000,
});

const scQuery = async (
  funcName = "",
  args = [],
  scAddress,
  abiFile,
  abiInterface
) => {
  try {
    const { address, implementsInterfaces } = {
      address: scAddress,
      implementsInterfaces: abiInterface,
    };
    const abiRegistry = await AbiRegistry.create(abiFile);
    const abi = new SmartContractAbi(abiRegistry, [implementsInterfaces]);
    const contract = new SmartContract({
      address: new Address(address),
      abi: abi,
    });

    const query = contract.createQuery({
      func: new ContractFunction(funcName),
      args: args,
    });
    const queryResponse = await provider.queryContract(query);
    const endpointDefinition = contract.getEndpoint(funcName);
    const parser = new ResultsParser();
    const data = parser.parseQueryResponse(queryResponse, endpointDefinition);

    return data;
  } catch (error) {
    console.log(`query error for ${funcName}  : `, error);
  }
};

scQuery(
  "getStakers",
  [],
  "erd1qqqqqqqqqqqqqpgqldzu3c9aczuyk2kzjn9aalfm9tkjeyml64qszqhpek",
  abiFile,
  "SftRewards"
).then((res) => {
  console.log(res.firstValue.valueOf());
});
