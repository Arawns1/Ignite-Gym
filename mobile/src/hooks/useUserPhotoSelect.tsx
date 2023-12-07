import { useContext, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { useToast } from "native-base";
import { api } from "@services/axios";
import { useMutation } from "@tanstack/react-query";
import { AuthContext } from "@contexts/AuthContext";
export const useUserPhotoSelect = () => {
  const toast = useToast();
  const { user, updateUserProfile } = useContext(AuthContext);

  const photoMutation = useMutation({ mutationFn: handleUserPhotoSelect });

  async function handleUserPhotoSelect() {
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
      console.error(error);
    }
  }

  return { photoMutation };
};
