module.exports.config = {
  name: "joinNoti",
  eventType: ["log:subscribe"],
  version: "1.0.1",
  credits: "Mirai Team",
  description: "Thông báo bot hoặc người vào nhóm",
  dependencies: {
    "fs-extra": ""
  }
};

module.exports.run = async function({ api, event, Users }) {
  const { threadID } = event;

  if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
    api.changeNickname(`[ ${global.config.PREFIX} ] • ${(!global.config.BOTNAME) ? "Made by CatalizCS and SpermLord" : global.config.BOTNAME}`, threadID, api.getCurrentUserID());
    api.sendMessage(`[╓┈♔◦☓◦☙◦♔◦☙◦☓◦♔┈╖
𝘾𝙊𝙉𝙉𝙀𝘾𝙏𝙀𝘿 𝙎𝙐𝘾𝘾𝙀𝙎𝙎𝙁𝙐𝙇𝙇𝙔
╙┈♔◦☓◦☙◦♔◦☙◦☓◦♔┈╜
]`, threadID);
  } else {
    try {
      const { createReadStream, existsSync, mkdirSync } = global.nodemodule["fs-extra"];
      const { threadName, participantIDs } = await api.getThreadInfo(threadID);

      const nameArray = [];
      const mentions = [];
      const memLength = [];
      let i = 0;

      for (const id in event.logMessageData.addedParticipants) {
        const userName = event.logMessageData.addedParticipants[id].fullName;
        nameArray.push(userName);
        mentions.push({ tag: userName, id });
        memLength.push(participantIDs.length - i++);

        if (!global.data.allUserID.includes(id)) {
          await Users.createData(id, { name: userName, data: {} });
          global.data.userName.set(id, userName);
          global.data.allUserID.push(id);
        }
      }
      memLength.sort((a, b) => a - b);

      const threadData = global.data.threadData.get(parseInt(threadID)) || {};
      let msg = "";

      if (typeof threadData.customJoin === "undefined") {
        msg = `✿—————————————— 💝✿\n𝙃𝙚𝙡𝙡𝙤: [ {name} ]\n𝙬𝙚𝙡𝙘𝙤𝙢𝙚 𝙩𝙤: [ {threadName} ]\n𝙮𝙤𝙪 𝙖𝙧𝙚 𝙖 𝙙𝙚𝙥𝙖𝙧𝙩𝙢𝙚𝙣𝙩 𝙢𝙚𝙢𝙗𝙚𝙧: [ {soThanhVien} ]\n𝙖𝙙𝙙𝙚𝙙 𝙗𝙮: [ {author} ]\n𝙒𝙞𝙨𝙝 𝙮𝙤𝙪 𝙝𝙖𝙫𝙚 𝙖 𝙣𝙞𝙘𝙚 𝙙𝙖𝙮\n✿——————————————✿`;
      } else {
        msg = threadData.customJoin;
      }

      const getData = await Users.getData(event.author);
      const nameAuthor = typeof getData.name === "undefined" ? "link join" : getData.name;

      const time = require("moment-timezone").tz("Asia/Ho_Chi_Minh");
      const gio = time.format("HH");
      const moment = require("moment-timezone");
      const bok = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY" || "HH:mm:ss");

      let get = "";
      if (gio >= 5) get = "𝙈𝙤𝙧𝙣𝙞𝙣𝙜";
      if (gio >= 11) get = "𝙉𝙤𝙤𝙣";
      if (gio >= 14) get = "𝘼𝙛𝙩𝙚𝙧𝙣𝙤𝙤𝙣";
      if (gio >= 19) get = "𝙀𝙫𝙚𝙣𝙞𝙣𝙜";

      msg = msg
        .replace(/\{name}/g, nameArray.join(", "))
        .replace(/\{type}/g, memLength.length > 1 ? "𝙮𝙤𝙪" : "𝙁𝙧𝙞𝙚𝙣𝙙")
        .replace(/\{soThanhVien}/g, memLength.join(", "))
        .replace(/\{threadName}/g, threadName)
        .replace(/\{get}/g, get)
        .replace(/\{author}/g, nameAuthor)
        .replace(/\{bok}/g, bok);

      const path = require("path");
      const pathGif = path.join(__dirname, "cache", "joinGif", `${1}.mp5`);

      if (existsSync(pathGif)) {
        formPush = { body: msg, attachment: createReadStream(pathGif), mentions };
      } else {
        formPush = { body: msg, mentions };
      }

      if (existsSync(pathGif)) {
        formPush = { body: msg, attachment: createReadStream(pathGif), mentions };
      } else {
        formPush = { body: msg, mentions };
      }

      return api.sendMessage(formPush, threadID);
    } catch (e) {
      console.log(e);
    }
  }
};