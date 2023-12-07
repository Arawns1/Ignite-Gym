import React from "react";
import { Image, VStack, Text, Center, Heading, ScrollView, Toast } from "native-base";
import BackgroundImg from "@assets/background.png";
import { Input } from "@components/Input";
import Button from "@components/Button";
import { Logo } from "@components/Logo";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "@hooks/useAuth";
import { AppError } from "@utils/AppError";

type SignInFormData = {
  email: string;
  senha: string;
};

const SignInSchema = Yup.object({
  email: Yup.string().required("E-mail é obrigatório"),
  senha: Yup.string().required("Senha é obrigatória"),
});

export function SignIn() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const { signIn } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: yupResolver(SignInSchema),
    defaultValues: {
      email: "",
      senha: "",
    },
  });

  async function handleSignIn({ email, senha }: SignInFormData) {
    try {
      await signIn(email, senha);
      Toast.show({
        title: "Logado com sucesso",
        placement: "top",
        alignItems: "center",
        backgroundColor: "green.500",
      });
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível criar sua conta. Tente novamente mais tarde";

      Toast.show({
        title,
        placement: "top",
        alignItems: "center",
        textAlign: "center",
        backgroundColor: "red.500",
      });
    }
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
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
          <Heading color={"gray.100"} fontSize="xl" mb={6} fontFamily={"heading"}>
            Acesse sua conta
          </Heading>
        </Center>

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="E-mail"
              textContentType="emailAddress"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={onChange}
              value={value}
              errorMessage={errors.email?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="senha"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Senha"
              autoCorrect={false}
              textContentType="password"
              secureTextEntry
              onChangeText={onChange}
              value={value}
              errorMessage={errors.senha?.message}
            />
          )}
        />

        <Button
          title="Acessar"
          mt={6}
          isLoading={isSubmitting}
          onPress={handleSubmit(handleSignIn)}
        />

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
