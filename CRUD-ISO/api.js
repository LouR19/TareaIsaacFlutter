import { parser } from "./parser.js";
import fs from 'fs';

const filePath = './data.json';

const rdData = () => {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
};
const wrData = (data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};
/*  */
export const home = async (req, res) => {
    if (req.method === "GET") {
        const data = rdData();
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify(data));
        res.end();
    } else if (req.method === "POST") {
        let data = await parser(req);
        const dataExistente = rdData();
        dataExistente.push(data);
        wrData(dataExistente);
        res.writeHead(201, { "Content-Type": "application/json" });
        res.write(JSON.stringify({ message: "Agregado correctamente..." }));
        res.end();
    } else {
        res.writeHead(405, { "Content-Type": "application/json" });
        res.write(JSON.stringify({ message: "Método no permitido" }));
        res.end();
    }
};
/*  */
export const products = async (req, res) => {
    if (req.method === "GET") {
        const data = rdData();
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify(data));
        res.end();
    } else if (req.method === "POST") {
        let data = await parser(req);
        const dataExistente =rdData();
        dataExistente.push(data);
        wrData(dataExistente);
        res.writeHead(201, { "Content-Type": "application/json" });
        res.write(JSON.stringify({ message: "Agregado correctamente..." }));
        res.end();
    } else if (req.method === "PATCH" || req.method === "PUT") {
        let data = await parser(req);
        const dataExistente = rdData();
        const index = dataExistente.findIndex(item => item.id === data.id);
        if (index !== -1) {
            dataExistente[index] = { ...dataExistente[index], ...data };
            wrData(dataExistente);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.write(JSON.stringify({ message: "Actualizado correctamente..." }));
        } else {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.write(JSON.stringify({ message: "No encontrado" }));
        }
        res.end();
    } else if (req.method === "DELETE") {
        let data = await parser(req);
        const dataExistente = rdData();
        const newData =dataExistente.filter(item => item.id !== data.id);
        if (newData.length < dataExistente.length) {
            wrData(newData);
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