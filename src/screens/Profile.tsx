import Button from "@components/Button";
import { Input } from "@components/Input";
import ScreenHeader from "@components/ScreenHeader";
import UserPhoto from "@components/UserPhoto";
import {
  Center,
  ScrollView,
  Text,
  VStack,
  Heading,
  useToast,
} from "native-base";
import { TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { useState } from "react";

export default function Profile() {
  const [userPhoto, setUserPhoto] = useState("https://github.com/Arawns1.png");
  const [photoIsLoading, setPhotoIsLoading] = useState(false);

  const toast = useToast();

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

        setUserPhoto(PhotoURI);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPhotoIsLoading(false);
    }
  }

  return (
    <VStack>
      <ScreenHeader title="Perfil" />
      <ScrollView
        _contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <Center mt={6} px={10}>
          <UserPhoto
            source={{ uri: userPhoto }}
            alt="Foto do usuário"
            size={33}
            isLoading={photoIsLoading}
          />
          <TouchableOpacity onPress={handleUserPhotoSelect}>
            <Text
              color={"green.500"}
              fontWeight={"bold"}
              fontSize="md"
              mt={2}
              mb={8}
            >
              Alterar foto
            </Text>
          </TouchableOpacity>
          <Input placeholder="Nome" bg="gray.600" />
          <Input placeholder="Email" bg="gray.600" isDisabled />
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
          <Input bg="gray.600" placeholder="Senha Antiga" secureTextEntry />
          <Input bg="gray.600" placeholder="Nova Senha" secureTextEntry />
          <Input
            bg="gray.600"
            placeholder="Confirme a nova senha"
            secureTextEntry
          />
          <Button title="Atualizar" mt={4} />
        </Center>
      </ScrollView>
    </VStack>
  );
}
