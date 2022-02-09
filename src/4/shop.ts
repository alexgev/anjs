const shop = () => {
  const validate = (value: any) => {
    return value;
  }

  

  type ContentId = number & {readonly ContentId: unique symbol};
  const ContentId = (id: number) => {
    if (!validate(id)) {
      throw new Error('Validate');
    }
    return id as ContentId;
  }

  type UserId = number & {readonly UserId: unique symbol};
  const UserId = (id: number) => {
    if (!validate(id)) {
      throw new Error('Validate');
    }
    return id as UserId;
  }

  type UserEmail = string & {readonly UserEmail: unique symbol};
  const UserEmail = (email: string) => {
    if (!validate(email)) {
      throw new Error('Validate');
    }
    return email as UserEmail;
  }

  type ContentVideo = Buffer & {readonly ContentVideo: unique symbol};
  const ContentVideo = (buffer: Buffer) => {
    if (!validate(buffer)) {
      throw new Error('Validate');
    }
    return buffer as ContentVideo;
  }

  type Content = {
    id: ContentId,
    name: string,
    video: ContentVideo
  }

  type Film = Content & {
    duration: number
  }

  type Serial = Content & {
    countOfSeries: number
  }
  
  type User = {
    id: UserId,
    email: UserEmail,
    contents: Content[]
  }

  // test db

  const films: Film[] = [{
    id: ContentId(1),
    name: 'film 1',
    video: ContentVideo(Buffer.alloc(2)),
    duration: 1
  }]

  const serials: Serial[] = [{
    id: ContentId(2),
    name: 'serial 1',
    video: ContentVideo(Buffer.alloc(2)),
    countOfSeries: 2
  }]
  
  const contents: Content[] = [...serials, ...films];

  const users: User[] = [{
    id: UserId(1),
    email: UserEmail('asdf'),
    contents
  }, {
    id: UserId(2),
    email: UserEmail('awerafs'),
    contents: []
  }];

  // helpers

  const findContentById = (id: ContentId) => {
    const content = contents.find(film => film.id === id);
    if (!content) throw new Error('not found content');
    return content;
  }

  const findUserById = (id: UserId) => {
    const user = users.find(user => user.id === id);
    if (!user) throw new Error('not found user');
    return user;
  }

  const removeContentFromArray = (contents: Content[], filmId: ContentId) => {
    const index = contents.findIndex(film => film.id === filmId);
    if (~index) {
      return contents.splice(index, 1)[0];
    } else {
      throw new Error('Not found film in array');
    }
  }

  // Business logic

  const addVideoToContent = (id: ContentId, video: ContentVideo) => {
    const content = findContentById(id);
    content.video = video;
    return content;
  }

  const buyContent = (userId: UserId, contentId: ContentId) => {
    const [
      user,
      film
    ] = [
      findUserById(userId),
      findContentById(contentId)
    ]
    user.contents.push(film);
  }

  const sellContentToAnotherUser = (sellerId: UserId, buyerId: UserId, contentId: ContentId) => {
    const [
      seller,
      buyer,
      content
    ] = [
      findUserById(sellerId),
      findUserById(buyerId),
      findContentById(contentId)
    ];
    buyer.contents.push(removeContentFromArray(seller.contents, contentId));
  }


  // Business logic execution

  addVideoToContent(ContentId(1), ContentVideo(Buffer.alloc(3)))
  buyContent(UserId(2), ContentId(2));
  sellContentToAnotherUser(UserId(1), UserId(2), ContentId(1));
}

shop();