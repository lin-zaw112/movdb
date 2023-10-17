/**
 *
 * @param variable nodejs environment variable's name
 * @returns nodejs environment variable's value or process.env.{variable} is undefined!
 */
export default function getEnvVar(variable: string): string {
  const ret = process.env[variable];
  if (ret === undefined) {
    throw new Error("process.env." + variable + " is undefined!");
  }
  return ret;
}
