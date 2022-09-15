const fs = require('fs');
const activeEnv = process.env.ACTIVE_ENV || 'development';

const env = require('dotenv').config({
  path: `.env.${activeEnv}`,
});

const createEnvFile = () => {
  return new Promise((resolve, reject) => {
    fs.writeFile('src/environment.ts', `export default ${JSON.stringify(env.parsed)}`, 'utf8', (error) => {
      return error ? reject(error) : resolve();
    });
  });
};

module.exports = createEnvFile;