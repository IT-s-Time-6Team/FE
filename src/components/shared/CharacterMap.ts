import rabbit from '@assets/chatRoom/character/rabbit.svg';
import bear from '@assets/chatRoom/character/bear.svg';
import cat from '@assets/chatRoom/character/cat.svg';
import chick from '@assets/chatRoom/character/chick.svg';
import pan from '@assets/chatRoom/character/pan.svg';
import pig from '@assets/chatRoom/character/pig.svg';
import snake from '@assets/chatRoom/character/snake.svg';

export const CharacterMap = {
  RABBIT: rabbit,
  BEAR: bear,
  FOX: cat,
  CHICK: chick,
  PANDA: pan,
  PIG: pig,
  TURTLE: snake,
} as const;

export type CharacterKey = keyof typeof CharacterMap;
