// src/socket.js
import { io } from "socket.io-client";

const socket = io('https://cliniqueleseauxbackend.onrender.com'); // Mets bien l'adresse de ton serveur
export default socket;
