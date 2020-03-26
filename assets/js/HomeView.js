import { TwitterApi } from "./TwitterApi"
import { TweetsView } from "./TweetsView"

export class HomeView {
    constructor(parentNode, observable, categories, key, secret) {
        this.parentNode = parentNode;
        this.observable = observable;
        this.twitterApi = new TwitterApi(key, secret);
        this.categories = categories;
    }

    show() {
        this.parentNode.innerHTML = null;
        this.observable.elements.forEach(element => {
            this.parentNode.appendChild(this._render(element));
        });
    }

    _render(twitterAccount) {
        let accountContainer = document.createElement("div");
        accountContainer.className = "twitter-account";
        let accountContent = this._renderContent(twitterAccount);
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
        let accountHeader = document.createElement("div");
        accountHeader.className = "twitter-account__header";
        let accountDeleter = document.createElement("span");
        accountDeleter.className = "twitter-account__delete";
        accountDeleter.onclick = () => {
            this.observable.remove(twitterAccount);
            localStorage.setItem("storage", JSON.stringify(this.observable));
            this.show();
        };
        accountHeader.appendChild(this._renderAccountName(twitterAccount));
        accountHeader.appendChild(this._renderCategoryChoice(twitterAccount));
        accountHeader.appendChild(accountDeleter);
        if (twitterAccount.category !== null){
            let category = document.createElement("div");
            category.className = "tweet__category";
            category.innerText = twitterAccount.category;
            accountHeader.appendChild(category);
        }
        return accountHeader;
    }

    _renderContent(twitterAccount) {
        let accountContent = document.createElement("div");
        accountContent.className = "twitter-account__content";
        accountContent.innerHTML = `
              <p>${twitterAccount.description}</p>
              <p>Tweets: ${twitterAccount.listed_count}</p>
              <p>Followers: ${twitterAccount.followers_count}</p>
          `;
        return accountContent;
    }

    _renderAccountName(twitterAccount) {
        let accountName = document.createElement("p");
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

    _renderCategoryChoice(twitterAccount){
        let choiceSelector = document.createElement("div");
        choiceSelector.className = "category__choice";
        choiceSelector.onclick = () => {
            if (choiceSelector.innerHTML == ""){
                let choiceList = document.createElement("div");
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

    _renderCategoryElement(twitterAccount, category){
        let option = document.createElement("div");
        option.className = "category__element";
        option.innerText = category;
        option.onclick = () => {
            this.observable.setCategoty(twitterAccount, category);
            localStorage.setItem("storage", JSON.stringify(this.observable));
            this.show();
        }

        return option;
    }
}