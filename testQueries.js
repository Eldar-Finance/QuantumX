//require statments
var {
  AbiRegistry,
  ContractFunction,
  ResultsParser,
  SmartContract,
  SmartContractAbi,
  Address,
  AddressValue,
} = require("@elrondnetwork/erdjs/out");
var {
  ProxyNetworkProvider,
} = require("@elrondnetwork/erdjs-network-providers/out");
var abiFile = require("./public/api/test.abi.json");

const provider = new ProxyNetworkProvider("https://api.multiversx.com", {
  timeout: 30000,
});

export const scQuery = async (
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
  "getWalletPools",
  [
    new AddressValue(
      new Address(
        "erd1vdd9044vpt3wq0wtr4aa02kvqkmn3y4nqr3x7tuvda5uv5kya8ms359c36"
      )
    ),
  ],
  "erd1qqqqqqqqqqqqqpgqvpkd3g3uwludduv3797j54qt6c888wa59w2shntt6z",
  abiFile,
  "Template"
).then((res) => {
  console.log("res ", res?.firstValue?.valueOf());
});
