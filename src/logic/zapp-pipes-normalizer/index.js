import { v4 as uuid } from 'uuid';

const date = value => new Date(value).getTime();

const mapUser = user => ({
  id: user.id || uuid(),
  avatarImageUrl: user.avatarImageUrl || '',
  name: user.name,
});

const mapMediaItem = (mediaGroups, type, aspectRatio) => {
  for (let i = 0; i < mediaGroups.length; i++) {
    const mediaItems = mediaGroups[i].media_item;
    for (let j = 0; j < mediaItems.length; j++) {
      const mediaItem = mediaItems[j];
      if (mediaItem.type === type || mediaItem.form === type || (type === 'image' && mediaItem.type === 'thumbnail')) {
        if (type === 'video') return mediaItem.src;

        return {
          default: {
            url: mediaItem.src,
            width: aspectRatio.width,
            height: aspectRatio.height,
          },
        };
      }
    }
  }

  return null;
};

const mapImage = (imageUrl, imageSize) => ({
  default: {
    url: imageUrl,
    width: imageSize.width,
    height: imageSize.height,
  },
});

const mapImageEntry = (entry, title) => {
  const { id, title: caption, content, published: createdAt, extensions = {} } = entry;
  const { src: imageUrl } = content;
  const { sourceImageUrl: avatarImageUrl = '' } = extensions;
  const user = mapUser({ id, name: title, avatarImageUrl });

  return {
    id: id || uuid(),
    user,
    createdAt: date(createdAt),
    caption,
    type: 'image',
    source: 'zappPipes',
    images: mapImage(imageUrl, { height: 6, width: 5 }),
  };
};

const mapVideoEntry = (entry, title = '') => {
  const { id, title: caption, category = '', content, published: createdAt, media_group: mediaGroups, extensions = {} } = entry;
  const { src: videoUrl } = content;
  const { sourceImageUrl: avatarImageUrl = '' } = extensions;
  const user = mapUser({ id, name: title, avatarImageUrl });

  return {
    id: id || uuid(),
    user,
    createdAt: date(createdAt),
    caption,
    category,
    type: 'video',
    source: 'zappPipes',
    images: mapMediaItem(mediaGroups, 'image', { height: 9, width: 16 }),
    videoUrl,
  };
};

const mapLinkEntry = (entry, title) => {
  const { id, title: caption, link, published: createdAt, media_group: mediaGroups, extensions = {} } = entry;
  const { href: url } = link;
  const { sourceImageUrl: avatarImageUrl } = extensions;
  const user = mapUser({ id, name: title, avatarImageUrl });

  return {
    id: id || uuid(),
    user,
    createdAt: date(createdAt),
    caption,
    type: 'link',
    source: 'zappPipes',
    images: mapMediaItem(mediaGroups, 'image', { height: 6, width: 5 }),
    url,
  };
};

const mapArticleEntry = (entry) => {
  const { id, title: caption, category = '', summary, content, published: createdAt, media_group: mediaGroups, author = {}, extensions = {} } = entry;
  const { content: body } = content;
  const { name = '' } = author;
  const { sourceImageUrl: avatarImageUrl = '' } = extensions;
  const user = mapUser({ id, name, avatarImageUrl });

  return {
    id: id || uuid(),
    user,
    category,
    summary,
    body,
    createdAt: date(createdAt),
    caption,
    type: 'article',
    source: 'zappPipes',
    images: mapMediaItem(mediaGroups, 'image', { height: 9, width: 16 }),
    videoUrl: mapMediaItem(mediaGroups, 'video', { height: 9, width: 16 }),
  };
};

const mapEntry = (entry, title) => {
  const type = entry.type.value.toLowerCase();

  switch (type) {
    case 'article':
      return mapArticleEntry(entry, title);
    case 'image':
      return mapImageEntry(entry, title);
    case 'video':
      return mapVideoEntry(entry, title);
    case 'link':
      return mapLinkEntry(entry, title);
    default:
      return false;
  }
};

export const normalizeZappPipes = (pipes, platform) => {
  const parsedData = JSON.parse(pipes);
  let { title, entry: entriesArray = [] } = parsedData;
  const entries = {};
  
  if (platform === 'android') {
    entriesArray = entriesArray.map(entry => (entry.data) ? entry.data : entry);
  }

  entriesArray
    .map(entry => mapEntry(entry, title))
    .filter(entry => !!entry)
    .forEach(entry => {
      entries[entry.id] = entry;
    });

  return {
    title,
    entries,
  };
};
