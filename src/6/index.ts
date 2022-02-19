import { StatefulWatchList } from "./StatefulWatchList";
import { StatelessWatchList } from "./StatelessWatchList";
/**
 * Data
 */
type User = {
  email: string,
  id: number
}

const users: User[] = [{
  email: 'hello',
  id: 1
}]
const user: User = {
  email: 'asdf',
  id: 2
}

/**
 * Stateless
 */

const watchList = StatelessWatchList.create(users);
const watchList2 = StatelessWatchList.add(watchList, user);
const watchList3 = StatelessWatchList.remove(watchList2, 2);

console.log('watchList', watchList);
console.log('watchList2', watchList2);
console.log('watchList3', watchList3);

/**
 * Stateful with chaining
 */

const statefulWatchList = StatefulWatchList.new(users).add(user).remove(2);
const statefulWatchListData = statefulWatchList.getWatchListData();

console.log('statefulWatchListData', statefulWatchListData);

