export const emptyFeedSample = {
  type: {
    value: 'feed',
  },
  title: 'Test Title',
  id: '< OPTIONAL >',
  summary: '< OPTIONAL >',
  published: '< OPTIONAL >',
  updated: '< OPTIONAL >',
  author: {
    name: '< OPTIONAL >',
  },
  media_group: [],
  link: { },
  extensions: { },
  entry: [], // Atom Entries
};

export const videosFeedSample = {
  title: 'Test Videos Feed',
  entry: [
    {
      type: {
        value: 'video',
      },
      id: 'Id1',
      title: 'Example Video Title #1',
      summary: 'Example summary',
      category: 'Example category',
      published: '2005-04-06T13:00:00-08:00',
      updated: '2005-04-06T20:25:05-08:00',
      media_group: [
        {
          type: 'image',
          media_item: [
            {
              src: 'http://example.org/image-large.png',
              key: 'image_base',
              type: 'image',
            },
          ],
        },
      ],
      content: {
        type: 'video/hls',
        src: 'http://domain.com/video1.m3u8',
      },
      extensions: {
        sourceImageUrl: 'sourceImageUrl.png',
      },
    },
  ],
};

export const androidFeedSample = {
  title: 'Test Videos Feed',
  entry: [
    {
      type: {
        value: 'video',
      },
      id: 'Id1',
      title: 'Example Video Title #1',
      summary: 'Example summary',
      published: '2005-04-06T13:00:00-08:00',
      updated: '2005-04-06T20:25:05-08:00',
      media_group: [
        {
          type: 'image',
          media_item: [
            {
              src: 'http://example.org/image-large.png',
              key: 'image_base',
              form: 'image',
            },
          ],
        },
      ],
      content: {
        type: 'video/hls',
        src: 'http://domain.com/video1.m3u8',
      },
      extensions: {
        sourceImageUrl: 'sourceImageUrl.png',
      },
    },
  ],
};

export const imagesFeedSample = {
  title: 'Test Images Feed',
  entry: [
    {
      type: {
        value: 'image',
      },
      id: 'Id1',
      title: 'Example Image Title #1',
      published: '2005-04-06T13:00:00-08:00',
      updated: '2005-04-06T20:25:05-08:00',
      media_group: [
        {
          type: 'image',
          media_item: [
            {
              src: 'http://example.org/image-large.png',
              key: 'image_base',
              type: 'image',
            },
          ],
        },
      ],
      content: {
        type: 'image/png',
        src: 'http://domain.com/image.png',
      },
      extensions: {
        sourceImageUrl: 'sourceImageUrl.png',
      },
    },
  ],
};

export const articlesFeedSample = {
  title: 'Test Articles Feed',
  entry: [
    {
      title: 'Test Article',
      category: 'Category',
      type: {
        value: 'article',
      },
      id: 'Id1',
      author: {
        name: 'Author Name',
      },
      link: {
        rel: 'alternate',
        href: 'http://www.example.com/article1.html',
        type: 'text/html',
      },
      summary: 'Example Summary',
      published: '2005-04-06T13:00:00-08:00',
      updated: '2005-04-06T20:25:05-08:00',
      media_group: [
        {
          type: 'image',
          media_item: [
            {
              src: 'http://example.org/image-large.png',
              key: 'large_image_key',
              type: 'image',
            },
            {
              src: 'http://example.org/image-small.png',
              key: 'small_image_key',
              type: 'image',
            },
          ],
        },
      ],
      content: {
        type: 'html',
        content: '<some html content>',
      },
      extensions: {
        sourceImageUrl: 'sourceImageUrl.png',
      },
    },
    {
      type: {
        value: 'article',
      },
      id: 'Id2',
      title: 'Example Article Title #2',
      category: 'Category',
      author: {
        name: 'Author Name',
      },
      link: {
        rel: 'alternate',
        href: 'http://www.example.com/article2.html',
        type: 'text/html',
      },
      summary: 'Example Video Article Summary',
      published: '2005-04-06T13:00:00-08:00',
      updated: '2005-04-06T20:25:05-08:00',
      media_group: [
        {
          type: 'image',
          media_item: [
            {
              src: 'http://example.org/image-large.png',
              key: 'large_image_key',
              type: 'image',
            },
          ],
        },
        {
          type: 'video',
          media_item: [
            {
              src: 'http://domain.com/video.mp4',
              type: 'video',
            },
          ],
        },
      ],
      content: {
        type: 'html',
        content: '<some html content>',
      },
      extensions: {
        sourceImageUrl: 'sourceImageUrl.png',
      },
    },
  ],
};

export const linksFeedSample = {
  title: 'Test Links Feed',
  entry: [
    {
      type: {
        value: 'link',
      },
      id: 'Id1',
      title: 'Example Link #1',
      published: '2005-04-06T13:00:00-08:00',
      updated: '2005-04-06T20:25:05-08:00',
      media_group: [
        {
          type: 'image',
          media_item: [
            {
              src: 'http://example.org/image-large.png',
              key: 'image_base',
              type: 'image',
            },
          ],
        },
      ],
      link: {
        type: 'link',
        href: 'http://somelink.com',
      },
      extensions: {
        sourceImageUrl: 'sourceImageUrl.png',
      },
    },
  ],
};

export const normalizedVideosFeedSample = {
  title: 'Test Videos Feed',
  entries: {
    Id1: {
      id: 'Id1',
      source: 'zappPipes',
      type: 'video',
      caption: 'Example Video Title #1',
      category: 'Example category',
      createdAt: 1112821200,
      user: {
        name: 'Test Videos Feed',
        avatarImageUrl: 'sourceImageUrl.png',
        id: 'Id1',
      },
      videoUrl: 'http://domain.com/video1.m3u8',
      images: {
        default: {
          url: 'http://example.org/image-large.png',
          width: 16,
          height: 9,
        },
      },
    },
  },
};

export const normalizedImagesFeedSample = {
  title: 'Test Images Feed',
  entries: {
    Id1: {
      id: 'Id1',
      source: 'zappPipes',
      type: 'image',
      caption: 'Example Image Title #1',
      createdAt: 1112821200,
      user: {
        name: 'Test Images Feed',
        avatarImageUrl: 'sourceImageUrl.png',
        id: 'Id1',
      },
      images: {
        default: {
          url: 'http://domain.com/image.png',
          width: 5,
          height: 6,
        },
      },
    },
  },
};

export const normalizedArticlesFeedSample = {
  title: 'Test Articles Feed',
  entries: {
    Id1: {
      id: 'Id1',
      source: 'zappPipes',
      type: 'article',
      body: '<some html content>',
      summary: 'Example Summary',
      caption: 'Test Article',
      category: 'Category',
      createdAt: 1112821200,
      videoUrl: null,
      user: {
        name: 'Author Name',
        avatarImageUrl: 'sourceImageUrl.png',
        id: 'Id1',
      },
      images: {
        default: {
          url: 'http://example.org/image-large.png',
          width: 16,
          height: 9,
        },
      },
    },
    Id2: {
      id: 'Id2',
      source: 'zappPipes',
      type: 'article',
      body: '<some html content>',
      summary: 'Example Video Article Summary',
      caption: 'Example Article Title #2',
      category: 'Category',
      createdAt: 1112821200,
      videoUrl: 'http://domain.com/video.mp4',
      user: {
        name: 'Author Name',
        avatarImageUrl: 'sourceImageUrl.png',
        id: 'Id2',
      },
      images: {
        default: {
          url: 'http://example.org/image-large.png',
          width: 16,
          height: 9,
        },
      },
    },
  },
};

export const normalizedLinksFeedSample = {
  title: 'Test Links Feed',
  entries: {
    Id1: {
      id: 'Id1',
      source: 'zappPipes',
      type: 'link',
      caption: 'Example Link #1',
      createdAt: 1112821200,
      user: {
        name: 'Test Links Feed',
        avatarImageUrl: 'sourceImageUrl.png',
        id: 'Id1',
      },
      images: {
        default: {
          url: 'http://example.org/image-large.png',
          width: 5,
          height: 6,
        },
      },
      url: 'http://somelink.com',
    },
  },
};

export const normalizedAndroidFeedSample = {
  title: 'Test Videos Feed',
  entries: {
    Id1: {
      id: 'Id1',
      source: 'zappPipes',
      type: 'video',
      caption: 'Example Video Title #1',
      createdAt: 1112821200,
      user: {
        name: 'Test Videos Feed',
        avatarImageUrl: 'sourceImageUrl.png',
        id: 'Id1',
      },
      videoUrl: 'http://domain.com/video1.m3u8',
      images: {
        default: {
          url: 'http://example.org/image-large.png',
          width: 16,
          height: 9,
        },
      },
    },
  },
};