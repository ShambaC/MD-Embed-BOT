module.exports = async (client) => {
    console.log(`Logged to the client ${client.user.username}\n-> Ready on ${client.guilds.cache.size} servers`);

    client.user.setActivity(client.config.app.playing, { type: client.config.app.type});
};