import { TwitterAccounts } from "./TwitterAccounts";

export class Storage {
    constructor() {
        if (localStorage.getItem("accounts") === null) {
            localStorage.setItem("accounts", JSON.stringify(new TwitterAccounts()));
        }
        if (localStorage.getItem("categories") === null) {
            localStorage.setItem("categories", JSON.stringify(new Array()));
        }
    }

    getAccounts() {
        return JSON.parse(localStorage.getItem("accounts")).elements;
    }

    getCategories() {
        return JSON.parse(localStorage.getItem("categories"))
    }

    save(name, item) {
        localStorage.setItem(name, JSON.stringify(item));
    }
}