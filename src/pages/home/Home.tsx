import { useEffect } from "react";
import BannerIntro from "./bannerIntro/BannerIntro";
import Intro from "./intro/intro";
import io from 'socket.io-client';
const socket = io('http://localhost:3004');
// import React, { useState, useEffect } from 'react';
// import { googleLogout, useGoogleLogin } from '@react-oauth/google';
// import axios from 'axios';
// import { GoogleLogin } from '@react-oauth/google';

function Home() {
    // const [ user, setUser ] = useState([]);
    // const [ profile, setProfile ] = useState([]);
    // const login = useGoogleLogin({
    //     onSuccess: (codeResponse) => setUser(codeResponse),
    //     onError: (error) => alert('Login Failed:', error)
    //  });
    // // const responseMessage = (response:unknown) => {
    // //     console.log(response);
    // // };
    // // const errorMessage = (error: unknown) => {
    // //     console.log(error);
    // // };
    // const logOut = () => {
    //     googleLogout();
    //     setProfile(null);
    // };

    // useEffect(
    //     () => {
    //         if (user) {
    //             axios
    //                 .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
    //                     headers: {
    //                         Authorization: `Bearer ${user.access_token}`,
    //                         Accept: 'application/json'
    //                     }
    //                 })
    //                 .then((res) => {
    //                     setProfile(res.data);
    //                 })
    //                 .catch((err) => console.log(err));
    //         }
    //     },
    //     [ user ]
    // );

    // log out function to log the user out of google and set the profile array to null

    useEffect(() => {
        console.log("jjjj", socket);
        socket.on('hievent', (msg) => {
            console.log("msg",msg);
            
        });

    })

    return <div >
        <BannerIntro />
        <Intro />
        {/* <div>
            <h2>React Google Login</h2>
            <br />
            <br />
            <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
        </div> */}


        {/* <div>
            <h2>React Google Login</h2>
            <br />
            <br />
            {profile ? (
                <div>
                    <img src={profile.picture} alt="user image" />
                    <h3>User Logged in</h3>
                    <p>Name: {profile.name}</p>
                    <p>Email Address: {profile.email}</p>
                    <br />
                    <br />
                    <button onClick={logOut}>Log out</button>
                </div>
            ) : (
                <button onClick={login}>Sign in with Google 🚀 </button>
            )}
        </div> */}
    </div>;
}
export default Home;
