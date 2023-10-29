import { makeAutoObservable } from "mobx";

export default class App {
  users: any[] = [];
  selectedUser: any;
  constructor() {
    makeAutoObservable(this);
  }
}
