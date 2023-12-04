import React from "react";
import { Image, VStack, Text, Center, Heading, ScrollView } from "native-base";
import BackgroundImg from "@assets/background.png";
import { Input } from "@components/Input";
import Button from "@components/Button";
import { Logo } from "@components/Logo";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
export function SignIn() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} px={10}>
        <Image
          source={BackgroundImg}
          defaultSource={BackgroundImg}
          alt="Tela de fundo: Um homem e uma mulher se exercitando em uma academia"
          resizeMode="contain"
          position={"absolute"}
        />

        <Logo />

        <Center mt={"12"}>
          <Heading
            color={"gray.100"}
            fontSize="xl"
            mb={6}
            fontFamily={"heading"}
          >
            Acesse sua conta
          </Heading>
        </Center>
        <Input
          placeholder="E-mail"
          textContentType="emailAddress"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Input
          placeholder="Senha"
          autoCorrect={false}
          textContentType="password"
          secureTextEntry
        />
        <Button title="Acessar" mt={6} />

        <Center mt={24}>
          <Text color={"gray.100"} fontSize="sm" fontFamily={"body"} mb={3}>
            Ainda não tem acesso?
          </Text>
          <Button
            title="Criar Conta"
            variant="outline"
            onPress={() => navigation.navigate("SignUp")}
          />
        </Center>
      </VStack>
    </ScrollView>
  );
}
