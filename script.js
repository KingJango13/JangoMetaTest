async function getShortToken(authCode){
    var res = await fetch(`https://api.instagram.com/oauth/access_token?client_id=${localStorage.ig_app_id}&client_secret=83e5d9b15307cb33857609325165c61d&code=${authCode}&grant_type=authorization_code&redirect_uri=https://kingjango13.github.io/JangoMetaTest/auth/`,{
        method: "POST"
    });
    var data = await res.json();
    return data.access_token;
}

async function getLongToken(shortToken){
    var res = await fetch(`https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=83e5d9b15307cb33857609325165c61d&access_token=${shortToken}`, {
        method: "POST"
    });
    var data = await res.json();
    localStorage.ig_token_expiration = Date.now() + (data.expires_in * 1000);
    localStorage.jango_ig_token = data.access_token;
}

async function refreshToken(){
    var res = await fetch(`https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${localStorage.jango_ig_token}`, {
        method: "POST"
    });
    var data = await res.json();
    localStorage.ig_token_expiration = Date.now() + (data.expires_in * 1000);
    localStorage.jango_ig_token = data.access_token;
}
