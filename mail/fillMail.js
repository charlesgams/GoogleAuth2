const axios = require("axios");

const fillMail = async (messages, userId, accessToken) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

  const baseUrl = "https://gmail.googleapis.com/gmail/v1/users";
  let mails = [];

  return await new Promise((resolve, reject) => {
    messages.forEach(async (message, index) => {
      const content = await axios
        .get(
          `${baseUrl}/${userId}/messages/${message.id}?fields=snippet,payload.headers`
        )
        .then((res) => res)
        .catch((err) => err);

      const fromIndex = content.data.payload.headers.findIndex(
        (header) => header.name == "From"
      );

      const subjectIndex = content.data.payload.headers.findIndex(
        (header) => header.name == "Subject"
      );

      mails.push({
        index,
        from: content.data.payload.headers[fromIndex].value,
        subject: content.data.payload.headers[subjectIndex].value,
        snippet: content.data.snippet,
      });

      mails.length == messages.length ? resolve(mails) : null;
    });
  });
};

module.exports = fillMail;
