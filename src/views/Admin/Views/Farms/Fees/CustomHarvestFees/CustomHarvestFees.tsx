import { Flex, Heading, Table, Text } from "@chakra-ui/react";
import { formatBalance } from "utils/functions/formatBalance";
import useGetQuantumxFarmsFees from "utils/hooks/useGetQuantumxFarmsFees";
import useGetFarmsFees from "views/Panel/hooks/useGetFarmsFees";

const CustomHarvestFees = () => {
    const { farmFees } = useGetQuantumxFarmsFees();
    const { fees } = useGetFarmsFees();
    
    return (
    <div>
        <Text as="h2" fontSize={"1.8rem"} mb={5}>
            Custom Harvest Fees:
        </Text>
        <Table variant="simple" width={"200px"}>
            <thead>
                <tr>
                    <td><strong>Farm</strong></td>
                    <td><strong>Fee</strong></td>
                </tr>
            </thead>
            <tbody>
                {farmFees.map((farmFee) => (
                        // Your code here
                        fees.harvest != farmFee.harvestFee * 100 &&
                        <tr key={farmFee.farmId}>
                            <td>{farmFee.farmId}</td>
                            <td>
                                {formatBalance({ balance: farmFee.harvestFee, decimals: 0 })}%
                            </td>
                        </tr>
                    ))}
            </tbody>
        </Table>
    </div>
    );
};

export default CustomHarvestFees;
