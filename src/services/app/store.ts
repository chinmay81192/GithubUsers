import { makeAutoObservable } from "mobx";
import { User, UserList } from "../../types";

const NUM_PER_PAGE = 25;
const NUM_FETCH = 100;

export default class App {
  users: UserList[] = [];
  fetchedUsers: UserList[] = [];
  selectedUser: User | null = null;
  favorites: UserList[] = [];
  showFavorites: boolean = false;
  usersLoading: boolean = false;
  hasMoreUsers: boolean = false;
  search: string = "";
  currentPage: number = 1;

  constructor() {
    makeAutoObservable(this);
  }

  setCurrentPage(page: number) {
    this.currentPage = page;
  }

  setSearch(val: string) {
    this.search = val;
  }

  setHasMoreUsers(moreUsers: boolean) {
    this.hasMoreUsers = moreUsers;
  }

  setUsersLoading(loading: boolean) {
    this.usersLoading = loading;
  }

  setShowFavorite(show: boolean) {
    this.showFavorites = show;
  }

  resetSelectedUser() {
    this.selectedUser = null;
  }

  resetUsers() {
    this.fetchedUsers = [];
    this.users = [];
    this.setCurrentPage(1);
  }

  setUsersFromFetched(start: number, offset: number) {
    this.users = this.mergeArray(
      this.users,
      this.fetchedUsers.slice(start, offset)
    );
    this.setUsersLoading(false);
  }

  getPageForServer(currentpage: number) {
    return Math.floor((currentpage - 1) / 4) + 1;
  }

  mergeArray(target: UserList[], newArray: UserList[]) {
    const resp = [...target];
    newArray?.forEach((element) => {
      if (!resp?.some((r) => r?.login === element.login)) {
        resp?.push(element);
      }
    });
    return resp;
  }

  async fetchUsers(searchTerm: string, page = 1) {
    const offset = page * NUM_PER_PAGE;
    const start = offset - NUM_PER_PAGE;
    this.setUsersLoading(true);

    if (offset % NUM_FETCH === NUM_PER_PAGE) {
      const endpoint = `https://api.github.com/search/users?q=${searchTerm}&page=${this.getPageForServer(
        page
      )}&per_page=${NUM_FETCH}`;

      const resp = await fetch(endpoint);
      const respToJson = await resp.json();

      this.fetchedUsers = this.mergeArray(
        this.fetchedUsers,
        respToJson?.["items"] ?? []
      );

      this.setHasMoreUsers(respToJson["items"]?.length > 0);
      this.setUsersFromFetched(start, offset);
    } else {
      setTimeout(() => {
        this.setUsersFromFetched(start, offset);
      }, 1000);
    }

    //this.setUsersLoading(false);
    //return respToJson;
  }

  async fetchSingleUser(user: string) {
    const endpoint = `https://api.github.com/users/${user}`;
    const resp = await fetch(endpoint);
    const respToJson = await resp.json();
    this.selectedUser = respToJson;
    console.log(respToJson);
    return respToJson;
  }

  getFromLocalStorage() {
    console.log("Fetching from local storage");
    const favorites = JSON.parse(localStorage?.getItem("favourites") ?? "[]");
    this.favorites = favorites;
    console.log(this.favorites);
  }

  saveToLocalStorage(obj: User | UserList) {
    const isPresent = this.favorites.find((f) => f.login === obj.login);
    if (isPresent) {
      this.favorites = this.favorites.filter((f) => f.login !== obj.login);
    } else {
      this.favorites.push(obj as UserList);
    }
    localStorage.setItem("favourites", JSON.stringify(this.favorites));
  }

  filterfavorites(searchterm: string) {
    this.favorites = this.favorites.filter((favorite) =>
      favorite.login.includes(searchterm)
    );
  }
}
