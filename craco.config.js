module.exports = {
    devServer: (devServerConfig) => {
        devServerConfig.writeToDisk = true;
        return devServerConfig;
    },
};
