import {mkdir, writeFile} from 'node:fs/promises';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const configName = process.argv[2] || process.env['CONFIG_NAME'];

if (!configName) {
  throw new Error(
    'No config name found. Either pass it `pnpm run createConfig configName` or use env: `CONFIG_NAME=configName`',
  );
}

await generateConfig(
  join(__dirname, '..', 'configs', `${configName}.config.mjs`),
  [
    'graphqlEndpoint',
    'identityPoolId',
    'userPoolId',
    'userPoolWebClientId',
    'pinpointAppId',
    'publicS3Bucket',
    'region',
    'pinpointRegion',
  ],
  join(__dirname, '..', 'src', 'lib', 'config', '.config.ts'),
);

/**
 * Loads a config file, checks it for required keys and generates a copy of the file somewhere else.
 * @param {string} configPath The path to the config file you want to generate
 * @param {Array<string>} requiredConfigKeys The configuration variables required by the project
 * @param {string} generatedConfigPath Where the generatedConfig file should be placed
 */
async function generateConfig(
  configPath,
  requiredConfigKeys,
  generatedConfigPath,
) {
  const config = (await import(configPath)).default;

  if (!config) {
    throw new Error(`No default export in ${configPath}`);
  }

  if (typeof config !== 'object') {
    console.error('config', config);
    throw new Error(`Exported value from ${configPath} is not an object`);
  }

  if (Object.keys(config).length !== requiredConfigKeys.length) {
    console.error(config);
    throw new Error(`Expected config to only contain requiredConfigKeys`);
  }

  for (const requiredConfigKey of requiredConfigKeys) {
    if (!config[requiredConfigKey]) {
      throw new Error(`Expected config to contain ${requiredConfigKeys}`);
    }
    if (typeof config[requiredConfigKey] !== 'string') {
      throw new Error(
        `Expected config['${requiredConfigKey}'] to be of type string`,
      );
    }
  }

  let configString = 'export const envs = {\n';

  for (const [key, value] of Object.entries(config)) {
    configString += `\t${key}: "${value}",\n`;
  }

  configString += '};';

  console.log(
    'writing config',
    configString,
    `to file: ${generatedConfigPath}`,
  );
  await mkdir(dirname(generatedConfigPath), {recursive: true});
  await writeFile(generatedConfigPath, configString);
}
