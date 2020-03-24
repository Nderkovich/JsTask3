const request = require("request");
const OAuth = require("oauth-1.0a");
const crypto = require("crypto");

var KEY = "cuuPtExGpF3pS2IRINwGdyXRY";
var SECRET = "eGrMroNzVbgiF6nKM0n8IHbbWglbT5ougZcWUPGDbOERrUwjgq";

//TwitterApi class is used to get bearer token
class TwitterApi {
  constructor(KEY, SECRET) {
    this.KEY = KEY;
    this.SECRET = SECRET;
    this._GetToken();
  }

  _GetToken() {
    let b64Token = btoa(`${KEY}:${SECRET}`);
    let xhttp = new XMLHttpRequest();
    xhttp.open("POST", "https://api.twitter.com/oauth2/token");
    xhttp.setRequestHeader("Authorization", `Basic ${b64Token}`);
    xhttp.setRequestHeader(
      "Content-Type",
      "application/x-www-form-urlencoded;charset=UTF-8"
    );
    xhttp.send("grant_type=client_credentials");
    let twitter = this;
    xhttp.onload = function () {
      if (xhttp.status == 200) {
        twitter.token = (JSON.parse(xhttp.responseText)).access_token;
      }
    };
  }

  GetUserTweets(id) {
    let token = this.token;
    return fetch(`https://api.twitter.com/1.1/statuses/user_timeline.json?id=${id}&tweet_mode=extended`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      },
      credentials: "same-origin"
    })
  }
}

var twitterApi = new TwitterApi(KEY, SECRET);

//Storage class is used to represent users selected accounts
class Storage {
  constructor(elementNode) {

    if (elementNode == null) {
      this.elements = null;
      this.elementNode = null;
    } else {
      this.elements = new Array();
      this.elementNode = elementNode;
    }
  }

  show() {
    this.elementNode.innerHTML = null;
    this.elements.forEach(element => {
      this.elementNode.appendChild(this._create(element));
    });
  }

  push(twitterAccount) {
    this.elements.push(twitterAccount);
    localStorage.setItem("storage", JSON.stringify(storage));
    this.show();
  }

  remove(twitterAccount) {
    this.elements.splice(this.elements.indexOf(twitterAccount), 1);
    localStorage.setItem("storage", JSON.stringify(storage));
    this.show();
  }

  includes(twitterAccount) {
    return this.elements.includes(twitterAccount);
  }

  _create(twitterAccount) {
    let accountContainer = document.createElement("div");
    accountContainer.className = "twitter-account";
    let accountContent = this._createContent(twitterAccount);
    accountContainer.appendChild(this._createHeader(twitterAccount));
    accountContainer.appendChild(accountContent);
    accountContainer.onclick = function () {
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

  _createHeader(twitterAccount) {
    let accountHeader = document.createElement("div");
    accountHeader.className = "twitter-account__header";
    let accountDeleter = document.createElement("span");
    accountDeleter.className = "twitter-account__delete";
    let storage = this;
    accountDeleter.onclick = function () {
      storage.remove(twitterAccount);
    };
    accountHeader.appendChild(this._createAccountName(twitterAccount));
    accountHeader.appendChild(accountDeleter);
    return accountHeader;
  }

  _createContent(twitterAccount) {
    let accountContent = document.createElement("div");
    accountContent.className = "twitter-account__content";
    accountContent.innerHTML = `
            <p>${twitterAccount.description}</p>
            <p>Tweets: ${twitterAccount.listed_count}</p>
            <p>Followers: ${twitterAccount.followers_count}</p>
        `;
    return accountContent;
  }

  _createAccountName(twitterAccount) {
    let accountName = document.createElement("p");
    accountName.className = "twitter-account__name";
    accountName.innerText = `${twitterAccount.name}`;
    let node = this.elementNode;
    accountName.onclick = function () {
      twitterApi.GetUserTweets(twitterAccount.id).then(response => response.json()).then(data => {
        var tweet = new Tweets(twitterAccount, data, node);
        tweet.show();
      })
    };
    return accountName;
  }
}


//Tweets class is used to display tweet
class Tweets {
  constructor(user, tweets, elementNode) {
    this.user = user;
    this.tweets = tweets;
    this.elementNode = elementNode;
  }

  show() {
    this.elementNode.innerHTML = null;
    this.tweets.forEach(element => {
      this.elementNode.appendChild(this._createTweet(this.user, element));
    })
  }

  _createTweet(user, tweetData) {
    let tweetContainer = document.createElement("div");
    tweetContainer.className = "tweet";
    let tweetImage = `<img class="tweet_avatar" src="${user.profile_image_url}">`;
    tweetContainer.innerHTML += tweetImage;
    tweetContainer.appendChild(this._createTweetContent(tweetData));
    if (tweetData.extended_entities) {
      if (tweetData.extended_entities.media.length > 0) {
        let images = this._getImage(tweetData.extended_entities.media)
        if (images) {
          tweetContainer.appendChild(images);
        }
      }
    }
    return tweetContainer;
  }

  _createTweetContent(tweetData) {
    let container = document.createElement("div");
    container.className = "tweet__content";
    let text = document.createElement("div");
    text.className = "tweet__text";
    text.innerText = tweetData.full_text;
    container.appendChild(text);
    return container;
  }

  _getImage(tweetMedia) {
    let imageContainer = document.createElement("div");
    imageContainer.className = "tweet__images";
    tweetMedia.forEach(element => {
      if (element.type == "photo") {
        let image = `<img src="${element.media_url}" class="tweet__image">`;
        imageContainer.innerHTML += image;
      }
    })
    if (imageContainer.innerHTML != "") {
      return imageContainer;
    } else {
      return null;
    }
  }
}


//Inititalize storage on start
if (localStorage.getItem("storage") === null) {
  localStorage.setItem("storage", JSON.stringify(new Storage()));
}

var storage = new Storage(document.getElementsByClassName("storage")[0]);
let saved = JSON.parse(localStorage.getItem("storage")).elements;
if (saved) {
  saved.forEach(element =>
    storage.push(element));
  storage.show();
}
document.getElementsByClassName("home")[0].onclick = function () {
  storage.show();
}



// Initialize OAuth
const oauth = OAuth({
  consumer: {
    key: "cuuPtExGpF3pS2IRINwGdyXRY",
    secret: "eGrMroNzVbgiF6nKM0n8IHbbWglbT5ougZcWUPGDbOERrUwjgq"
  },
  signature_method: "HMAC-SHA1",
  hash_function(base_string, key) {
    return crypto
      .createHmac("sha1", key)
      .update(base_string)
      .digest("base64");
  }
});

const token = {
  key: "1002634399349911552-TbVhweati3eLN5hZq59mGixlnRmMxe",
  secret: "6k03QnGvpwj9Fm5nFxYyKGOWZEJj0Xxnff0R8Vdgmlr1c"
};


//Start search when user press key
document.getElementById("search").onkeyup = function () {
  query = document.getElementById("search").value;
  if (query.length === 0) {
    document.getElementsByClassName("search-box")[0].innerHTML = null;
    return;
  }
  let request_data = {
    url: `https://api.twitter.com/1.1/users/search.json?q=${query}&count=6`,
    method: "GET"
  };
  request({
      url: request_data.url,
      method: request_data.method,
      form: request_data.data,
      headers: oauth.toHeader(oauth.authorize(request_data, token))
    },
    function (error, response, body) {
      document.getElementsByClassName("search-box")[0].innerHTML = null;
      dataJson = JSON.parse(body);
      if (dataJson.length > 0)
        dataJson.forEach(element => {
          document
            .getElementsByClassName("search-box")[0]
            .appendChild(CreateTwitterContainer(element));
        });
    }
  );
};

//Search box elements

//Twitter account
function CreateTwitterAccountHTML(data) {
  let imgTag = `<img class="avatar" src='${data.profile_image_url}'></img>`;
  let nameTag;
  if (data.verified) {
    nameTag = `<p class="username_verified">${data.name}</p>`;
  } else {
    nameTag = `<p class="username">${data.name}</p>`;
  }
  let screeNameTag = `<p class="screen-name"> @${data.screen_name}</p>`;
  return `${imgTag}${nameTag}${screeNameTag}`;
}

//Box itself
function CreateTwitterContainer(data) {
  let twitterContainer = document.createElement("div");
  twitterContainer.className = "search-box__result";
  twitterContainer.innerHTML = CreateTwitterAccountHTML(data);
  twitterContainer.data = data;
  twitterContainer.onclick = function () {
    if (!storage.includes(this.data)) {
      storage.push(this.data);
    }
  };
  return twitterContainer;
}