import url from 'url';
import { routes } from './urls.js';
/*  */
export const router = (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    const handler = routes[trimmedPath];
    if (handler) {
        handler(req, res);
    } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "No encontrado" }));
    }
};