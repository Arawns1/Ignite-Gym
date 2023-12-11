import HistoryCard from "@components/HistoryCard";
import { mockedHistoryDTO } from "@mocks/mockHistoryDTO";
import { Providers } from "@mocks/wrappers/nativeBaseWrapper";
import { render } from "@testing-library/react-native";

describe("Component: HistoryCard", () => {
  it("should render the component correctly", () => {
    const { getByTestId } = render(<HistoryCard data={mockedHistoryDTO} />, {
      wrapper: Providers,
    });
    expect(getByTestId("historyCardComponent")).toBeOnTheScreen();
  });
  it("should render the group name correctly", () => {
    const { getByText } = render(<HistoryCard data={mockedHistoryDTO} />, {
      wrapper: Providers,
    });
    expect(getByText(mockedHistoryDTO.group)).toBeOnTheScreen();
  });
  it("should render the exercise name correctly", () => {
    const { getByText } = render(<HistoryCard data={mockedHistoryDTO} />, {
      wrapper: Providers,
    });
    expect(getByText(mockedHistoryDTO.name)).toBeOnTheScreen();
  });
  it("should render the hour correctly", () => {
    const { getByText } = render(<HistoryCard data={mockedHistoryDTO} />, {
      wrapper: Providers,
    });
    expect(getByText(mockedHistoryDTO.hour)).toBeOnTheScreen();
  });
});
