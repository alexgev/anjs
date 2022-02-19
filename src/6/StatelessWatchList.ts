

type EntityWithId = {id: number};


type WatchList<T extends EntityWithId> = {
  current: T[]
  added: T[]
  removed: T[]
}

export const StatelessWatchList = {
  create<T extends EntityWithId>(current: T[]): WatchList<T> {
    return {
      current,
      added: [],
      removed: []
    }
  },

  add<T extends EntityWithId>(watchList: WatchList<T>, element: T): WatchList<T> {
    return {
      ...watchList,
      current: [
        ...watchList.current,
        element
      ],
      added: [
        ...watchList.added,
        element
      ],
    }
  },

  remove<T extends EntityWithId>(watchList: WatchList<T>, id: number): WatchList<T> {
    const elementToDelete = watchList.current.find(item => item.id === id);
    if (!elementToDelete) throw new Error('Not found');
    return {
      ...watchList,
      current: watchList.current.filter(item => item.id !== id),
      added: watchList.added.filter(item => item.id !== id),
      removed: [
        ...watchList.removed,
        elementToDelete
      ]
    }
  }
}