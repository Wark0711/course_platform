import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        NEON_DB_URL: z.string().url(),
        CLERK_SECRET_KEY: z.string().min(1),
        CLERK_WEBHOOK_SECRET: z.string().min(1),
        ARCJET_KEY: z.string().min(1),
        TEST_IP_ADDRESS: z.string().optional()
    },
    experimental__runtimeEnv: process.env
});