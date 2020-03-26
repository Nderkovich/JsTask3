export class TwitterAccounts {
    constructor() {
        this.elements = [];
    }

    push(twitterAccount) {
        if (!twitterAccount.category){
            twitterAccount.category = null;
        }
        this.elements.push(twitterAccount);
        // localStorage.setItem("storage", JSON.stringify(storage));
    }

    remove(twitterAccount) {
        this.elements.splice(this.elements.indexOf(twitterAccount), 1);
    }

    includes(twitterAccount) {
        return this.elements.includes(twitterAccount);
    }

    setCategoty(twitterAccount, category) {
        this.elements[this.elements.indexOf(twitterAccount)].category = category;
    }
}