import React, { useEffect } from "react";
import Area from "./area/Area";
import io from 'socket.io-client';
const socket = io('http://localhost:3004');

function Order() {
    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to server');
        });
        socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });
        return () => {
            socket.off('connect');
            socket.off('disconnect');
        };
    }, []);
    return <div>
        <Area />
    </div>;
}

export default Order;
