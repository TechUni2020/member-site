import loadImage from "blueimp-load-image";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { ChangeEvent, useState } from "react";
import { storage } from "src/components/utils/libs/firebase";
import { useCurrentUser } from "src/global-states/atoms";
import { FormData } from "src/components/feature/SettingModal";

type Props = {
  formData: FormData;
  setFormData: (formData: FormData) => void;
};

type Response = {
  file: File | null;
  setFile: (file: File | null) => void;
  percent: number | null;
  handleOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const useUploadProfileIcon = ({ formData, setFormData }: Props): Response => {
  const { currentUser } = useCurrentUser();
  const [file, setFile] = useState<File | null>(null);
  const [percent, setPercent] = useState<number | null>(null);

  const handleOnChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const canvas = await loadImage(e.target.files[0], {
        maxWidth: 1200,
        canvas: true,
      });
      // NOTE: canvas.imageがHTMLCanvasElement | HTMLImageElementとなっており、toBlobを使おうとするとコンパイルエラーになるのでキャストしている
      const blob = canvas.image as HTMLCanvasElement;

      blob.toBlob((blob) => {
        if (!blob) return;
        // NOTE: displayNameがファイル名としてstorageに保存される
        const storageRef = ref(storage, `${currentUser?.displayName}`);
        const uploadTask = uploadBytesResumable(storageRef, blob);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // NOTE: 取得状況を 0 ~ 100%で表示できるようにしている
            const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setPercent(percent);
          },
          (error) => console.error(error),
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              setFormData({ ...formData, photoURL: url });
            });
          }
        );
        // NOTE: jpegに変換してサイズを縮小する
      }, "image/jpeg");
      setFile(e.target.files?.[0]);
    }
  };

  return { file, setFile, percent, handleOnChange };
};
