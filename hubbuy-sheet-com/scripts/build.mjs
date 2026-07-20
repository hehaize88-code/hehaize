import { spawnSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";

const vinextCli = fileURLToPath(new URL("../node_modules/vinext/dist/cli.js", import.meta.url));

rmSync("dist", { recursive: true, force: true });

const result = spawnSync(process.execPath, [vinextCli, "build"], {
  cwd: process.cwd(),
  env: process.env,
  stdio: "inherit",
});

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}

if (!existsSync("dist/server/index.js")) {
  throw new Error("vinext did not produce the expected server entrypoint.");
}

mkdirSync("dist/.openai", { recursive: true });
copyFileSync(".openai/hosting.json", "dist/.openai/hosting.json");
