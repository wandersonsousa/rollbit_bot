const send = (skinName = '', ) => {
    $.ajax({
    type: 'POST',
    // The webhook URL.
    url: 'https://discord.com/api/webhooks/723575206420938874/WTsBpKurJR0qPhiHOSlwNUPRLhBMPZME88HnHrqXEvOqnGXnWKg4xZf94aHIxFDTx5vP',
    // Message data.
    data: JSON.stringify({
        // The username to be displayed.
        username: 'Nobody',
        // The avatar to be displayed.
        avatar_url: 'https://cdn.discordapp.com/avatars/411256446638882837/9a12fc7810795ded801fdb0401db0be6.png',
        // Contents of the message to be sent.
        content: 'Nova Skin Comprada',
        // Embeds to be sent.
        embeds: [{
        // Embed title - link on 2nd row.
        title: skinName,
        // Embed description - text on 3rd row.
        description: 'Description',
        // Link for title and thumbnail.
        url: 'https://gist.github.com/TheDragonRing/ea61c8d21db17913a43da92efe0de634',
        // Decimal number colour of the side of the embed.
        color: 11730954,
        // Embed image - picture below description (and fields).
        image: {
            url: 'https://cdn.discordapp.com/avatars/411256446638882837/9a12fc7810795ded801fdb0401db0be6.png'
        },
        // Embed author - icon next to text at top (text is a link).
        author: {
            name: 'TheDragonRing',
            url: 'https://thedragonring.me',
            icon_url: 'https://avatars0.githubusercontent.com/u/16874139'
        },
        // Embed thumbnail - small image in top right corner.
        thumbnail: {
            url: 'https://cdn.discordapp.com/avatars/411256446638882837/9a12fc7810795ded801fdb0401db0be6.png'
        },
        // Custom embed fields with a bold title/name, and normal content/value below title - located below description, above image.
        fields: [{
            name: 'Field',
            value: 'Field value'
        }],
        // Embed footer - icon next to text at bottom.
        footer: {
            text: 'Footer',
            icon_url: 'https://cdn.discordapp.com/avatars/411256446638882837/9a12fc7810795ded801fdb0401db0be6.png'
        }
        }]
    }),
    // Content type.
    contentType: 'application/json',
    // Success callback.
    success: function (data) { },
    // Error callback.
    error: function (data) {
        alert(data.responseText);
    }
    });

}