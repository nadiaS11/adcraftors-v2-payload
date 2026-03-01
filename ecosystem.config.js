module.exports = {
  apps: [
    {
      name: "nadiasultana",
      script: "npm",
      args: "start",
      cwd: "/var/www/nadiasultana/current",
      env: {
        NODE_ENV: "production",
        PORT: 3001, // Different port from your first project
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
    },
  ],
}
