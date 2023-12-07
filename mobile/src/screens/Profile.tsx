import Button from "@components/Button";
import { Input } from "@components/Input";
import { Loading } from "@components/Loading";
import ScreenHeader from "@components/ScreenHeader";
import UserPhoto from "@components/UserPhoto";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "@hooks/useAuth";
import { useUserPhotoSelect } from "@hooks/useUserPhotoSelect";
import { api } from "@services/axios";
import { AppError } from "@utils/AppError";
import { Center, Heading, ScrollView, Text, Toast, VStack } from "native-base";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { TouchableOpacity } from "react-native";
import * as Yup from "yup";
import defaultUserPhotoImg from "@assets/userPhotoDefault.png";

type ProfileFormData = {
  name: string;
  email?: string;
  old_password?: string;
  password?: string | null;
  confirm_password?: string | null;
};

const profileSchema = Yup.object({
  name: Yup.string().required("Informe nome."),
  password: Yup.string()
    .min(6, "A senha deve ter pelo menos 6 dígitos.")
    .nullable()
    .transform((value) => (!!value ? value : null)),
  confirm_password: Yup.string()
    .nullable()
    .transform((value) => (!!value ? value : null))
    .oneOf([Yup.ref("password"), null], "A Confirmação de senha não confere")
    .when("password", {
      is: (Field: any) => Field,
      then: (schema) =>
        schema
          .nullable()
          .required("Informe a confirmação de senha.")
          .transform((value) => (!!value ? value : null)),
    }),
});

export default function Profile() {
  const [isLoading, setIsLoading] = useState(false);
  const { photoMutation } = useUserPhotoSelect();
  const { user, updateUserProfile } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormData>({
    defaultValues: {
      name: user.name,
      email: user.email,
    },
    resolver: yupResolver(profileSchema),
  });

  async function handleProfileUpdate(data: ProfileFormData) {
    try {
      setIsLoading(true);
      const userUpdated = user;
      userUpdated.name = data.name;

      await api.put("/users", data);

      await updateUserProfile(userUpdated);
      Toast.show({
        title: "Perfil atualizado com sucesso",
        placement: "top",
        bgColor: "green.500",
        alignItems: "center",
        textAlign: "center",
      });
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : "Não foi possível atualizar o perfil";
      Toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
        alignItems: "center",
        textAlign: "center",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <VStack>
      <ScreenHeader title="Perfil" />
      {isLoading ? (
        <Loading />
      ) : (
        <ScrollView
          _contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          <Center mt={6} px={10}>
            <UserPhoto
              source={
                user.avatar
                  ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` }
                  : defaultUserPhotoImg
              }
              alt="Foto do usuário"
              size={33}
              isLoading={photoMutation.isPending}
            />
            <TouchableOpacity onPress={() => photoMutation.mutate()}>
              <Text color={"green.500"} fontWeight={"bold"} fontSize="md" mt={2} mb={8}>
                Alterar foto
              </Text>
            </TouchableOpacity>

            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Nome"
                  bg="gray.600"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.name?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Email"
                  bg="gray.600"
                  onChangeText={onChange}
                  value={value}
                  isDisabled
                />
              )}
            />

            <Heading
              color="gray.200"
              fontSize="md"
              mb={2}
              alignSelf={"flex-start"}
              mt={12}
              fontFamily={"heading"}
            >
              Alterar senha
            </Heading>
            <Controller
              control={control}
              name="old_password"
              render={({ field: { onChange } }) => (
                <Input
                  bg="gray.600"
                  placeholder="Senha Atual"
                  secureTextEntry
                  onChangeText={onChange}
                  errorMessage={errors.old_password?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange } }) => (
                <Input
                  bg="gray.600"
                  placeholder="Nova Senha"
                  secureTextEntry
                  onChangeText={onChange}
                  errorMessage={errors.password?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="confirm_password"
              render={({ field: { onChange } }) => (
                <Input
                  bg="gray.600"
                  placeholder="Confirme a nova senha"
                  secureTextEntry
                  onChangeText={onChange}
                  errorMessage={errors.confirm_password?.message}
                />
              )}
            />
            <Button
              title="Atualizar"
              mt={4}
              onPress={handleSubmit(handleProfileUpdate)}
              isLoading={isSubmitting}
            />
          </Center>
        </ScrollView>
      )}
    </VStack>
  );
}
