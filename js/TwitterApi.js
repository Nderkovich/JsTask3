export class TwitterApi {
    constructor(KEY, SECRET) {
        this.KEY = KEY;
        this.SECRET = SECRET;
        this._getToken();
    }

    _getToken() {
        const b64Token = btoa(`${this.KEY}:${this.SECRET}`);
        const xhttp = new XMLHttpRequest();
        xhttp.open("POST", "https://api.twitter.com/oauth2/token");
        xhttp.setRequestHeader("Authorization", `Basic ${b64Token}`);
        xhttp.setRequestHeader(
            "Content-Type",
            "application/x-www-form-urlencoded;charset=UTF-8"
        );
        xhttp.send("grant_type=client_credentials");
        xhttp.onload = () => {
            if (xhttp.status === 200) {
                this.token = (JSON.parse(xhttp.responseText)).access_token;
            }
        };
    }

    getUserTweets(id) {
        return fetch(`https://api.twitter.com/1.1/statuses/user_timeline.json?id=${id}&tweet_mode=extended`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${this.token}`
            },
            credentials: "same-origin"
        })
    }
}