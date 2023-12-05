import Button from "@components/Button";
import { Input } from "@components/Input";
import ScreenHeader from "@components/ScreenHeader";
import UserPhoto from "@components/UserPhoto";
import { Center, ScrollView, Text, VStack, Heading, useToast } from "native-base";
import { TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import * as Yup from "yup";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useAuth } from "@hooks/useAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import { AppError } from "@utils/AppError";
import { Loading } from "@components/Loading";
import { api } from "@services/axios";
import { AuthContext } from "@contexts/AuthContext";

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
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const toast = useToast();
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

  //TODO - Refatorar para um hook
  async function handleUserPhotoSelect() {
    setPhotoIsLoading(true);
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
        aspect: [4, 4],
      });

      if (photoSelected.canceled) return;

      const PhotoURI = photoSelected.assets[0].uri;

      if (PhotoURI) {
        const photoInfo = await FileSystem.getInfoAsync(PhotoURI);
        if (photoInfo.exists && photoInfo.size > 3 * 1024 * 1024) {
          toast.show({
            title: "Imagem muito grande",
            placement: "top",
            description: "A imagem não pode ter mais que 3MB",
            bgColor: "red.500",
            alignItems: "center",
          });
          return;
        }

        const fileExtension = PhotoURI.split(".").pop();

        const photoFile = {
          name: `${user.name}.${fileExtension}`.toLowerCase().replaceAll(" ", "_"),
          uri: PhotoURI,
          type: `image/${fileExtension}`,
        } as any;

        const formData = new FormData();
        formData.append("avatar", photoFile);

        const avatarUpdatedResponse = await api.patch("/users/avatar", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const userUpdated = user;
        userUpdated.avatar = avatarUpdatedResponse.data.avatar;
        updateUserProfile(userUpdated);

        toast.show({
          title: "Foto atualizada!",
          placement: "top",
          bgColor: "green.500",
          alignItems: "center",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPhotoIsLoading(false);
    }
  }

  async function handleProfileUpdate(data: ProfileFormData) {
    console.log("teste");
    try {
      setIsLoading(true);
      const userUpdated = user;
      userUpdated.name = data.name;

      await api.put("/users", data);

      await updateUserProfile(userUpdated);
      console.log("teste2");
      toast.show({
        title: "Perfil atualizado com sucesso",
        placement: "top",
        bgColor: "green.500",
        alignItems: "center",
        textAlign: "center",
      });
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : "Não foi possível atualizar o perfil";
      toast.show({
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
              source={{ uri: `${api.defaults.baseURL}/avatar/${user.avatar}` }}
              alt="Foto do usuário"
              size={33}
              isLoading={photoIsLoading}
            />
            <TouchableOpacity onPress={handleUserPhotoSelect}>
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
