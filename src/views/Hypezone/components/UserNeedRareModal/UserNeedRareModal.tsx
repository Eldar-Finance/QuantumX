import {
  Center,
  Divider,
  Flex,
  Heading,
  ModalBody,
  ModalHeader,
  Text,
} from "@chakra-ui/react";
import { toknesID } from "api/net.config";
import ActionButton from "components/ActionButton/ActionButton";
import MyModal from "components/Modal/Modal";
import Link from "next/link";
import { formatBalance } from "utils/functions/formatBalance";
import useAuthentication from "utils/hooks/useAuthentication";
import useGetAccountToken from "utils/hooks/useGetAccountToken";
import { routeNames } from "utils/routes";
interface IProps {
  isOpen: boolean;
  onClose: () => void;
}
const UserNeedRareModal = ({ isOpen, onClose }: IProps) => {
  const { accountToken } = useGetAccountToken(toknesID.rare);
  const { isLoggedIn, handleConnect } = useAuthentication();
  return (
    <MyModal isOpen={isOpen} onClose={onClose} size={"sm"}>
      {" "}
      <ModalHeader>
        <Flex justifyContent={"space-between"} alignItems="center">
          <Heading fontSize={"md"} textTransform="uppercase">
            Warning
          </Heading>{" "}
        </Flex>
      </ModalHeader>
      <Divider />
      <ModalBody mt="3">
        <Center w="full" flexDir={"column"} mb={8} gap={4}>
          <Text mb={2} align="center" fontSize={"xl"}>
            Additional RARE needed for gas fees in Hypezone
          </Text>
          {isLoggedIn && (
            <Text mb={6} fontSize={"xl"}>
              RARE in your wallet {formatBalance(accountToken)}
            </Text>
          )}
          {!isLoggedIn ? (
            <ActionButton
              variant={"outline"}
              color="gray.400"
              w="full"
              maxW={"180px"}
              type="submit"
              px={8}
              onClick={handleConnect}
            >
              Connect
            </ActionButton>
          ) : (
            <Link href={routeNames.swap}>
              <ActionButton
                variant={"outline"}
                color="gray.400"
                w="full"
                maxW={"180px"}
                type="submit"
                px={8}
              >
                Swap Now
              </ActionButton>
            </Link>
          )}
        </Center>
      </ModalBody>{" "}
    </MyModal>
  );
};

export default UserNeedRareModal;
