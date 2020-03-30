const request = require("request");
const OAuth = require("oauth-1.0a");
const crypto = require("crypto");
import { CategoryCollection } from "./CategoryCollection";
import { CategoriesView } from "./CategoriesView";
import { HomeView } from "./HomeView";
import { TwitterAccounts } from "./TwitterAccounts";
import { Storage } from "./Storage"

//TwitterApi class is used to get bearer token
const KEY = "cuuPtExGpF3pS2IRINwGdyXRY";
const SECRET = "eGrMroNzVbgiF6nKM0n8IHbbWglbT5ougZcWUPGDbOERrUwjgq";


//Inititalize storage on start

const storage = new Storage();
const twitterAccounts = new TwitterAccounts();
const categoryCollection = new CategoryCollection(storage);
const homeView = new HomeView(document.getElementsByClassName("storage")[0], twitterAccounts, categoryCollection, KEY, SECRET, storage);
const categoriesView = new CategoriesView(document.getElementsByClassName("storage")[0], categoryCollection);

const savedTweets = storage.getAccounts();
const savedCategories = storage.getCategories();
if (savedTweets) {
    savedTweets.forEach(element => {
        twitterAccounts.push(element)
    })
    homeView.show();
}
if (savedCategories) {
    savedCategories.forEach(element => {
        categoryCollection.push(element)
    })
}


document.getElementById("home").onclick = () => {
    homeView.show();
}
document.getElementById("categories").onclick = () => {
    categoriesView.render();
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
    let query = document.getElementById("search").value;
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
            let dataJson = JSON.parse(body);
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
function CreateTwitterAccountsHTML(data) {
    const imgTag = `<img class="avatar" src='${data.profile_image_url}'></img>`;
    let nameTag;
    if (data.verified) {
        nameTag = `<p class="username_verified">${data.name}</p>`;
    } else {
        nameTag = `<p class="username">${data.name}</p>`;
    }
    const screenNameTag = `<p class="screen-name"> @${data.screen_name}</p>`;
    return `${imgTag}${nameTag}${screenNameTag}`;
}

//Box itself
function CreateTwitterContainer(data) {
    const twitterContainer = document.createElement("div");
    twitterContainer.className = "search-box__result";
    twitterContainer.innerHTML = CreateTwitterAccountsHTML(data);
    twitterContainer.data = data;
    twitterContainer.onclick = function () {
        if (!twitterAccounts.includes(this.data)) {
            twitterAccounts.push(this.data);
            storage.save("accounts", twitterAccounts);
            homeView.show();
        }
    };
    return twitterContainer;
}