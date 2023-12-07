import { Loading } from "@components/Loading";
import { AuthContextProvider } from "@contexts/AuthContext";
import { Roboto_400Regular, Roboto_700Bold, useFonts } from "@expo-google-fonts/roboto";
import { Routes } from "@routes/index";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NativeBaseProvider, StatusBar } from "native-base";
import { DEFAULT_THEME } from "./src/themes";
export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <NativeBaseProvider theme={DEFAULT_THEME}>
        <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
        <AuthContextProvider>{fontsLoaded ? <Routes /> : <Loading />}</AuthContextProvider>
      </NativeBaseProvider>
    </QueryClientProvider>
  );
}
