import { Logo } from "@components/Logo";
import { Center, Heading, Image, ScrollView, VStack, useToast } from "native-base";
import React from "react";
import BackgroundImg from "@assets/background.png";
import { Input } from "@components/Input";
import Button from "@components/Button";
import { useNavigation } from "@react-navigation/core";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { api } from "@services/axios";
import { AppError } from "@utils/AppError";
import { useAuth } from "@hooks/useAuth";

//TODO - Otimizar o código

const SignUpSchema = Yup.object({
  nome: Yup.string().required("Nome é obrigatório"),
  email: Yup.string().required("E-mail é obrigatório").email("E-mail inválido"),
  senha: Yup.string()
    .required("Senha é obrigatória")
    .min(6, "A senha deve ter pelo menos 6 caracteres"),
  confirmarSenha: Yup.string()
    .required("Confirme a senha")
    .oneOf([Yup.ref("senha")], "Senhas não conferem"),
});

interface FormDataProps {
  nome: string;
  email: string;
  senha: string;
  confirmarSenha: string;
}

export function SignUp() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();
  const toast = useToast();
  const { signIn } = useAuth();

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormDataProps>({
    resolver: yupResolver(SignUpSchema),
    defaultValues: {
      nome: "",
      email: "",
      senha: "",
      confirmarSenha: "",
    },
  });

  async function handleSignUp({ nome: name, email, senha: password }: FormDataProps) {
    try {
      await api.post("/users", { name, email, password });
      await signIn(email, password);
      toast.show({
        title: "Cadastro realizado com sucesso",
        placement: "top",
        alignItems: "center",
        backgroundColor: "green.500",
      });
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível criar sua conta. Tente novamente mais tarde";

      toast.show({
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
        <Logo />
        <Image
          source={BackgroundImg}
          defaultSource={BackgroundImg}
          alt="Tela de fundo: Um homem e uma mulher se exercitando em uma academia"
          resizeMode="contain"
          position={"absolute"}
        />
        <Center>
          <Heading fontSize={"xl"} fontFamily={"heading"} color={"gray.100"} mb={"4"}>
            Crie sua conta
          </Heading>

          <Controller
            control={control}
            name="nome"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Nome"
                textContentType="name"
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.nome?.message}
              />
            )}
          />
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

          <Controller
            control={control}
            name="confirmarSenha"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Confirme a Senha"
                autoCorrect={false}
                textContentType="password"
                secureTextEntry
                onSubmitEditing={handleSubmit(handleSignUp)}
                returnKeyType="send"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.confirmarSenha?.message}
              />
            )}
          />
          <Button
            title="Criar e acessar"
            onPress={handleSubmit(handleSignUp)}
            isLoading={isSubmitting}
          />
          <Button
            mt={"12"}
            title="Voltar para o login"
            variant="outline"
            onPress={() => navigation.navigate("SignIn")}
          />
        </Center>
      </VStack>
    </ScrollView>
  );
}
