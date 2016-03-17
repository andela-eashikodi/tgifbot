var Botkit = require('botkit'); // require botkit module  
var config = require('./config');
var moment = require('moment');
var token = process.env.SLACK_TOKEN || config.SLACK_TOKEN; // get slack token passed as variable

// Setup new slackbot with botkit
var controller = Botkit.slackbot({  
  debug: false
})

// Check that token was passed
if (!token) {  
  console.error('SLACK_TOKEN is required')
}

// Start Slack’s Bot Real Time Messaging API (RTM)
controller.spawn({
  token: token
}).startRTM(function(err, bot , payload) {
  if (err) {
    throw new Error(err)
  }
});

var lines = [
  "I love deadlines. I love the whooshing noise they make as they go by.",
  "I like work: it fascinates me. I can sit and look at it for hours.",
  "I always arrive late at the office, but I make up for it by leaving early.",
  "In the name of God, stop a moment, cease your work, look around you.",
  "When we worked, we really worked. But when we played, we really PLAYED.",
  "There is nothing either good or bad, but thinking makes it so.",
  "There is more to life than increasing its speed.",
  "The greatest weapon against stress is our ability to choose one thought over another.",
  "Brain cells create ideas. Stress kills brain cells. Stress is not a good idea.",
  "Tension is who you think you should be. Relaxation is who you are.",
  "Unnatural work produces too much stress.",
  "Stress is basically a disconnection from the earth, a forgetting of the breath. Stress is an ignorant state. It believes that everything is an emergency. Nothing is that important. Just lie down.",
  "Every stress leaves an indelible scar, and the organism pays for its survival after a stressful situation by becoming a little older.",
  "At times of great stress it is especially necessary to achieve a complete freeing of the muscles.",
  "One of the symptoms of an approaching nervous breakdown is the belief that one's work is terribly important.",
  "The field of consciousness is tiny. It accepts only one problem at a time.",
  "A poor life this if, full of care, we have no time to stand and stare.",
  "A crust eaten in peace is better than a banquet partaken in anxiety.",
  "Both poverty and riches are the offspring of thought.",
  "You can argue with reality, and you only lose 100% of the time...",
  "Slow down and everything you are chasing will come around and catch you.",
  "Don't let your mind bully your body into believing it must carry the burden of its worries.",
  "How beautiful it is to do nothing, and then to rest afterward.",
  "Sometimes the most important thing in a whole day is the rest we take between two deep breaths.",
  "If you are distressed by anything external, the pain is not due to the thing itself, but to your estimate of it; and this you have the power to revoke at any moment.",
  "When you find yourself stressed, ask yourself one question: Will this matter in 5 years from now? If yes, then do something about the situation. If no, then let it go.",
  "It makes no sense to worry about things you have no control over because there's nothing you can do about them, and why worry about things you do control? The activity of worrying keeps you immobilized.",
  "Everything that irritates us about others can lead us to an understanding of ourselves.",
  "It seems that we have it backward in our society. We tend to look up to people who are under a great deal of stress.",
  "Never let stress get in the way of a good day",
  "Would you rather be right or free?",
  "Whenever you feel stress, work is filing-up and people around you are obnoxious, insensitive and just-looking out for themselves ..what to do? ",
  "Always laugh when you can. It is cheap medicine",
  "It's what's right with you that fixes whats wrong",
  "For fast-acting relief, try slowing down.",
  "The time to relax is when you don't have time for it.",
  "Did you know stressed is desserts spelled backwards?!",
  "I try to take one day at a time, but sometimes several days attack me at once.",
  "what you’re needing is not to be in a different place but to be a different person.",
  "Where'd the days go, when all we did was play? And the stress that we were under wasn't stress at all just a run and a jump into a harmless fall",
  "We must have a pie. Stress cannot exist in the presence of a pie.",
  "Friends are the family you choose",
  "Only the dead have seen the end of stress.",
  "I've never fooled anyone. I've let people fool themselves. They didn't bother to find out who and what I was. Instead they would invent a character for me. I wouldn't argue with them. They were obviously loving somebody I wasn't.",
  "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.",
  "Insanity is doing the same thing, over and over again, but expecting different results.",
  "All you need is love. But a little chocolate now and then doesn't hurt.",
  "Whenever I feel the need to exercise, I lie down until it goes away.",
  "I'm not afraid of death; I just don't want to be there when it happens.",
  "I find television very educating. Every time somebody turns on the set, I go into the other room and read a book.",
  "The golden rule of work is that the bosses jokes are ALWAYS funny."
];

var askOut;
var isFriday = moment().add(1, 'hour').day() === 5;

var getRandomKey = function() {
  var index = Math.floor(Math.random() * lines.length);
  return lines[index];
}

var isFridayText = function() {
  if(isFriday){
    return "tonight "
  }
  else {
    return "friday evening "
  }
}

var replyRandomKey = function(bot, message) {
  var greatLine = getRandomKey();
  if(isFriday){
    askOut = " TGIF! Let's have a drink this evening. Invite that special buddy, type `@tgifbot send invite to @username` "
    bot.reply(message, greatLine + ' ' + askOut);
  }
  else {
    askOut = " Let's have a drink this friday. Invite that special buddy, type `@tgifbot send invite to @username` "
    bot.reply(message, greatLine + ' ' + askOut);
  }
}

var replyRandomAdvise = function(bot, message) {
  var greatLine = getRandomKey();
  bot.reply(message, greatLine);
}

var personaliseIntro = function(userID) {
  var username = "<@"+userID+">";
  var intros = [
    "You really love to have fun. dont you? :smirk: "+username+"",
  ];
  if(isFriday){
    intros.push("It's Friday, party people! :dancer:", "TGIF! I love fridays so much! It is my second favorite F word.", "It's Friday!! I feel so happy, I feel so fulfilled, i never experred it", "Its finally Friday! Felt like it took a week to get here!!", "Friday, is that you??????? TGIF people! :beer: ", "TGIF!... So many innocent beers have no idea what's coming for 'em.", "The way I see it, EVERY Friday is Good Friday.", "Its friday everybody! Maybe I should make a song about it.......u know, just to get the word out", "now taking reservations for midnight kisses on Friday night. Sign up below.", "I so much love the smell of Friday in the morning, it smells like... WEEKEND.");
  }
  else {
    intros.push("Wholop! "+username+"! Today isn't friday :unamused: ", ""+username+"! Face your work please :unamused: ", "I see you've set aside this special time to humiliate yourself in public.", "I'm out of my mind, but feel free to leave a message...", "I don't work here. I'm a consultant.", "I'm already visualizing the duct tape over your mouth.", "I will always cherish the initial misconceptions I had about you.", "Thank you. We're all refreshed and challenged by your unique point of view.", "The fact that no one understands you doesn't mean you're an artist.", "If I throw a stick, will you leave?", "I'm trying to imagine you with a personality.", "I heard you are among top 1%...of jobless people in the office. ", "Nigerian scammers be like: I'm a prince in Lagos, Nigeria and I want you to help me move $500 million out of the country.", "It takes patience to listen.. it takes skill to pretend you’re listening.", "I'm really easy to get along with once you people learn to see it my way.", 
    "It sounds like English, but I can't understand a word you're saying.", 
    "You are validating my inherent mistrust of strangers",
    "Do I look like a people person to you", 
    "I'll try being nicer if you'll try being more intelligent.",
    "I'd like to help you out, which way did you come in?",
    "If you have something to say raise your hand... then place it over your mouth.",
    "You're not yourself today, I noticed the improvement straight away. "
    )
  }
  var index = Math.floor(Math.random() * intros.length);
  return intros[index]
}

var sendKeyToHandler = function(bot, message) {
  var user = message.text.split("send invite to ")[1];
  var username = user.split(">")[0] + '>';
  user = user ? user.split("<@")[1] : false,
  user = user ? user.split(">")[0] : false;

  bot.startConversation(message,function(err,convo) {
      if ( !username ) {
        bot.reply(message, "Sorry I didn't get that. If you want me to send invite to someone, say `@tgifbot send invite to @username`");
        convo.stop();
      } else {
        
        bot.startPrivateConversation({user: user}, function(err, convo) {
          if(err){
            bot.reply(message, 'Hmmm! What are you tryna do?! :confused: ');
          }
          else {
            bot.reply(message, "I have sent an invite! :wink: ");
            convo.ask("Ello " + username + ", <@"+message.user+"> Invites you for a drink " + isFridayText() + " what do you say? ", function(response, convo) {
              if(response.text === 'yes' | response.text === 'Yes') {
                bot.reply(message, username+" accepted your invite :wink:");
                bot.startPrivateConversation({user: user}, function(err, convo){
                  convo.say({
                    text: "Have a wonderful friday outing :wink:"
                  })
                });
                convo.stop();
              }
              else {
                bot.startPrivateConversation({user: user}, function(err, convo){
                  convo.say({
                    text: "Boring..."
                  });
                });
                // bot.reply(message, "Boring...");
                convo.stop();
              }
            });
          }
        });
      }  
      convo.stop();
  })
}

controller.on("direct_message", function(bot, message) {

  if ( message.text.indexOf("hello") > -1 | message.text.indexOf("hi") > -1 | message.text.indexOf("hey") > -1  | message.text.indexOf("up") > -1 | message.text.indexOf("sup") > -1) {

    var reply = "Hello. I'm tgifbot, make sure you have fun " + isFridayText() + " Invite that special buddy, type `@tgifbot send invite to @username` "
    bot.reply(message, reply);

    // replyRandomAdvise(bot, message);

  } else if ( message.text.indexOf("thanks") > -1 | message.text.indexOf("thank you") > -1 ) {

    var reply = "You are welcome. Have fun! :perfecto:"
    bot.reply(message, reply);

  } else if ( message.text.indexOf("help") > -1 ) {

    var reply = "Looks like you want to have fun " + isFridayText() + "Invite that special buddy, type `@tgifbot send invite to @username` "
    bot.reply(message, reply);

  } else if ( message.text.indexOf("send invite to") > -1 ) {

    // do nothing, handled elsewhere

  } else {

    var index = Math.floor(Math.random() * lines.length);
    var greatLine = lines[index];
    bot.reply(message, greatLine);

  }
  
});


controller.on("bot_channel_join", function(bot, message) {
  var intro = "I see some workaholics here! "
  bot.reply(message, intro);
  replyRandomAdvise(bot, message);
})

controller.on("direct_mention", function(bot, message) {

  if ( message.text.indexOf("hello") > -1 | message.text.indexOf("hi") > -1 | message.text.indexOf("hey") > -1 | message.text.indexOf("up") > -1 | message.text.indexOf("sup") > -1 ) {

    var intro = personaliseIntro(message.user) + " You should have fun " + isFridayText()+" Invite that special buddy, type `@tgifbot send invite to @username` ";
    bot.reply(message, intro);
    // replyRandomKey(bot, message);

  } else if ( message.text.indexOf("thanks") > -1 | message.text.indexOf("thank you") > -1 ) {

    var reply = "Have fun buddy!"
    bot.reply(message, reply);

  } else if ( message.text.indexOf("send invite to") > -1 ) {

    sendKeyToHandler(bot, message);

  } else if ( message.text.indexOf("help") > -1 ) {

    var reply = "It looks like you want to have fun " + isFridayText() + "Invite that special buddy, type `@tgifbot send invite to @username` "
    bot.reply(message, reply);

  } else {

    var intro = personaliseIntro(message.user) + " You should have fun " + isFridayText()+" Invite that special buddy, type `@tgifbot send invite to @username` ";
    bot.reply(message, intro);
    // replyRandomAdvise(bot, message);

  }
})

controller.on("mention", function(bot, message) {

  if ( message.text.indexOf("hello") > -1 | message.text.indexOf("hi") > -1 | message.text.indexOf("hey") > -1 | message.text.indexOf("up") > -1 | message.text.indexOf("sup") > -1 ) {

    var intro = personaliseIntro(message.user) + " You should have fun " + isFridayText()+" Invite that special buddy, type `@tgifbot send invite to @username` ";
    bot.reply(message, intro);
    // replyRandomAdvise(bot, message);

  } else if ( message.text.indexOf("thanks") > -1 | message.text.indexOf("thank you") > -1 ) {

    var reply = "Have fun buddy!"
    bot.reply(message, reply);

  } else {
    var intro = personaliseIntro(message.user) + " You should have fun " + isFridayText()+" Invite that special buddy, type `@tgifbot send invite to @username` ";
    bot.reply(message, intro);
    // replyRandomAdvise(bot, message);
  }
})

controller.on("user_channel_join", function(bot, message) {
  var intro = "Sup <@"+message.user+">! Do you want to have fun " + isFridayText() + "? Make a new friend and Invite that special buddy, type `@tgifbot send invite to @username` ";
  bot.reply(message, intro);
  // replyRandomAdvise(bot, message);
})

controller.on("user_group_join", function(bot, message) {
  var intro = "Sup <@"+message.user+">! Do you want to have fun " + isFridayText() + "? Make a new friend and Invite that special buddy, type `@tgifbot send invite to @username` ";
  bot.reply(message, intro);
  // replyRandomAdvise(bot, message);
})

controller.hears(["tgif", "tgif!", ":beer:", ":beers:", "beer"], ["ambient"], function(bot, message) {
  var intro = personaliseIntro(message.user) + ". You should have fun " + isFridayText() + "Invite that special buddy, type `@tgifbot send invite to @username` ";
  bot.reply(message, intro);
})  
controller.hears(["tgifbot"], ["ambient"], function(bot, message) {
  var intro = "<@"+message.user+"> That's me. It looks like you want to have fun " + isFridayText() + "Invite that special buddy, type `@tgifbot send invite to @username` ";
  bot.reply(message, intro);
})
controller.hears(["chilling"], ["ambient"], function(bot, message) {
  var intro = "<@"+message.user+"> It looks like you want to have fun " + isFridayText() + "Invite that special buddy, type `@tgifbot send invite to @username` ";
  bot.reply(message, intro);
}) 
controller.hears(["lol", "Lol", "lmao", "haha"], ["ambient"], function(bot, message) {

  var laughing = [
    "Lawl `in abimbola's voice`", "Hilarious", ":joy:", ":laughing:", "Hahahaha", ":kanye:"
  ]

  var index = Math.floor(Math.random() * laughing.length);
  bot.reply(message, laughing[index]);
}) 


controller.hears(["send invite to"], ["direct_message", "direct_metion", "ambient"], function(bot, message) {

  sendKeyToHandler(bot, message);

}) 