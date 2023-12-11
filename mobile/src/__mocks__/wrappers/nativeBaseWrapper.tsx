import { NativeBaseProvider } from "native-base";
import React, { ReactElement } from "react";
import { DEFAULT_THEME } from "../../themes/index";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContextProvider } from "@contexts/AuthContext";

const inset = {
  frame: { x: 0, y: 0, width: 0, height: 0 },
  insets: { top: 0, left: 0, right: 0, bottom: 0 },
};

export const Providers = ({ children }: { children: ReactElement }) => {
  return (
    <NavigationContainer>
      <NativeBaseProvider initialWindowMetrics={inset} theme={DEFAULT_THEME}>
        <AuthContextProvider>{children}</AuthContextProvider>
      </NativeBaseProvider>
    </NavigationContainer>
  );
};
