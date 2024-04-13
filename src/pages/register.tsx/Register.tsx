import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";


function Register() {
    const navigate = useNavigate()
    const [email, setEmail] = useState<string>("")
    const [userName, setUserName] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        axios.post("http://localhost:3004/api/register", {
            email,
            userName,
            password
        }, { withCredentials: true })
            .then((res) => {
                console.log({ res });
                // if (res.data.message === "Register successful") {
                //     return 
                // }
                navigate("/login")

            })
            .catch(err => {
                toast.error(err.response.data.message)
            })
    }

    const ShowPassword = () => {
        const elementPassword = document.getElementsByClassName("password");
        // if (elementPassword.length > 0) {
        //     console.log("input element", (elementPassword[0] as HTMLInputElement).type);
        if ((elementPassword[0] as HTMLInputElement).type === "password") {
            (elementPassword[0] as HTMLInputElement).type = "text"
            setShowPassword(true)

        } else {
            (elementPassword[0] as HTMLInputElement).type = "password"
            setShowPassword(false)
        }
    }
    useEffect(() => {

    }, [showPassword])

    return <div className="hero min-h-screen bg-cover " style={{ backgroundImage: 'url(https://manofmany.com/wp-content/uploads/2016/09/wpid-1180178.jpg)' }}>
        {/* <div className=" bg-opacity-90"></div> */}
        <div className=" text-center text-white bg-black bg-opacity-60 p-8 bg-shadow rounded">
            <div className=" font-josefin ">
                <div className="text-3xl mb-5 bg-shadow-Login ">Register</div>
                <div className="lg:flex">
                    <div className="mb-8 mr-4 text-lg flex flex-col items-center justify-center space-y-3">
                        <div className="  border-2 px-10 py-1 w-full flex justify-center items-center space-x-2"><span>Login with Google</span><FcGoogle /></div>
                        <div className="  border-2 px-10 py-1 w-full flex justify-center items-center space-x-2"><span>Login with FaceBook</span><FaFacebook style={{ color: "#1773EA", background: "white", borderRadius: "50%" }} /></div>
                    </div>
                    <div className="hidden lg:flex divider divider-info divider-horizontal">OR</div>
                    <form onSubmit={handleSubmit} className="min-w-[278px] lg:ml-4 space-y-5 text-shadow-Login">
                        <div className=" flex flex-col">
                            <label className=" font-bold text-lg  text-shadow-Login">Email</label>
                            <input required type="email" value={email} placeholder="Enter your user name" onChange={e => setEmail(e.target.value)} className=" text-shadow-Login text-white bg-transparent flex-1 border-b-2 px-2 py-1  border-b-white outline-none placeholder-white placeholder-opacity-40" />
                        </div>
                        <div className=" flex flex-col">
                            <label className=" font-bold text-lg  text-shadow-Login">User Name</label>
                            <input required value={userName} placeholder="Enter your user name" onChange={e => setUserName(e.target.value)} className=" text-shadow-Login text-white bg-transparent flex-1 border-b-2 px-2 py-1  border-b-white outline-none placeholder-white placeholder-opacity-40" />
                        </div>
                        <div className=" flex flex-col  text-shadow-Login">
                            <label className=" font-bold  text-lg">Password</label>
                            <div className="relative border-b-2 border-b-white text-left flex">
                                <input required type="password" value={password} placeholder="Enter your password" onChange={e => setPassword(e.target.value)} className="password w-11/12  text-white bg-transparent px-2 py-1  border-b-white outline-none" />
                                {showPassword ? <FaRegEye onClick={ShowPassword} className="absolute top-0 right-0 h-full flex items-center" /> :
                                    <FaRegEyeSlash onClick={ShowPassword} className="absolute top-0 right-0 h-full flex items-center" />}
                            </div>

                        </div>
                        <button type="submit" className="text-center w-full bg-black px-2 py-2 mt-4 bg-shadow border-2 border-black hover:bg-white hover:text-black hover:font-bold hover:border-1">Submit</button>
                    </form>
                </div>

                <div className="mt-5">Already have an account ?{" "} <Link to="/login" className="underline"> <br className="flex lg:hidden" />Login Now !</Link></div>
            </div>
        </div>
    </div >
}
//         </div>
//         <div>Don't have account{" "} <Link to="/register" className=" underline">Register Now !</Link></div>
//     </div>;
// }}

export default Register
