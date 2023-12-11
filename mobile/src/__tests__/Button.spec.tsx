import React from "react";
import { render } from "@testing-library/react-native";
import Button from "@components/Button";
import { Providers } from "@mocks/wrappers/nativeBaseWrapper";

describe("Component: Button", () => {
  it("should render button title correctly.", () => {
    const { getByText } = render(<Button title="Button test" />, {
      wrapper: Providers,
    });
    expect(getByText("Button test")).toBeOnTheScreen();
  });
  it("should render button with variant outline correctly.", () => {
    const { getByTestId } = render(<Button title="Button test" variant="outline" />, {
      wrapper: Providers,
    });

    const button = getByTestId("buttonComponent");
    expect(button.props.style).toHaveProperty("backgroundColor", "transparent");
    expect(button.props.style).toHaveProperty("borderWidth", 1);
  });

  it("should render text color correctly for outline variant.", () => {
    const { getByTestId } = render(<Button title="Button test" variant="outline" />, {
      wrapper: Providers,
    });

    const buttonText = getByTestId("buttonComponent__text");
    expect(buttonText.props.style).toHaveProperty("color", "#00B37E");
  });

  it("should render button with variant solid correctly.", () => {
    const { getByTestId } = render(<Button title="Button test" variant="solid" />, {
      wrapper: Providers,
    });

    const button = getByTestId("buttonComponent");
    expect(button.props.style).toHaveProperty("backgroundColor", "#00875F");
    expect(button.props.style).toHaveProperty("borderWidth", 0);
  });
  it("should render button text color correctly for solid variant.", () => {
    const { getByTestId } = render(<Button title="Button test" variant="solid" />, {
      wrapper: Providers,
    });

    const buttonText = getByTestId("buttonComponent__text");
    expect(buttonText.props.style).toHaveProperty("color", "#FFFFFF");
  });
});
