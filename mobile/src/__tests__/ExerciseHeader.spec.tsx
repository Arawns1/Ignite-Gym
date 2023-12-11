import ExerciseHeader from "@components/ExerciseHeader";
import { Providers } from "@mocks/wrappers/nativeBaseWrapper";
import { fireEvent, render, userEvent, waitFor } from "@testing-library/react-native";

describe("Component: ExerciseHeader", () => {
  it("should render the component correctly", () => {
    const data = { name: "name", type: "type" };
    const { getByTestId } = render(<ExerciseHeader name={data.name} type={data.type} />, {
      wrapper: Providers,
    });

    expect(getByTestId("exerciseHeader")).toBeOnTheScreen();
  });
  -it("should render the name correctly", () => {
    const data = { name: "name", type: "type" };
    const { getByText } = render(<ExerciseHeader name={data.name} type={data.type} />, {
      wrapper: Providers,
    });

    expect(getByText(data.name)).toBeOnTheScreen();
  });
  it("should render the type correctly", () => {
    const data = { name: "name", type: "type" };
    const { getByText } = render(<ExerciseHeader name={data.name} type={data.type} />, {
      wrapper: Providers,
    });

    expect(getByText(data.type)).toBeOnTheScreen();
  });
  it("should check if the back button is on the screen", () => {
    const data = { name: "name", type: "type" };
    const { getByTestId } = render(<ExerciseHeader name={data.name} type={data.type} />, {
      wrapper: Providers,
    });

    expect(getByTestId("exerciseHeader__backButton")).toBeOnTheScreen();
  });
});
