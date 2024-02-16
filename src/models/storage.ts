import { User } from "./user"

class Storage {
    users: User[] = [];
}

let storage = new Storage();

export default storage;