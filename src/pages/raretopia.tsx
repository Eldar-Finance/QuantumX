import { MetaHead } from "components/MetaHead/MetaHead";
import ConverterView from "views/Converter/ConverterView";
const Converter = () => {
  return (
    <>
      <MetaHead
        metaTitle="Raretopia"
        metaDescription="Welcome to Raretopia! Convert all your favorite tokens to RARE in one click. Easy, fast, and secure."
      />
      <ConverterView />
    </>
  );
};

export default Converter;
