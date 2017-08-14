export const event = (id, type = 'image', source = 'instagram', userName = 'applicaster') => ({
  id,
  user: {
    id: '220971565',
    name: 'Test Name',
    avatarImageUrl: 'https://scontent.cdninstagram.com/t51.2885-19/11356956_452315591560419_1118499770_a.jpg',
    userName,
  },
  images: {
    thumbnail: {
      width: 150,
      height: 150,
      url: 'https://scontent.cdninstagram.com/t51.2885-15/s150x150/e35/c114.0.852.852/20590092_108583273161709_7296810043293302784_n.jpg',
    },
    low_resolution: {
      width: 320,
      height: 252,
      url: 'https://scontent.cdninstagram.com/t51.2885-15/s320x320/e35/20590092_108583273161709_7296810043293302784_n.jpg',
    },
    standard_resolution: {
      width: 640,
      height: 504,
      url: 'https://scontent.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/20590092_108583273161709_7296810043293302784_n.jpg',
    },
  },
  createdAt: 1501886235,
  caption: 'Low. Tarmac T2 , CasCam, SPC LCAs.\nThanks @azpinstalls for the work, parts, advice and setup.\n#brz #gt86 #ft86',
  likesCount: 30,
  type,
  commentsCount: 0,
  source,
});
