import { useEffect } from "react";
import Area from "./area/Area";
import io from 'socket.io-client';
const socket = io('http://localhost:3004');
import { toast } from "react-toastify";
import notiSound from "../../assets/notiSound.mp3"

function Order() {
    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to server');
        });
        socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });
        socket.on("new_order", (data) => {
            const sound = new Audio(notiSound)
            sound.play()
            console.log("new_order", data);
            toast.success(data.message);
        });
        socket.on("update_order", (data) => {
            const sound = new Audio(notiSound)
            sound.play()
            console.log("update_order", data);
            toast.success(data.message);
        });
        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('new_order');
            socket.off('update_order');
        };
    }, []);
    return <div>
        <Area />
    </div>;
}

export default Order;
