const request = require("request");
const OAuth = require("oauth-1.0a");
const crypto = require("crypto");

class Storage {
  constructor(elementNode) {
    this.elements = new Array();
    this.elementNode = elementNode;
  }

  show() {
    this.elementNode.innerHTML = null;
    this.elements.forEach(element => {
      this.elementNode.appendChild(this._create(element));
    });
  }

  push(twitterAccount) {
    this.elements.push(twitterAccount);
    this.show();
  }

  remove(twitterAccount) {
    this.elements.splice(this.elements.indexOf(twitterAccount), 1);
    this.show();
  }

  includes(twitterAccount) {
    return this.elements.includes(twitterAccount);
  }

  _create(twitterAccount) {
    console.log(twitterAccount);
    let accountContainer = document.createElement("div");
    accountContainer.className = "twitter-account";
    let accountContent = this._createContent(twitterAccount);
    accountContainer.appendChild(this._createHeader(twitterAccount));
    accountContainer.appendChild(accountContent);
    accountContainer.onclick = function() {
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
    let accountName = `<p class="twitter-account__name">${twitterAccount.name}</p>`;
    let accountDeleter = document.createElement("span");
    accountDeleter.className = "twitter-account__delete";
    let storage = this;
    accountDeleter.onclick = function() {
      storage.remove(twitterAccount);
    };
    accountHeader.innerHTML = accountName;
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
}

var storage = new Storage(document.getElementsByClassName("storage")[0]);

// Initialize
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

document.getElementById("search").onkeyup = function() {
  query = document.getElementById("search").value;
  if (query.length === 0) {
    document.getElementsByClassName("search-box")[0].innerHTML = null;
    return;
  }
  let request_data = {
    url: `https://api.twitter.com/1.1/users/search.json?q=${query}&count=6`,
    method: "GET"
  };
  request(
    {
      url: request_data.url,
      method: request_data.method,
      form: request_data.data,
      headers: oauth.toHeader(oauth.authorize(request_data, token))
    },
    function(error, response, body) {
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

function CreateTwitterContainer(data) {
  let twitterContainer = document.createElement("div");
  twitterContainer.className = "search-box__result";
  twitterContainer.innerHTML = CreateTwitterAccountHTML(data);
  twitterContainer.data = data;
  twitterContainer.onclick = function() {
    if (!storage.includes(this.data)) {
      storage.push(this.data);
    }
  };
  return twitterContainer;
}
