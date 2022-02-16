const film = () => {

  type FilmRaw = {
    name?: string,
    description?: string,
    photoLink?: string,
    videoLink?: string,
    posted?: boolean;
  }


  type DraftFilm = {
    type: 'DraftFilm',
    name: string,
    description: string,
    photoLink?: string,
  }
  type ReadyToUseFilm = {
    type: 'ReadyToUseFilm',
    name: string,
    description: string,
    photoLink: string,
    videoLink: string,
  }
  type PostedFilm = {
    type: 'PostedFilm',
    name: string,
    description: string,
    photoLink: string,
    videoLink: string,
    posted: true;
  }
  

  type Film = DraftFilm | ReadyToUseFilm | PostedFilm;


  const postRawFilm = (film: FilmRaw) => {
    if (film.posted) throw new Error('Film already posted');
    if (!film.name || 
      !film.description || 
      !film.photoLink || 
      !film.videoLink
    ) throw new Error('Cant post draft film');
    film.posted = true;
    return film;
  }

  const postFilm = (film: Film): PostedFilm => {
    switch (film.type) {
      case 'DraftFilm':
        throw new Error('Cant post draft film');
      case 'ReadyToUseFilm':
        const postedFilm: PostedFilm = {
          type: 'PostedFilm',
          name: film.name,
          description: film.description,
          photoLink: film.photoLink,
          videoLink: film.videoLink,
          posted: true,
        }
        return postedFilm;
      case 'PostedFilm':
        throw new Error('This film already posted');
      default:
        const a: never = film;
        throw new Error('Invalid film type');
    }
  }

  type UpdateFilmProperties = {
    name?: string;
    description?: string;
    photoLink?: string;
    videoLink?: string;
  }
  const updateFilm = (film: Film, updatedFilmProperties: UpdateFilmProperties) => {
    switch (film.type) {
      case 'PostedFilm':
        throw new Error('Cant update posted film');
    }
    let actualProperties = {
      ...film,
      ...updatedFilmProperties
    }
    return actualizeType(actualProperties);
  }

  const actualizeType = (actualProperties: UpdateFilmProperties): Film => {
    let film: Film;
    if (actualProperties.name && 
      actualProperties.description && 
      actualProperties.photoLink &&
      actualProperties.videoLink
    ) {
      film = {
        type: 'ReadyToUseFilm',
        name: actualProperties.name,
        description: actualProperties.description,
        photoLink: actualProperties.photoLink,
        videoLink: actualProperties.videoLink,
      }
    } else {
      film = {
        type: 'DraftFilm',
        name: actualProperties.name,
        description: actualProperties.description,
        photoLink: actualProperties.photoLink,
      }
    }
    return film;
  }

  type FilmTableData = {
    name?: string,
    description?: string,
    photoLink?: string,
    videoLink?: string,
    posted?: boolean;
  }

  type DB = {
    getUserTable: () => FilmTableData,
    getUsers: () => FilmTableData[],
  }

  const fromDB = (db: DB): Film => {
    const filmTable = db.getUserTable();
    let film = fromFilmTableData(filmTable);
    return film;
  }


  const toFilmTableData = (film: Film): FilmTableData => {
    let filmTableData: FilmTableData;
    switch (film.type) {
      case 'DraftFilm': 
        filmTableData.name = film.name;
        filmTableData.description = film.description;
        filmTableData.photoLink = film.photoLink;
        break;
      case 'ReadyToUseFilm': 
        filmTableData.name = film.name;
        filmTableData.description = film.description;
        filmTableData.photoLink = film.photoLink;
        filmTableData.videoLink = film.videoLink;
        break;
      case 'PostedFilm':
        filmTableData.name = film.name;
        filmTableData.description = film.description;
        filmTableData.photoLink = film.photoLink;
        filmTableData.videoLink = film.videoLink;
        filmTableData.posted = film.posted;
        break;
      default:
        const a: never = film;
        throw new Error('Invalid film type');
    }
    return filmTableData;
  }

  const fromFilmTableData = (filmTableData: FilmTableData) => {
    let film: Film;
    if (filmTableData.posted) {
      film = {
        type: 'PostedFilm',
        posted: true,
        name: filmTableData.name as string,
        description: filmTableData.description as string,
        photoLink: filmTableData.photoLink as string,
        videoLink: filmTableData.videoLink as string,
      }
    } else if (
      filmTableData.name && 
      filmTableData.description && 
      filmTableData.photoLink && filmTableData.videoLink
    ) {
      film = {
        type: 'ReadyToUseFilm',
        name: filmTableData.name as string,
        description: filmTableData.description as string,
        photoLink: filmTableData.photoLink as string,
        videoLink: filmTableData.videoLink as string, 
      }
    } else {
      film = {
        type: 'DraftFilm',
        name: filmTableData.name as string,
        description: filmTableData.description as string,
        photoLink: filmTableData.photoLink
      }
    }
    return film;
  }
}

film();
