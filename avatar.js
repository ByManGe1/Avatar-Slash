const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Muestra el avatar de un usuario')
        .addUserOption(option =>
            option.setName('usuario')
                .setDescription('Usuario del que quieres ver el avatar')
        ),
    async execute(interaction) {
        try {
            // Obtener el usuario mencionado o el autor del comando
            const user = interaction.options.getUser('usuario') || interaction.user;

            // Crear un objeto MessageEmbed para mostrar el avatar
            const embed = {
                title: `Avatar de ${user.tag}`,
                image: { url: user.displayAvatarURL({ dynamic: true, size: 256 }) },
                color: 0x00ff00,
            };

            // Responder con el avatar
            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Error al ejecutar el comando:', error);
            await interaction.reply('Hubo un error al ejecutar el comando.');
        }
    },
};
