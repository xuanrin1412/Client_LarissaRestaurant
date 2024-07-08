export const ShowPassword = (setShowPassword: (value: React.SetStateAction<boolean>) => void) => {
    const elementPassword = document.getElementsByClassName("password");
    if ((elementPassword[0] as HTMLInputElement).type === "password") {
        (elementPassword[0] as HTMLInputElement).type = "text"
        setShowPassword(true)

    } else {
        (elementPassword[0] as HTMLInputElement).type = "password"
        setShowPassword(false)
    }
}