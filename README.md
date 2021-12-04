# MD Embed BOT

THe complete source code for the discord BOT MDEmbed.

This BOT looks for MangaDex links in messages and creates a better looking embed for it as the current MD embed is quite bland.

You can invite this bot to your server by clicking [here](https://discord.com/api/oauth2/authorize?client_id=916308047259918356&permissions=275414797312&scope=bot%20applications.commands).

*You can contact me at discord via ShambaC#3440 for help*

### Configuration

Open the configuration file located in the main folder `config.js`.

```js
module.exports = {
    app: {
        px: 'BOT prefix',
        token: 'BOT token here',
        playing: 'activity',
        type: 'Activity type',
    },

    MDopt: {
        Username: 'mangadex username',
        Password: 'mangadex password',
    }
};
```

Bot configuration

- `app/px`, the prefix that will be set to use the bot
- `app/token`, the token of the bot available on the [Discord Developers](https://discordapp.com/developers/applications) section
- `app/playing`, the activity of the bot
- `app/type`, type of the activity status //PLAYING, STREAMING, LISTENING, WATCHING, CUSTOM, COMPETING

Mangadex credentials configuration

- `MDopt/Username`, your mangadex username ( Account you want to use with the bot, preferably a separate one from your main account )
- `MDopt/Password`, password for the account username mentioned above

### Installation

You need [Node JS](https://nodejs.org/en/) (v16) for running this bot.

- Run the `install.bat` file to install the necessary dependencies.
- Run the `start.bat` file to start the bot.

### Extras

You might want to add an invite link for your bot to the invite commands. Replace appropriate places with your invite link in `invite.js` and `about.js`.

### Credits

Made by ShambaC with ❤️