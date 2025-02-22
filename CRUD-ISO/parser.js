export const parser = (req) => {
    return new Promise((resolve, reject) => {
        let chunks = [];
        req.on("data", (c) => {
            chunks.push(c);
        });
        req.on("end", () => {
            let data = Buffer.concat(chunks).toString();
            try {
                const json = JSON.parse(data);
                resolve(json);
            } catch (error) {
                reject(error);
            }
        });
    });
};