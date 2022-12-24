import type { getEnv } from "./models/env.server";
type ENV = ReturnType<typeof getEnv>;
declare global {
  var ENV: ENV;
  interface Window {
    ENV: ENV;
  }
}
