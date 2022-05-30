const { override, overrideDevServer, addWebpackPlugin } = require("customize-cra");

const devServerConfig = () => (config) => {
    return { ...config, devMiddleware: { writeToDisk: true } };
};

module.exports = {
    devServer: overrideDevServer(devServerConfig()),
};
