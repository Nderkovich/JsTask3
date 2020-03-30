import { TwitterApi } from "./TwitterApi.js"
import { TweetsView } from "./TweetsView.js"

export class HomeView {
    constructor(parentNode, observable, categories, key, secret, storage) {
        this.parentNode = parentNode;
        this.observable = observable;
        this.twitterApi = new TwitterApi(key, secret);
        this.categories = categories;
        this.storage = storage;
    }

    show() {
        this.parentNode.innerHTML = null;
        this.observable.elements.forEach(element => {
            this.parentNode.appendChild(this._render(element));
        });
    }

    _render(twitterAccount) {
        const accountContainer = document.createElement("div");
        accountContainer.className = "twitter-account";
        const accountContent = this._renderContent(twitterAccount);
        accountContainer.appendChild(this._renderHeader(twitterAccount));
        accountContainer.appendChild(accountContent);
        accountContainer.onclick = () => {
            if (accountContent.style.display === "block") {
                accountContent.style.display = "none";
                accountContainer.style.height = "50px";
            } else {
                accountContent.style.display = "block";
                accountContainer.style.height = "250px";
            }
        };
        return accountContainer;
    }

    _renderHeader(twitterAccount) {
        const accountHeader = document.createElement("div");
        accountHeader.className = "twitter-account__header";
        const accountDeleter = document.createElement("span");
        accountDeleter.className = "twitter-account__delete";
        accountDeleter.onclick = () => {
            this.observable.remove(twitterAccount);
            this.storage.save("accounts", this.observable);
            this.show();
        };
        accountHeader.appendChild(this._renderAccountName(twitterAccount));
        accountHeader.appendChild(this._renderCategoryChoice(twitterAccount));
        accountHeader.appendChild(accountDeleter);
        if (twitterAccount.category !== null) {
            const category = document.createElement("div");
            category.className = "tweet__category";
            category.innerText = twitterAccount.category;
            accountHeader.appendChild(category);
        }
        return accountHeader;
    }

    _renderContent(twitterAccount) {
        const accountContent = document.createElement("div");
        accountContent.className = "twitter-account__content";
        accountContent.innerHTML = `
              <p>${twitterAccount.description}</p>
              <p>Tweets: ${twitterAccount.listed_count}</p>
              <p>Followers: ${twitterAccount.followers_count}</p>
          `;
        return accountContent;
    }

    _renderAccountName(twitterAccount) {
        const accountName = document.createElement("p");
        accountName.className = "twitter-account__name";
        accountName.innerText = `${twitterAccount.name}`;
        accountName.onclick = () => {
            this.twitterApi.getUserTweets(twitterAccount.id)
                .then(response => response.json())
                .then(data => {
                    const tweet = new TweetsView(twitterAccount, data, this.parentNode);
                    tweet.show();
                })
        };

        return accountName;
    }

    _renderCategoryChoice(twitterAccount) {
        const choiceSelector = document.createElement("div");
        choiceSelector.className = "category__choice";
        choiceSelector.onclick = () => {
            if (choiceSelector.innerHTML == "") {
                const choiceList = document.createElement("div");
                choiceList.className = "category__list";
                this.categories.categories.forEach(element => {
                    choiceList.appendChild(this._renderCategoryElement(twitterAccount, element));
                })
                choiceSelector.appendChild(choiceList);
            } else {
                choiceSelector.innerHTML = "";
            }
        }
        return choiceSelector;
    }

    _renderCategoryElement(twitterAccount, category) {
        const option = document.createElement("div");
        option.className = "category__element";
        option.innerText = category;
        option.onclick = () => {
            this.observable.setCategoty(twitterAccount, category);
            this.storage.save("accounts", this.observable);
            this.show();
        }

        return option;
    }
}