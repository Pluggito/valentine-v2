interface GenerateMessageParams {
  yourName: string;
  relationship: string;
  theirName: string;
  boldness: "safe" | "medium" | "unhinged";
  unhingedType?: "raw" | "fantasy";
}

const messages = {
  Brozone: {
    safe: [
      `Hey {their_name}, I just wanted to say you're the best homie anyone could ask for. Your friendship means everything to me. Happy Valentine's Day! 🤝`,
      `To {their_name}: Thanks for being the ultimate bro. You've got my back no matter what. Here's to more legendary moments together! 💪`,
      `{their_name}, you're like the brother I never had. Grateful for all the laughs and good times. Let's keep being awesome together! 🎉`,
    ],
    medium: [
      `You know {their_name}, being your friend is actually the best thing that happened to me. Not in a weird way—just saying you're genuinely the coolest person I know. 😌`,
      `Real talk: You make everything more fun. Whether we're doing nothing or everything, it's always better with you around. Appreciate you, bro! 🙌`,
      `{their_name}, I don't say it enough, but you genuinely matter to me. You're the kind of friend that makes life actually worth living. 🫡`,
    ],
    unhinged: [
      {
        raw: [
          `{their_name}, you're my ride-or-die and I need you to know how much you mean to me. No cap. 🙌`,
        ],
        fantasy: [
          `In another life, {their_name}, we're running a legendary crew. I'm glad we're doing that in this one too. 🚀`,
        ],
      },
    ],
  },
  Friends: {
    safe: [
      `To my favorite friend {their_name}: You're the person who makes my life infinitely better just by existing. Thank you for everything. 💖`,
      `{their_name}, you're not just my friend, you're my person. Here's to the moments that matter and the memories we'll make. 🌟`,
      `Thanks for being the kind of friend who just gets me. No explanations needed. You're truly one of a kind. 💝`,
    ],
    medium: [
      `Okay {their_name}, let me be honest—you've ruined me for other friendships because now everyone else feels boring. You're just different. In the best way. 😌`,
      `I think we're soulmates... just the platonic kind. Honestly the best kind. You complete me in ways that shouldn't be possible. 🔮`,
      `{their_name}, you've seen me at my absolute worst and you still stick around. That's true friendship. I'm keeping you forever. 🫶`,
    ],
    unhinged: [
      {
        raw: [
          `{their_name}, real talk—you're the most important person in my life. I'd do absolutely anything for you, no questions asked. 🫂`,
        ],
        fantasy: [
          `We're the kind of friends that are basically soulmates. Cosmic connection, {their_name}. That's what we have. 🌌`,
        ],
      },
    ],
  },
  Crush: {
    safe: [
      `{their_name}, I've been meaning to tell you—you make my heart race in the best way. There's something special about you that I can't ignore. 💕`,
      `You've been on my mind a lot lately. I think you might be someone really special to me, and I'd love to explore that. 🌹`,
      `This might be the hardest and easiest thing I've ever done—telling you that I really like you. You make me want to be braver. 💘`,
    ],
    medium: [
      `{their_name}, I need to be honest with you. You're driving me a little crazy in the most amazing way. I like you. Like, really like you. 😏`,
      `Fair warning: You've completely taken up residence in my thoughts and I'm not even mad about it. I have a serious crush on you. Is that clear enough? 😌`,
      `You know that feeling when someone just fits? That's you. I'm pretty sure I'm falling for you, and I thought you should know. 💗`,
    ],
    unhinged: [
      {
        raw: [
          `{their_name}, I'm obsessed with you. Like dangerously so. Every part of you makes me lose my mind. I need to know if you feel even half of what I feel. 🔥`,
          `You're all I think about. Your laugh, your energy, the way you move—it's all driving me absolutely insane. I need you to know how badly I want you. 🌶️`,
          `{their_name}, I'm not good at playing it cool. You consume my every thought. I want you. All of you. Can we stop pretending there's nothing here? 😈`,
        ],
        fantasy: [
          `In another lifetime, {their_name}, we're already together. But I don't want to wait for another lifetime. I want to be yours in this one. 📖✨`,
          `I keep imagining a world where you're mine and I'm yours. Where every moment is like the ones I dream about. {their_name}, I want that story with you. 💭`,
          `You're the main character in all my best daydreams, {their_name}. But I'd rather live reality with you than fantasize any longer. 🌙`,
        ],
      },
    ],
  },
  Lovers: {
    safe: [
      `{their_name}, loving you is the easiest and best decision I've ever made. You make every day feel like a gift. 💖`,
      `To my love: You're everything I've ever wanted and more. Thank you for choosing me, every single day. 💕`,
      `{their_name}, I fall for you all over again when I look at you. You're my favorite person and my greatest adventure. 💝`,
    ],
    medium: [
      `I'm completely and totally obsessed with you {their_name}. You're my person, my love, my everything. I'm so lucky you're mine. 😌`,
      `Falling asleep next to you is my favorite thing. Waking up to you is my second favorite. Everything with you is exactly how it should be. 🌙`,
      `You've made me believe in forever, {their_name}. I want every single day with you, for the rest of my life. 💗`,
    ],
    unhinged: [
      {
        raw: [
          `{their_name}, I want you in every way possible. Right now, tomorrow, always. You drive me absolutely insane and I never want it to stop. 🔥💔`,
          `The way you look at me, touch me, make me feel—it's intoxicating. I could spend every moment of every day tangled up with you. 😈`,
          `I'm yours completely, {their_name}. Every part of me belongs to you. I need you like I need oxygen. 🌶️`,
        ],
        fantasy: [
          `In every universe, every lifetime, every possible reality—I choose you. You're my soul's destination, {their_name}. 🌌✨`,
          `We were written in the stars, {their_name}. This love we have—it's eternal, cosmic, exactly as it was meant to be. 🌙💫`,
          `You're the greatest magic I've ever known, {their_name}. Our love is the most beautiful spell ever cast. 📖✨`,
        ],
      },
    ],
  },
  Situationship: {
    safe: [
      `{their_name}, whatever this is between us—I'm grateful for it. You mean more to me than you might realize. 💫`,
      `This might be complicated, but one thing's clear: you matter to me. I wanted to say that today. 💙`,
      `{their_name}, I'm not sure what we are, but I know what I feel. And that's something worth acknowledging. 🌙`,
    ],
    medium: [
      `This might sound crazy, but I think we could be something real, {their_name}. Stop me if I'm wrong, but I feel something. Something good. 😌`,
      `Whatever we're doing, it's become the best part of my life. I'm tired of pretending it doesn't matter or that I don't feel anything. You get it. 💭`,
      `I know this is messy and undefined, but {their_name}, I'm starting to think I want to define it with you. What do you say? 💗`,
    ],
    unhinged: [
      {
        raw: [
          `{their_name}, I'm tired of whatever this is if it doesn't lead to you being completely mine. I want you, fully, no games. Do you want me like that too? 🔥`,
          `You've got me wrapped around your finger and honestly, I don't want out. I want all of you. The real thing. Not whatever this is. 😈`,
          `Stop keeping me guessing, {their_name}. Tell me you want this as badly as I do. Tell me we're not just a situationship—we're something real. 🌶️`,
        ],
        fantasy: [
          `I keep imagining us together properly—no more questions, no more uncertainty. Just us, real and raw and beautiful. {their_name}, let's stop imagining. 📖✨`,
          `In my dreams, we're a actual thing. No complications, just two people who are completely certain about each other. I want that reality with you. 🌙💫`,
          `You're the one my soul keeps coming back to, {their_name}. Maybe it's time we stopped fighting it and gave this thing the real chance it deserves. 💭✨`,
        ],
      },
    ],
  },
};

export function generateValentineMessage(
  params: GenerateMessageParams,
): string {
  const { yourName, relationship, theirName, boldness, unhingedType } = params;

  const relationshipMessages = messages[relationship as keyof typeof messages];
  if (!relationshipMessages) {
    return "Unable to generate message. Please select a valid relationship type.";
  }

  let messageList: string[];

  if (boldness === "unhinged" && unhingedType) {
    const unhingedMessages = relationshipMessages.unhinged as Array<{
      raw: string[];
      fantasy: string[];
    }>;
    if (!unhingedMessages || unhingedMessages.length === 0) {
      messageList = relationshipMessages.safe;
    } else {
      messageList = unhingedMessages[0][unhingedType];
    }
  } else if (boldness === "medium") {
    messageList = relationshipMessages.medium;
  } else {
    messageList = relationshipMessages.safe;
  }

  const selectedMessage =
    messageList[Math.floor(Math.random() * messageList.length)];

  return selectedMessage
    .replace("{their_name}", theirName)
    .replace("{your_name}", yourName || "Someone who cares");
}
