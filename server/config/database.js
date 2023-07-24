module.exports = ({ env }) => ({
  connection: {
    client: env("DATABASE_TYPE", "mysql"),
    connection: {
      host: env("DATABASE_HOST", "localhost"),
      port: env.int("DATABASE_PORT", 3306),
      database: env("DATABASE_NAME", "server"),
      user: env("DATABASE_USERNAME", "root"),
      password: env("DATABASE_PASSWORD", "145236Nhan"),
      ssl: env.bool("DATABASE_SSL", false),
    },
  },
});
