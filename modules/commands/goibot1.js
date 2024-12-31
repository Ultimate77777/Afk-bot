const fs = require('fs');
const path = require('path');
const stringSimilarity = require('string-similarity');
const { simi } = require('./../../lib/sim.js'); // Thay đường dẫn tới mã mới của bạn

module.exports.config = {
    name: 'goibot1',
    version: '1.1.1',
    hasPermssion: 0,
    credits: 'DC-Nam',
    description: 'Trò truyện cùng simi chat',
    commandCategory: 'Admin',
    usages: '[hey simi]',
    cooldowns: 2,
};

module.exports.run = () => {};

module.exports.handleEvent = async function({ api, event }) {

var hm = [
  "Yes baby ko💓","yes my wife","Hey bot 🌸","What's wrong","do you love me","Do you need something from me?", "💞 I'm listening","Here I am","Hmmmm", "Don't spam me, please :<<", "Don't make me angry!!!","Did you call the bot for something?", "Stop calling me -.-","Focus on your studies","Bae, have you eaten?","Looking for jowa", "If you're feeling lonely,we can pair up :3","What are you doing?","Well done :)))","Will you be my husband?","Go play somewhere else","What happened, my princess?","Is there anything to eat? I'm so hungry :(((","Do you love me?","What's wrong with you?","You're the best!!!","Why are you calling me so much? Do you like me or what? :v","Why wait, wify? I'm hereee","Why did you say such things to me, huh?","Boiled corn, let's gooo",   "I love you so much ^^","Short little piggy :))","Wait a bit. Going to poop :()","500k for the room!!!","I love you to madness ^^","Always remember, never underestimate others\n'wa man bu di a'","Are you yelling at me?\nWhy are you speaking so loudly?","Give me back my pants, huhu","I love you 3000 <3","I laugh, I go to poop","Remember, every love story has an ending","Roses bloom all seasons...","Lalalalaaaa","Don't love someone too much when you're still hurt!","Bae, I’m like a flower. But people are hurting me 💔","Raising you to eat later ~~","Overnight?","Call my admin to feel loved <3","Sing for me and I'll give you candy 🍭","What do you need, wife?","Yes~~~~", "What’s up, did you call me? :3","Yes, I’m here :>","What's wrong, my dear bae? :>","What's wrong, princess?",":)))","If one day you call me and I don’t respond, it means the bot's account has been locked ;-;","I’m here","Hello, I’m TatsuYTB’s bot","What’s up, wife?","Use #callad to contact the admin!","Here I am~~~~","I love you the most","Yes","What’s wrong, my little princess?","Yamete...","Looking for a helicopter pilot, anyone wants me?","Are you lonely? Let me chat with you","Do you love me? I'm desperate!!!","The bot is cute just like its owner","Don’t praise me, I’m shy hehe","Will you marry me?","Oh, don’t","The bot already has a wife","Who wants to be my wife?","Huh?","Don’t spam the bot, okay?","Do you love me?","Your wife is here", "Second only to my master, no one else is number one","Be my wife","My master is handsome and well-endowed UwU", "Love you all :3","Looking for a lover, come on guys :3","Take me to the bed...","Love me until old age"]
    var t = hm[Math.random()*hm.length << 0];
    if (['bot', 'hi bot', 'bot where', 'bot off', 'bot yeah', 'bot genuine', 'Call everyone to interact bot', 'Hello bot', 'hello bot', 'sim', 'sim yeah', 'bye bot, ' , 'bot where'].includes(event.body.toLowerCase())) {
        api.sendMessage({body: `${t} `}, event.threadID, (err, data) => global.client.handleReply.push({ name: this.config.name, messageID: data.messageID }), event.messageID);
    };
};

module.exports.handleReply = async function({ handleReply: $, api, event }) {
    const response = simi('ask', event.body); // Sử dụng hàm simi từ mã mới
    if (response.error) return api.sendMessage(`${response.error}`, event.threadID, (err, data) => global.client.handleReply.push({ name: this.config.name, messageID: data.messageID }), event.messageID);
    else api.sendMessage({ body: `${response.answer} ` }, event.threadID, (err, data) => global.client.handleReply.push({ name: this.config.name, messageID: data.messageID }), event.messageID);
};