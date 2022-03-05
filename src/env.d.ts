interface ImportMetaEnv {
  readonly VITE_A: string;
  readonly VITE_B: string;
  readonly VITE_C: string;
  readonly VITE_CRYPTO_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
