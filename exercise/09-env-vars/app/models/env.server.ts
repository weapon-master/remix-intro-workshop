import invariant from "tiny-invariant";

export function getEnv() {
  invariant(process.env.ADMIN_EMAIL, "env ADMIN_EMAIL not set");
  return {
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  };
}
