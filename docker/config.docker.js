function getEnv(envVariable) {
  return process.env[envVariable];
}

const database_name = 'EXP_CONFIG_DATABASE_NAME';
const db_host = 'EXP_CONFIG_DATABASE_HOST';
const db_port = 'EXP_CONFIG_DATABASE_PORT';
const secret_key = 'EXP_CONFIG_SECRET_KEY';
const expiry_time = 'EXP_CONFIG_EXPIRY_TIME';
const project_port = 'EXP_CONFIG_PROJECT_PORT';

var defaultConfig = {
	database_name : 'expense',
	db_host: 'localhost',
	db_port: 27017,
	secret_key: 'note-app',
	expiry_time: 3600,
	project_port: 9052
};

module.exports = {
	DATABASE : getEnv(database_name) || defaultConfig.database_name,
	DB_HOST: getEnv(db_host) || defaultConfig.db_host,
	DB_PORT: getEnv(db_port) || defaultConfig.db_port,
	SECRET_JWT_KEY: getEnv(secret_key) || defaultConfig.secret_key,
	TOKEN_EXPIRATION_TIME: getEnv(expiry_time) || defaultConfig.expiry_time,
	PROJECT_PORT: getEnv(project_port) || defaultConfig.project_port
};
