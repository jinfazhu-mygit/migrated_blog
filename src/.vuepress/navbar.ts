import { navbar } from 'vuepress-theme-hope';

export default navbar([
  '/',
  // "/demo/",
  {
    text: '博文',
    icon: 'pen-to-square',
    prefix: '/posts/',
    children: [
      // { text: "火龙果", icon: "pen-to-square", link: "dragonfruit" },
      // "tomato",
      // "strawberry",
    ],
  },
  {
    text: 'V2 文档',
    icon: 'book',
    link: 'https://theme-hope.vuejs.press/zh/',
  },
]);
