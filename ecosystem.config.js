module.exports = {
    apps: [
        {
            name: 'vue-panel',
            exec_mode: 'cluster',
            instances: 'max', // Or a number of instances
            script: "./node_modules/@vue/cli-service/bin/vue-cli-service.js",
            args: "serve",
            // script: "npm run start",
            env: { "HOST": "127.0.0.1", "PORT": 8080, "NODE_ENV": "local", }
        }
    ]
}