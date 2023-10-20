// /// <reference types="vite/client" />

// interface ImportMetaEnv {
//   readonly VITE_APP_TITLE: string;
//   // more env variables...
// }

// interface ImportMeta {
//   readonly env: ImportMetaEnv;
// }

declare namespace NodeJS {
  export interface ProcessEnv {
    REACT_APP_API_URL: "https://node-videly-deploy.onrender.com/api";
  }
}
