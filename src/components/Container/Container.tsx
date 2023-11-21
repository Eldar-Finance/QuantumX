import { Container, ContainerProps } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

interface IProps extends PropsWithChildren<ContainerProps> {
  large?: boolean;
}

const MyContainer = ({ children, large, ...props }: IProps) => {
  return (
    <Container
      maxW={{
        sm: "640px",
        md: "768px",
        lg: "94vw",
      }}
      px={{ xs: "12px", lg: large ? "30px" : "0", "2xl": large ? "60px" : "0" }}
      {...props}
    >
      {children}
    </Container>
  );
};

export default MyContainer;
