export const handleUploadImage = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFileUpload: (value: React.SetStateAction<File | Blob | undefined>) => void,
    setDisplayImage: (value: React.SetStateAction<string>) => void
 ) => {
    setFileUpload(e.target.files?.[0])
    console.log("fileUpload ----", e.target.files?.[0]);
    if (e.target.files?.[0]) {
        const displayImage = URL.createObjectURL(e.target.files?.[0])
        console.log("displayImage111 ::", displayImage);
        setDisplayImage(displayImage)
    }
};