import { createContext } from "react";

const storeContext = createContext({
    token: null,
    setToken: (token: string) => { },
});

export default storeContext;