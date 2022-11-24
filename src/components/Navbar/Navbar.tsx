// import logo from "assets/logos/quantumx.png";
import logo from "assets/logos/quantumx.svg";
import ActionButton from "components/ActionButton/ActionButton";
import MyContainer from "components/Container/Container";
import NextImage from "components/NextImage/NextImage";
import Menu from "./Menu/Menu";
const Navbar = () => {
  return (
    <MyContainer
      bg="black.light"
      borderRadius={"3xl"}
      py="40px"
      px={"80px"}
      display="flex"
      justifyContent={"space-between"}
    >
      <NextImage src={logo} alt="QuantumX" width={128} height={38} />
      <Menu />
      <ActionButton w="194px">Connect Wallet</ActionButton>
    </MyContainer>
  );
};

export default Navbar;
