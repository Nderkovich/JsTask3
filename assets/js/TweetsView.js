export class TweetsView {
    constructor(user, tweets, elementNode) {
        this.user = user;
        this.tweets = tweets;
        this.elementNode = elementNode;
    }

    show() {
        this.elementNode.innerHTML = null;
        this.tweets.forEach(element => {
            this.elementNode.appendChild(this._renameTweet(this.user, element));
        })
    }

    _renameTweet(user, tweetData) {
        const tweetContainer = document.createElement("div");
        tweetContainer.className = "tweet";
        const tweetImage = `<img class="tweet_avatar" src="${user.profile_image_url}">`;
        tweetContainer.innerHTML += tweetImage;
        tweetContainer.appendChild(this._renameTweetContent(tweetData));
        if (tweetData.extended_entities) {
            if (tweetData.extended_entities.media.length > 0) {
                const images = this._getImage(tweetData.extended_entities.media)
                if (images) {
                    tweetContainer.appendChild(images);
                }
            }
        }

        return tweetContainer;
    }

    _renameTweetContent(tweetData) {
        const container = document.createElement("div");
        container.className = "tweet__content";
        const text = document.createElement("div");
        text.className = "tweet__text";
        text.innerText = tweetData.full_text;
        container.appendChild(text);

        return container;
    }

    _getImage(tweetMedia) {
        const imageContainer = document.createElement("div");
        imageContainer.className = "tweet__images";
        tweetMedia.forEach(element => {
            if (element.type == "photo") {
                const image = `<img src="${element.media_url}" class="tweet__image">`;
                imageContainer.innerHTML += image;
            }
        })
        if (imageContainer.innerHTML !== "") {
            return imageContainer;
        } else {
            return null;
        }
    }
}