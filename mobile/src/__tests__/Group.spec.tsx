import { Group } from "@components/Group";
import { Providers } from "@mocks/wrappers/nativeBaseWrapper";
import { render } from "@testing-library/react-native";

describe("Component: Group", () => {
  it("should render the component correctly", () => {
    const { getByTestId } = render(<Group name="nomeTeste" />, {
      wrapper: Providers,
    });
    expect(getByTestId("groupComponent")).toBeOnTheScreen();
  });

  it("should render the component name correctly", () => {
    const { getByText } = render(<Group name="nomeTeste" />, {
      wrapper: Providers,
    });
    expect(getByText("nomeTeste")).toBeOnTheScreen();
  });

  it("should verify if the group become active", () => {
    const { getByTestId } = render(<Group name="nomeTeste" isActive />, {
      wrapper: Providers,
    });
    expect(getByTestId("groupComponent").props.style).toHaveProperty("borderColor", "#00B37E");
    expect(getByTestId("groupComponent").props.style).toHaveProperty("borderWidth", 1);
  });
});
