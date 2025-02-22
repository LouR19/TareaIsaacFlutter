import { parser } from "./parser.js";
import fs from 'fs';

const dataFilePath = './data.json';

const readData = () => {
    const data = fs.readFileSync(dataFilePath);
    return JSON.parse(data);
};
const writeData = (data) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

export const home = async (req, res) => {
    if (req.method === "GET") {
        const data = readData();
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify(data));
        res.end();
    } else if (req.method === "POST") {
        let data = await parser(req);
        const dataExistente = readData();
        dataExistente.push(data);
        writeData(dataExistente);
        res.writeHead(201, { "Content-Type": "application/json" });
        res.write(JSON.stringify({ message: "Agregado correctamente..." }));
        res.end();
    } else {
        res.writeHead(405, { "Content-Type": "application/json" });
        res.write(JSON.stringify({ message: "Método no permitido" }));
        res.end();
    }
};

export const products = async (req, res) => {
    if (req.method === "GET") {
        const data = readData();
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify(data));
        res.end();
    } else if (req.method === "POST") {
        let data = await parser(req);
        const dataExistente =readData();
        dataExistente.push(data);
        writeData(dataExistente);
        res.writeHead(201, { "Content-Type": "application/json" });
        res.write(JSON.stringify({ message: "Agregado correctamente..." }));
        res.end();
    } else if (req.method === "PATCH" || req.method === "PUT") {
        let data = await parser(req);
        const dataExistente = readData();
        const index = dataExistente.findIndex(item => item.id === data.id);
        if (index !== -1) {
            dataExistente[index] = { ...dataExistente[index], ...data };
            writeData(dataExistente);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.write(JSON.stringify({ message: "Actualizado correctamente..." }));
        } else {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.write(JSON.stringify({ message: "No encontrado" }));
        }
        res.end();
    } else if (req.method === "DELETE") {
        let data = await parser(req);
        const dataExistente = readData();
        const newData =dataExistente.filter(item => item.id !== data.id);
        if (newData.length < dataExistente.length) {
            writeData(newData);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.write(JSON.stringify({ message: "Eliminado correctamente..." }));
        } else {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.write(JSON.stringify({ message: "Producto no encontrado" }));
        }
        res.end();
    } else {
        res.writeHead(405, { "Content-Type": "application/json" });
        res.write(JSON.stringify({ message: "Método no permitido" }));
        res.end();
    }
};