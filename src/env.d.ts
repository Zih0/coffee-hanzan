interface ImportMetaEnv {
    readonly VITE_A: string;
    readonly VITE_B: string;
    readonly VITE_C: string;
    readonly VITE_CRYPTO_KEY: string;
    readonly VITE_FIREBASE_API_KEY: string;
    readonly VITE_FIREBASE_AUTH_DOMAIN: string;
    readonly VITE_FIREBASE_PROJECT_ID: string;
    readonly VITE_FIREBASE_BUCKET: string;
    readonly VITE_FIREBASE_SENDER_ID: string;
    readonly VITE_FIREBASE_APP_ID: string;
    readonly VITE_FIREBASE_MEASUREMENT_ID: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
