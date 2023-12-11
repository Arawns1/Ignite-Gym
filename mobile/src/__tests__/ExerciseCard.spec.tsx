import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import { ExerciseCard } from "@components/ExerciseCard";
import { Providers } from "@mocks/wrappers/nativeBaseWrapper";
import { mockExerciseDTO } from "@mocks/mockExerciseDTO";
import { api } from "@services/axios";

describe("Component: ExerciseCard", () => {
  it("should render the component", () => {
    const { getByTestId } = render(<ExerciseCard data={mockExerciseDTO} />, {
      wrapper: Providers,
    });
    const component = getByTestId("exerciseCard");
    expect(component).toBeOnTheScreen();
  });
  it("should render the exercise Name", () => {
    const { getByText } = render(<ExerciseCard data={mockExerciseDTO} />, {
      wrapper: Providers,
    });

    expect(getByText(mockExerciseDTO.name)).toBeOnTheScreen();
  });
  it("should render the correct number of series and repetitions", () => {
    const { getByText } = render(<ExerciseCard data={mockExerciseDTO} />, {
      wrapper: Providers,
    });

    expect(
      getByText(`${mockExerciseDTO.series} séries x ${mockExerciseDTO.repetitions} repetições`)
    ).toBeOnTheScreen();
  });
  it("should render the correct image source", () => {
    const { getByTestId } = render(<ExerciseCard data={mockExerciseDTO} />, {
      wrapper: Providers,
    });

    const image = getByTestId("exerciseImage");
    waitFor(() =>
      expect(image.props.source.uri).toEqual(
        `${api.defaults.baseURL}/exercise/thumb/${mockExerciseDTO.thumb}`
      )
    );
  });
});
