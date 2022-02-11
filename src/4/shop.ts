const validate = (value: any) => {
  return value;
}

type FilmId = number & {readonly FilmId: unique symbol};
const FilmId = (id: number) => {
  if (!validate(id)) {
    throw new Error('Validate');
  }
  return id as FilmId;
}

type SerialId = number & {readonly SerialId: unique symbol};
const SerialId = (id: number) => {
  if (!validate(id)) {
    throw new Error('Validate');
  }
  return id as SerialId;
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

/**
 * Фукнциональная композиция данных
 */

const functionalComposition = () => {

  type ContentWithVideo = {
    video: ContentVideo
  }

  type ProductsOwner = {
    products: Product[]
  }

  type Film = ContentWithVideo & {
    id: FilmId,
    duration: number
    name: string,
  }

  type Serial = ContentWithVideo & {
    id: SerialId,
    countOfSeries: number,
    name: string,
  }

  type Product = Film | Serial;
  
  type User = ProductsOwner & {
    id: UserId,
    email: UserEmail,
  }

  type Guest = ProductsOwner & {
    id: UserId
  }

  // Business logic

  const addVideoToProduct = (contentWithVideo: ContentWithVideo, video: ContentVideo) => {
    contentWithVideo.video = video;
    return contentWithVideo;
  }

  const buyProduct = (user: ProductsOwner, product: Product) => {
    user.products.push(product);
  }

  const sellProductToAnotherUser = (seller: ProductsOwner, buyer: ProductsOwner, product: Product) => {
    const idx = seller.products.findIndex(product => product.id === product.id);
    if (!~idx) throw new Error('not found serial');
    buyer.products.push(seller.products.splice(idx, 1)[0]);
    return product;
  }
}

functionalComposition();

/**
 * Композиция на Union Type
 */

const composionWithUnionTypes = () => {

  type Film = {
    id: FilmId,
    duration: number
    name: string,
    video: ContentVideo
  }

  type Serial = {
    id: SerialId,
    countOfSeries: number,
    name: string,
    video: ContentVideo
  }

  type Product = Film | Serial;

  
  type User = {
    id: UserId,
    email: UserEmail,
    products: Product[];
  }

  type Guest = {
    id: UserId,
    products: Product[];
  }

  type ProductsOwner = User | Guest;

  // Business logic

  const addVideoToProduct = (contentWithVideo: Product, video: ContentVideo) => {
    contentWithVideo.video = video;
    return contentWithVideo;
  }

  const buyProduct = (user: ProductsOwner, product: Product) => {
    user.products.push(product);
  }

  const sellProductToAnotherUser = (seller: ProductsOwner, buyer: ProductsOwner, product: Product) => {
    const idx = seller.products.findIndex(product => product.id === product.id);
    if (!~idx) throw new Error('not found serial');
    buyer.products.push(seller.products.splice(idx, 1)[0]);
    return product;
  }
}

composionWithUnionTypes();



/**
 * Композиция на интерфейсах
 */

const composionWithInterfaces = () => {

  type Film = {
    id: FilmId,
    duration: number
    name: string,
    video: ContentVideo
  }

  type Serial = {
    id: SerialId,
    countOfSeries: number,
    name: string,
    video: ContentVideo
  }

  type ProductWithVideo = {
    video: ContentVideo
  }

  type Product = {
    id: number,
    name: string;
  }



  
  type User = {
    id: UserId,
    email: UserEmail,
    products: Product[];
  }

  type Guest = {
    id: UserId,
    products: Product[];
  }

  type ProductsOwner = {
    products: Product[]
  };

  // Business logic

  const addVideoToProduct = (contentWithVideo: ProductWithVideo, video: ContentVideo) => {
    contentWithVideo.video = video;
    return contentWithVideo;
  }

  const buyProduct = (user: ProductsOwner, product: Product) => {
    user.products.push(product);
  }

  const sellProductToAnotherUser = (seller: ProductsOwner, buyer: ProductsOwner, product: Product) => {
    const idx = seller.products.findIndex(product => product.id === product.id);
    if (!~idx) throw new Error('not found serial');
    buyer.products.push(seller.products.splice(idx, 1)[0]);
    return product;
  }
}

composionWithInterfaces();


/**
 * Композиция на поведении
 */

 const behaviorComposition = () => {

  type User = {
    email: string,
    products: Product[],
  }


  type Film = {
    name: string,
    hello: string
  }

  type Serial = {
    name: string,
    bla: number,
  }

  type Product =  Film | Serial;


  type BuyBehavior = (user: User, product: Product) => Product;

  const buyProduct = (user: User, product: Product, behavour: BuyBehavior) => {
    return behavour(user, product);
  }

  const buyFilm = (user: User, film: Film) => {
    console.log('buy film');
    user.products.push(film);
    return film;
  }

  const buySerial = (user: User, serial: Serial) => {
    console.log('buy serial');
    user.products.push(serial);
    return serial;
  }

  const user: User = {
    email: 'asdf',
    products: []
  }

  const film: Film = {
    name: 'asdf',
    hello: 'asdf'
  }
  const serial: Serial = {
    bla: 1,
    name: 'asdf'
  }

  buyProduct(user, film, buyFilm);
  buyProduct(user, serial, buySerial);

}

behaviorComposition();