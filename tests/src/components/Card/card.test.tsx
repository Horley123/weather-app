import { render, screen } from "@testing-library/react";
import { Card } from "../../../../src/components/Card/index";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

describe("Card component", () => {
  test("renders card with correct values", () => {
    const mockProps = {
      dia: "Segunda-feira",
      img_src: "https://example.com/icon.png",
      max_temp: 30,
      min_temp: 18,
    };

    render(
      <ChakraProvider value={defaultSystem}>
        <Card {...mockProps} />
      </ChakraProvider>
    );

    expect(screen.getByText("Segunda-feira")).toBeInTheDocument();

    expect(screen.getByText("Max: 30")).toBeInTheDocument();
    expect(screen.getByText("Min: 18")).toBeInTheDocument();

    const imgElement = screen.getByAltText("Ícone do tempo");
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute("src", "https://example.com/icon.png");
  });

  test("card has hover effect", () => {
    const mockProps = {
      dia: "Terça-feira",
      img_src: "https://example.com/icon2.png",
      max_temp: 28,
      min_temp: 16,
    };

    const { container } = render(
      <ChakraProvider value={defaultSystem}>
        <Card {...mockProps} />
      </ChakraProvider>
    );
  });
});
