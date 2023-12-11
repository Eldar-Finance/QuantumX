import { Box, ModalBody, ModalCloseButton, ModalHeader } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { selectUserAddress } from "redux/slices/userAcount/account-slice";
import { fetchNfts } from "redux/slices/userAcount/funcs";
import { filterNftsWithMedia } from "utils/functions/nfts";
import { useAppDispatch, useAppSelector } from "utils/hooks/redux";
import useGroupByField from "utils/hooks/useGroupByField";
import { IElrondNFT } from "utils/types/elrond.interface";
import OwnedNFtsList from "../OwnedNFtsList/OwnedNFtsList";
import MyModal from "components/Modal/Modal";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

const OwnedNftsModal = ({ isOpen, onClose }: IProps) => {
  const dispatch = useAppDispatch();
  const address = useAppSelector(selectUserAddress);
  const nfts = useAppSelector((state) => state.userAccount.nfts);

  const nftsByCollection = useGroupByField<IElrondNFT[][]>(
    filterNftsWithMedia(nfts.data) ?? [],
    "collection"
  );
  const [selectedCollection, setSelectedCollection] = useState<string>();

  useEffect(() => {
    if (address) {
      dispatch(fetchNfts(address));
    }
  }, [address, dispatch]);

  if (!nftsByCollection.length) {
    return null;
  }

  return (
    <MyModal isOpen={isOpen} onClose={onClose} size="xl" pb={5}>
      <ModalCloseButton
        border="none"
        outline={"none"}
        _focus={{ boxShadow: "none" }}
        right={5}
        top={4}
      />
      <ModalHeader
        px="6"
      >
        My NFTs
      </ModalHeader>
      <ModalBody px="6" py={4}>
        <Box p="10px 30px 60px 30px" borderRadius={"2xl"} w="full">
          <Box position={"relative"} w="full" maxW={"1000px"} m="auto">
            <OwnedNFtsList
              nfts={nftsByCollection}
              selectedCollection={selectedCollection}
              setSelectedCollection={setSelectedCollection}
            />
          </Box>
        </Box>
      </ModalBody>
    </MyModal>
  );
};

export default OwnedNftsModal;
