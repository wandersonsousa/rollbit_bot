const send = (webhook, skinName, skinPrice, skinImageUrl) => {
    console.log(webhook, skinName, skinPrice, skinImageUrl)
    $.ajax({
        type: 'POST',
        // The webhook URL.
        url: webhook,
        // Message data.
        data: {
            "embeds":[{
                "title":"Nova Skin Comprada !","image":{
                    "url":"https://www.google.com"
                },"fields":[{"name":"Nome","value":"ak9999","inline":true},{"name":"Preço","value":12312323,"inline":true}]}]
                
        },
        // Content type.
        contentType: 'application/json',
        // Success callback.
        success: function (data) {
            console.log('Sucesso ao enviar mensagem para discord.')
            },
        // Error callback.
        error: function (data) {
            alert(data.responseText);
        }
    });

}


/*

embeds: [{
      // Embed title - link on 2nd row.
      title: 'Title',
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










    embeds: [{
                title: "Nova Skin Comprada !",
                image: {
                    url: skinImageUrl || ''
                },
                fields: [
                    {
                        name: "Nome",
                        value: skinName || ''
                    },
                    {
                        name: "Preço",
                        value: skinPrice || ''
                    }
                ],
            }]*/