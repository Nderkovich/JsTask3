export class CategoryCollection {
    constructor(storage) {
        this.categories = [];
        this.storage = storage;
    }

    push(category) {
        this.categories.push(category);
        this.storage.save("categories", this.categories);
    }

    remove(category) {
        this.categories.splice(this.categories.indexOf(category), 1);
        this.storage.save("categories", this.categories);
    }

    includes(category) {
        return this.categories.includes(category);
    }
}