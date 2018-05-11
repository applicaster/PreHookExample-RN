import { v4 } from 'uuid';

const date = value => (new Date(value).getTime() / 1000);
const mapUser = user => ({
  id: v4(),
  avatarImageUrl: user.avatarImageUrl || 'https://yt3.ggpht.com/a-/AJLlDp3HA08n05uiS3qExGQ7hYrw6erPfD02j8TZPA=s900-mo-c-c0xffffffff-rj-k-no',
  name: user.name,
});

const mapImages = (imageUrl, imageSize) => ({
  default: {
    url: imageUrl,
    width: imageSize.width,
    height: imageSize.height,
  },
});

const mapTextEntry = (entry) => {
  const { id, timestamp: createdAt, text: caption } = entry;

  return {
    id,
    user,
    createdAt,
    caption,
    type: 'text',
    source: 'cms',
  };
};

const mapImageEntry = (entry) => {
  const { id, timestamp: createdAt, text: caption, image_size: imageSize, image } = entry;

  return {
    id,
    user,
    createdAt,
    caption,
    type: 'image',
    source: 'cms',
    images: mapImages(image, imageSize),
  };
};

const mapVideoEntry = (entry, title) => {
  const { logoUrl, title: caption, content, published: createdAt, media_group: thumbnails } = entry;
  const { src: videoUrl } = content;
  const { src: imageUrl } = thumbnails[0].media_item[0];
  const user = mapUser({ name: title, avatarImageUrl: logoUrl });

  return {
    id: v4(),
    user,
    createdAt: date(createdAt),
    caption,
    type: 'video',
    source: 'zappPipes',
    images: mapImages(imageUrl, { height: 360, width: 640 }),
    videoUrl,
  };
};

const mapLinkEntry = (entry) => {
  const { id, timestamp: createdAt, text: caption, link = {}, image_size: imageSize, image } = entry;
  const url = link.url;

  return {
    id,
    user,
    createdAt,
    caption,
    type: 'link',
    source: 'cms',
    url,
    images: mapImages(image, imageSize),
  };
};

const mapEntry = (entry, title) => {
  const type = entry.type.value.toLowerCase();

  switch (type) {
    // case 'article':
    //   return mapTextEntry(entry);
    // case 'image':
    //   return mapImageEntry(entry);
    case 'video':
      return mapVideoEntry(entry, title);
    // case 'link':
    //   return mapLinkEntry(entry);
    default:
      return false;
  }
};

export const normalizeZappPipes = pipes => {
  const { title, entry: entriesArray = [] } = JSON.parse(pipes);
  const entries = {};
  
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

const normalizedEntrys = [
  {
    id: 'someVideoEntryId',
    source: 'cms',
    type: 'video',
    caption: 'Test Video Entry',
    videoUrl: 'http://assets-production.applicaster.com/stars/uploads/5a99b55d4ab672355b288754_1520022877183.mp4',
    createdAt: 1520022995,
    user: {
      name: 'Star Feed',
      avatarImageUrl: 'someThumbnailUrl',
      id: 'userId',
    },
    images: {
      default: {
        url: 'http://assets-production.applicaster.com/stars/uploads/5a99b55d4ab672355b288754_1520022877182.jpg',
        width: 1440,
        height: 1080,
      },
    },
  },
  {
    id: 'someTextEntryId',
    source: 'cms',
    type: 'text',
    caption: 'Test Text Entry',
    createdAt: 1517861168,
    user: {
      name: 'Star Feed',
      avatarImageUrl: 'someThumbnailUrl',
      id: 'userId',
    },
  },
  {
    id: 'someImageEntryId',
    source: 'cms',
    type: 'image',
    caption: 'Test Image Entry',
    createdAt: 1517861166,
    user: {
      name: 'Star Feed',
      avatarImageUrl: 'someThumbnailUrl',
      id: 'userId',
    },
    images: {
      default: {
        url: 'http://assets-production.applicaster.com/stars/uploads/5a78b7136a882062bf8af315_1517860627571.jpg',
        width: 1440,
        height: 1080,
      },
    },
  },
  {
    id: 'someLinkEntryId',
    source: 'cms',
    type: 'link',
    caption: 'Test Link Entry',
    createdAt: 1517861163,
    url: 'http://www.applicaster.com',
    user: {
      name: 'Star Feed',
      avatarImageUrl: 'someThumbnailUrl',
      id: 'userId',
    },
    images: {
      default: {
        url: 'http://assets-production.applicaster.com/stars/uploads/5a78b743595bcf072b5ba3e5_1517860675506.jpg',
        width: 1920,
        height: 1080,
      },
    },
  },
  {
    id: 'someUltimateQuestionEntryId',
    source: 'cms',
    type: 'link',
    caption: 'Test Ultimate Question',
    createdAt: 1517861160,
    url: 'https://assets-secure.applicaster.com/static/starlight/grid/1.5/template/index.html?appli-payload=eyJxdWVzdGlvblVybCI6Imh0dHBzOi8vYXNzZXRzLXNlY3VyZS5hcHBsaWNhc3Rlci5jb20vcXVlc3Rpb25zLXByb2R1Y3Rpb24vYXBpL3YxL2FjY291bnRzLzU5NWRlN2FjOGE3YzQzMDAwOTE0YzVhNS9xdWVzdGlvbnMvNzA3NDkwOGMtMGFhZi0xMWU4LWI4MDAtMGEwMTM1OGZmYmJjLmpzb24iLCJjaGFsbGVuZ2VSZWYiOiJhcm46c3RhcnM6NTk1ZGU3YWM4YTdjNDMwMDA5MTRjNWE1OnRpbWVsaW5lOjVhNGZhZGJmNGFiNjcyMGJjY2EzNmM3NCJ9',
    user: {
      name: 'Star Feed',
      avatarImageUrl: 'someThumbnailUrl',
      id: 'userId',
    },
    images: {
      default: {
        url: 'http://assets-production.applicaster.com/stars/uploads/5a78b8406a882069138af314_1517860928683.jpg',
        width: 660,
        height: 499,
      },
    },
  },
];
