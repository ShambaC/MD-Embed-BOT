const MFA = require('mangadex-full-api');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = (client, message) => {
    if (message.author.bot || message.channel.type === 'dm') return;

    const prefix = client.config.app.px;

    if (message.content.indexOf(prefix) !== 0)
    {
        const words = message.content.split(' ');
        let reg = new RegExp('https://mangadex.org/');
        const matchindex = words.findIndex(value => reg.test(value));
        if( matchindex == -1)
        {
            return;
        }
        else
        {
            const embed = new MessageEmbed();

            MDUser = client.config.MDopt.Username;
            MDpass = client.config.MDopt.Password;

            const link = words[matchindex];
            const linksplit = link.split('/');
            const linktype = linksplit[3];
            if(linktype == 'chapter')
            {
                MFA.login(MDUser, MDpass, './bin/.md_cache').then(async () => {
                    let chapter = await MFA.Chapter.get(linksplit[4]);

                    var chapter_no = chapter.chapter;
                    var mangaid = chapter.manga.id;

                    let manga = await MFA.Manga.get(mangaid);

                    const manga_name = manga.title;
                    const manga_desc = manga.description.substr(0, 390) + '...';

                    let manga_cover_arr = await manga.getCovers();
                    var manga_cover = manga_cover_arr[0].image512;

                    //console.log(chapter.manga.id);
                    embed.setColor('RED');
                    embed.setTitle(manga_name);
                    embed.setURL(link);
                    embed.setDescription(manga_desc);
                    embed.setImage(manga_cover);
                    embed.setTimestamp();
                    embed.setFooter('Made with heart by ShambaC ❤️', message.author.avatarURL({ dynamic: true }));

                    //Create Cubari link
                    const cubarikink = 'https://cubari.moe/read/mangadex/' + mangaid + '/' + chapter_no + '/1/';

                    const MDlinkButton = new MessageButton();
                    MDlinkButton.setLabel('Chapter link to MD');
                    MDlinkButton.setStyle('LINK');
                    MDlinkButton.url = link;

                    const CubariLinkButton = new MessageButton();
                    CubariLinkButton.setLabel('Chapter link to Cubari');
                    CubariLinkButton.setStyle('LINK');
                    CubariLinkButton.url = cubarikink;

                    const row = new MessageActionRow().addComponents(MDlinkButton, CubariLinkButton);

                    message.channel.send({ embeds: [embed], components: [row] });
                    
                }).catch(console.error);
            }
            else if(linktype == 'title')
            {
                MFA.login(MDUser, MDpass, './bin/.md_cache').then(async () => {
                    let manga = await MFA.Manga.get(linksplit[4]);

                    const manga_name = manga.title;
                    const manga_desc = manga.description.substr(0, 390) + '...';

                    let manga_cover_arr = await manga.getCovers();
                    var manga_cover = manga_cover_arr[0].image512;

                    embed.setColor('RED');
                    embed.setTitle(manga_name);
                    embed.setURL(link);
                    embed.setDescription(manga_desc);
                    embed.setImage(manga_cover);
                    embed.setTimestamp();
                    embed.setFooter('Made with heart by ShambaC ❤️', message.author.avatarURL({ dynamic: true }));

                    //Create Cubari link
                    const cubarikink = 'https://cubari.moe/read/mangadex/' + linksplit[4] + '/';

                    const MDlinkButton = new MessageButton();
                    MDlinkButton.setLabel('Manga link to MD');
                    MDlinkButton.setStyle('LINK');
                    MDlinkButton.url = link;

                    const CubariLinkButton = new MessageButton();
                    CubariLinkButton.setLabel('Manga link to Cubari');
                    CubariLinkButton.setStyle('LINK');
                    CubariLinkButton.url = cubarikink;

                    const row = new MessageActionRow().addComponents(MDlinkButton, CubariLinkButton);

                    message.channel.send({ embeds: [embed], components: [row] });
                    
                }).catch(console.error);
            }
            else
            {
                return;
            }
        }
    }
    else
    {
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();

        const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));

        if (cmd) cmd.execute(client, message, args);
    }

    
};