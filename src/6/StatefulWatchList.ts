type EntityWithId = {
  id: number
}

export type WatchListData<T extends EntityWithId> = {
  current: T[];
  added: T[];
  removed: T[];
}

export type WatchList<T extends EntityWithId> = {
  add(item: T): WatchList<T>;
  remove(id: number): WatchList<T>;
  getWatchListData(): WatchListData<T>;
}

export const StatefulWatchList = <T extends EntityWithId>(wl: WatchListData<T>) => {
  const result = {
    add(item: T): WatchList<T> {
      wl.current.push(item);
      wl.added.push(item);
      return result;
    },
    remove(id: number): WatchList<T> {
      const item = wl.current.find(item => item.id === id);
      if (!item) throw new Error('Not found');
      wl.current = wl.current.filter(item => item.id !== id);
      wl.added = wl.added.filter(item => item.id !== id);
      wl.removed.push(item);
      return result;
    },
    getWatchListData() {
      return wl;
    }
  }
  return result
}

StatefulWatchList.new = <T extends EntityWithId>(current: T[]) => {
  return StatefulWatchList({
    current,
    added: [],
    removed: []
  })
}