const send = (webhook, skinName, skinPrice, skinImageUrl) => {
    var data = JSON.stringify(
        {
          embeds: [{
          // Embed title - link on 2nd row.
          title: 'Nova Skin comprada',
          // Link for title and thumbnail.
          url: 'https://www.rollbit.com',
          // Decimal number colour of the side of the embed.
          color: 11730954,
          // Embed image - picture below description (and fields).
          image: {
            url: skinImageUrl.trim() || 'https://cdn.discordapp.com/avatars/411256446638882837/9a12fc7810795ded801fdb0401db0be6.png'
          },
          // Embed author - icon next to text at top (text is a link).
          author: {
            name: 'Rollbit Bot',
          },
          // Custom embed fields with a bold title/name, and normal content/value below title - located below description, above image.
          fields: [
            {
              name: 'Nome',
              value: skinName || 'nome_desconhecido'
            },
            {
              name: 'Preço',
              value: skinPrice || 'preco_desconhecido'
            }
          ],
        }]
      }
    );

  console.log(data);

  $.ajax({
    type: 'POST',
    // The webhook URL.
    url: webhook,
    // Message data.
    data: data,
    // Content type.
    contentType: 'application/json',
    // Success callback.
    success: function (data) {
      console.log(data)
    },
    // Error callback.
    error: function (data) {
      alert(data.responseText);
    }
  });
















}