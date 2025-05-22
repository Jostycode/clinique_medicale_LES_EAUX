// src/socket.js
import { io } from "socket.io-client";

const socket = io('http://localhost:8000'); // Mets bien l'adresse de ton serveur
export default socket;
