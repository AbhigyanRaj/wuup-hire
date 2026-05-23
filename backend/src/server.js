import "dotenv/config";
import { env } from "./config/env.js";
import { prisma } from "./config/prisma.js";
import { logger } from "./utils/logger.js";
import app from "./app.js";

const startServer = async () => {
  try {
    // Verify DB connection before accepting traffic
    await prisma.$connect();
    logger.info("Database connected.");

    const server = app.listen(env.PORT, () => {
      logger.info(`Server running on port ${env.PORT} [${env.NODE_ENV}]`);
    });

    // ─── Graceful Shutdown ──────────────────────────────────────────────────
    const shutdown = async (signal) => {
      logger.info(`${signal} received — shutting down gracefully...`);
      server.close(async () => {
        await prisma.$disconnect();
        logger.info("Database disconnected. Goodbye.");
        process.exit(0);
      });
    };

    process.on("SIGTERM", () => shutdown("SIGTERM"));
    process.on("SIGINT",  () => shutdown("SIGINT"));
  } catch (err) {
    logger.error("Failed to start server.", { message: err.message });
    await prisma.$disconnect();
    process.exit(1);
  }
};

startServer();