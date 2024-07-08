export const convertBase64 = (file: File | undefined|Blob) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        if(file){
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        }
      
    });
};