import NodeCache from "node-cache";

const cache = new NodeCache();

export const CACHE_KEYS = {
    USERS: "users",
    TASKS: "tasks"
}

export default cache;
