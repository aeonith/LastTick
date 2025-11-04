/**
 * Philosophical Quote Library
 * Categorized by tone: soft, realistic, philosophical
 */

import { Tone } from './storage';

export interface Quote {
  text: string;
  author?: string;
  tones: Tone[];
}

export const QUOTES: Quote[] = [
  // Eerie & Gothic
  { text: "The clock ticks. Each second, a whisper of eternity passing.", tones: ['philosophical', 'realistic'] },
  { text: "Time is the fire in which we burn.", author: "Delmore Schwartz", tones: ['realistic', 'philosophical'] },
  { text: "Every tick is a step towards the inevitable. Make each one count.", tones: ['realistic'] },
  { text: "The shadow grows longer as the day fades.", tones: ['philosophical'] },
  { text: "In the end, we all become stories. Make yours worth telling.", tones: ['philosophical'] },
  { text: "The hourglass empties grain by grain, whether you notice or not.", tones: ['realistic', 'philosophical'] },
  { text: "We are but dust and shadow.", author: "Horace", tones: ['philosophical'] },
  { text: "Time is a ghost that haunts us all.", tones: ['philosophical'] },
  
  // Soft & Gentle
  { text: "Every moment is a fresh beginning.", author: "T.S. Eliot", tones: ['soft', 'philosophical'] },
  { text: "The present moment is filled with joy and happiness.", author: "Thích Nhất Hạnh", tones: ['soft'] },
  { text: "In the end, it's not the years in your life that count. It's the life in your years.", author: "Abraham Lincoln", tones: ['soft', 'philosophical'] },
  { text: "Life is not measured by the number of breaths we take, but by the moments that take our breath away.", tones: ['soft'] },
  { text: "The purpose of life is to live it, to taste experience to the utmost.", author: "Eleanor Roosevelt", tones: ['soft'] },
  { text: "Today is a gift. That's why it's called the present.", tones: ['soft'] },
  { text: "Time you enjoy wasting is not wasted time.", author: "Marthe Troly-Curtin", tones: ['soft'] },
  { text: "Live in the sunshine, swim in the sea, drink the wild air.", author: "Ralph Waldo Emerson", tones: ['soft'] },
  { text: "The best time to plant a tree was 20 years ago. The second best time is now.", tones: ['soft', 'philosophical'] },
  { text: "Happiness is not something you postpone for the future; it is something you design for the present.", author: "Jim Rohn", tones: ['soft'] },
  { text: "Life is a succession of moments. To live each one is to succeed.", author: "Corita Kent", tones: ['soft', 'philosophical'] },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs", tones: ['soft'] },
  { text: "Be happy for this moment. This moment is your life.", author: "Omar Khayyam", tones: ['soft', 'philosophical'] },
  { text: "Make each day your masterpiece.", author: "John Wooden", tones: ['soft'] },
  { text: "Life is what happens when you're busy making other plans.", author: "John Lennon", tones: ['soft', 'realistic'] },

  // Realistic & Direct
  { text: "Time is what we want most, but what we use worst.", author: "William Penn", tones: ['realistic', 'philosophical'] },
  { text: "We are all in the gutter, but some of us are looking at the stars.", author: "Oscar Wilde", tones: ['realistic', 'philosophical'] },
  { text: "You only live once, but if you do it right, once is enough.", author: "Mae West", tones: ['realistic'] },
  { text: "Life is short, and it's up to you to make it sweet.", author: "Sarah Louise Delany", tones: ['realistic'] },
  { text: "The fear of death follows from the fear of life.", author: "Mark Twain", tones: ['realistic', 'philosophical'] },
  { text: "Life is really simple, but we insist on making it complicated.", author: "Confucius", tones: ['realistic', 'philosophical'] },
  { text: "The time you enjoy wasting was not wasted.", author: "John Lennon", tones: ['realistic'] },
  { text: "Don't count the days, make the days count.", author: "Muhammad Ali", tones: ['realistic'] },
  { text: "Life isn't about finding yourself. Life is about creating yourself.", author: "George Bernard Shaw", tones: ['realistic', 'philosophical'] },
  { text: "We do not remember days, we remember moments.", author: "Cesare Pavese", tones: ['realistic', 'philosophical'] },
  { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins", tones: ['realistic'] },
  { text: "Life is 10% what happens to you and 90% how you react to it.", author: "Charles R. Swindoll", tones: ['realistic'] },
  { text: "Your time is limited, don't waste it living someone else's life.", author: "Steve Jobs", tones: ['realistic'] },
  { text: "The unexamined life is not worth living.", author: "Socrates", tones: ['realistic', 'philosophical'] },
  { text: "Death is nothing, but to live defeated is to die every day.", author: "Napoleon", tones: ['realistic'] },

  // Philosophical & Deep
  { text: "To live is the rarest thing in the world. Most people exist, that is all.", author: "Oscar Wilde", tones: ['philosophical'] },
  { text: "He who has a why to live can bear almost any how.", author: "Friedrich Nietzsche", tones: ['philosophical'] },
  { text: "The privilege of a lifetime is to become who you truly are.", author: "Carl Jung", tones: ['philosophical'] },
  { text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.", author: "Aristotle", tones: ['philosophical'] },
  { text: "The meaning of life is to give life meaning.", author: "Viktor Frankl", tones: ['philosophical'] },
  { text: "Time is the substance I am made of. Time is a river which sweeps me along, but I am the river.", author: "Jorge Luis Borges", tones: ['philosophical'] },
  { text: "In the end, we only regret the chances we didn't take.", tones: ['philosophical', 'realistic'] },
  { text: "The soul becomes dyed with the color of its thoughts.", author: "Marcus Aurelius", tones: ['philosophical'] },
  { text: "Everything we hear is an opinion, not a fact. Everything we see is a perspective, not the truth.", author: "Marcus Aurelius", tones: ['philosophical'] },
  { text: "We suffer more in imagination than in reality.", author: "Seneca", tones: ['philosophical'] },
  { text: "Memento mori — Remember you must die.", author: "Stoic philosophy", tones: ['philosophical', 'realistic'] },
  { text: "The obstacle is the way.", author: "Marcus Aurelius", tones: ['philosophical'] },
  { text: "It is not death that a man should fear, but never beginning to live.", author: "Marcus Aurelius", tones: ['philosophical'] },
  { text: "Knowing yourself is the beginning of all wisdom.", author: "Aristotle", tones: ['philosophical'] },
  { text: "The only true wisdom is in knowing you know nothing.", author: "Socrates", tones: ['philosophical'] },
  { text: "We are not given a short life but we make it short.", author: "Seneca", tones: ['philosophical', 'realistic'] },
  { text: "Time discovers truth.", author: "Seneca", tones: ['philosophical'] },
  { text: "While we are postponing, life speeds by.", author: "Seneca", tones: ['philosophical', 'realistic'] },
  { text: "Life is long if you know how to use it.", author: "Seneca", tones: ['philosophical'] },
  { text: "Begin at once to live, and count each separate day as a separate life.", author: "Seneca", tones: ['philosophical'] },
  { text: "Do not seek to have events happen as you want them to, but instead want them to happen as they do happen.", author: "Epictetus", tones: ['philosophical'] },
  { text: "The whole future lies in uncertainty: live immediately.", author: "Seneca", tones: ['philosophical', 'realistic'] },
  { text: "You could leave life right now. Let that determine what you do and say and think.", author: "Marcus Aurelius", tones: ['philosophical', 'realistic'] },
  { text: "Waste no more time arguing what a good person should be. Be one.", author: "Marcus Aurelius", tones: ['philosophical'] },
  { text: "The present is all we have, and all we can be sure of.", tones: ['philosophical'] },
  { text: "Death smiles at us all; all we can do is smile back.", author: "Marcus Aurelius", tones: ['philosophical', 'realistic'] },
  { text: "The farther backward you can look, the farther forward you are likely to see.", author: "Winston Churchill", tones: ['philosophical'] },
  { text: "Man is not worried by real problems so much as by his imagined anxieties about real problems.", author: "Epictetus", tones: ['philosophical'] },
  { text: "First say to yourself what you would be; and then do what you have to do.", author: "Epictetus", tones: ['philosophical'] },
  { text: "The two most important days in your life are the day you are born and the day you find out why.", author: "Mark Twain", tones: ['philosophical'] },
  { text: "Between stimulus and response there is a space. In that space is our power to choose our response.", author: "Viktor Frankl", tones: ['philosophical'] },
];

/**
 * Get a random quote filtered by tone
 */
export function getRandomQuote(tone: Tone): Quote {
  const filtered = QUOTES.filter(q => q.tones.includes(tone));
  const randomIndex = Math.floor(Math.random() * filtered.length);
  return filtered[randomIndex] || QUOTES[0];
}

/**
 * Get quote of the day (deterministic based on date)
 */
export function getQuoteOfDay(tone: Tone): Quote {
  const filtered = QUOTES.filter(q => q.tones.includes(tone));
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
  const index = dayOfYear % filtered.length;
  return filtered[index] || QUOTES[0];
}
