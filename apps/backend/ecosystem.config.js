module.exports = {
  apps: [
    {
      name: 'server',
      script: 'main.js',
      exec_mode: 'cluster',
      instances: 1,
      instance_var: 'INSTANCE_ID',
      time: true,
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
