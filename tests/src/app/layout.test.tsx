import { render, screen } from "@testing-library/react";
import RootLayout from "../../../src/app/layout";
import "@testing-library/jest-dom";

describe("RootLayout", () => {
  test("renders children correctly", () => {
    render(
      <RootLayout>
        <div>Conteúdo do filho</div>
      </RootLayout>
    );

    expect(screen.getByText(/Conteúdo do filho/i)).toBeInTheDocument();
  });

  test("renders the title and meta tags", () => {
    render(
      <RootLayout>
        <div>Teste de conteúdo</div>
      </RootLayout>
    );

    expect(document.title).toBe("Clima");

    const metaDescription = document.querySelector('meta[name="description"]');
    expect(metaDescription).toHaveAttribute("content", "Descrição do meu site");
  });
});
