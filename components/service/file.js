import * as ImagePicker from "expo-image-picker";

export const pickImage = async () => {
  console.log("1");
  let imageUrl = null;

  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });
  console.log("2", !result.canceled);

  if (!result.canceled) {
    console.log("3", result);

    imageUrl = result.assets[0].uri;
  }

  return imageUrl;
};
