//{"type":"reg","data":"{\"name\":\"string\",\"index\":number,\"error\":boolean,\"errorText\":\"string\"}","id":0}

export function objToJSON(obj: any): string {
    for (const key in obj) {
        if (obj[key] !== null && typeof obj[key] === "object") {
            obj[key] = JSON.stringify(obj[key]);
        }
    }
    return JSON.stringify(obj);
}