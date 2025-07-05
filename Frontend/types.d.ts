interface ImportMetaEnv {
  readonly BASE_URL: string;
  readonly VITE_BASE_URL: string;
  // add other environment variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '*.gif' {
  const value: string;
  export default value;
}

declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.jpg' {
  const value: string;
  export default value;
}

declare module '*.jpeg' {
  const value: string;
  export default value;
}

declare module '*.svg' {
  const value: string;
  export default value;
}
