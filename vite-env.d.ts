interface ImportMetaEnv {
  VITE_API_URL: string;
  // Add other environment variables as needed
}

declare global {
  const import: {
    meta: {
      env: ImportMetaEnv;
    };
  };
}
