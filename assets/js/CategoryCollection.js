export class CategoryCollection {
    constructor() {
        this.categories = [];
    }

    push(category) {
        this.categories.push(category);
        localStorage.setItem("categories", JSON.stringify(this.categories));
    }

    remove(category) {
        this.categories.splice(this.categories.indexOf(category), 1);
        localStorage.setItem("categories", JSON.stringify(this.categories));
    }

    includes(category) {
        return this.categories.includes(category);
    }
}