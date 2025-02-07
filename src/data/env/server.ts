import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        NEON_DB_URL: z.string().url(),
    },
    experimental__runtimeEnv: process.env
});