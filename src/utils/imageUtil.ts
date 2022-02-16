import imageCompression from "browser-image-compression";

export const compressImage = async (imageFile: File) => {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 288,
    useWebWorker: true,
  };

  try {
    const compressedFile = await imageCompression(imageFile, options);
    return compressedFile;
  } catch (error) {
    console.log(error);

    // 압축에 실패했을 땐 원본 이미지 반환
    return imageFile;
  }
};
