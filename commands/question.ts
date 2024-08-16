import { Command } from "./mod.ts";
import { AppMention, slack } from "../lib/slack.ts";

export const questionCommand: Command<AppMention> = {
  matcher: (msg) => /^<@.+> question$/.test(msg),
  handler: async (event) => {

    //From chat-gpt
    const questions = [
        "What project are you currently working on that excites you the most?",
        "How did you get started in software development?",
        "What's your favorite programming language, and why?",
        "What’s the most interesting problem you’ve solved recently?",
        "Which tool or framework can’t you live without?",
        "Do you prefer working on frontend, backend, or full-stack development?",
        "What’s the best piece of coding advice you’ve ever received?",
        "What’s a tech challenge you’re currently facing?",
        "Which open-source projects do you contribute to, or which ones do you follow?",
        "What’s the most exciting new technology or trend in software development you’re keeping an eye on?",
        "Do you have a favorite coding resource or blog you’d recommend to others?",
        "How do you stay motivated during tough coding sessions?",
        "What’s a non-tech hobby that helps you unwind from coding?",
        "What’s your favorite code editor or IDE, and why?",
        "What’s the most interesting or unusual place you’ve ever coded from?"
    ]

    const text = questions[Math.floor(Math.random()*questions.length)];

    
    await slack.chat.postMessage({
      channel: event.channel,
      text: text,
    });

    
    
  },
  name:"question",
  helpText:"Chooses from a list of questions to ask as conversation starters"
};
