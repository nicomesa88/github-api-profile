var genParamString = function(paramObject) {
    var outputString = '?'
    for (var key in paramObject) {
        outputString += key + '=' + paramObject[key] + '&'
    }
    return outputString.substr(0,outputString.length - 1)
}

var name

try {
    var token = GLOBAL_TOKEN
}
catch (e) {
    var token = ''
}

console.log(name)

console.log('token>>> ' + token)

var url = 'https://api.github.com/users/nicomesa88/repos'
var userUrl = 'https://api.github.com/users/nicomesa88'

var params = {
    access_token: token
}

var promise = $.getJSON(url + genParamString(params))
var userPromise = $.getJSON(userUrl +genParamString(params))


var repoDataHandler = function(){

}


var userDataHandler = function(responsObj){
    console.log(responsObj)
    var userHtmlStr = ''
    var profilPic = responsObj.avatar_url
    var fullName = responsObj.name
    var usrName = responsObj.login
    var userBio = responsObj.bio
    var followers = responsObj.followers
    var following = responsObj.following
    //user's profile picture
    userHtmlStr += '<div class="portrait">'
    userHtmlStr += '<img src ="' + profilPic + '">'
    userHtmlStr += '</div>'
    //User's full name
    userHtmlStr += '<div class="userName">'
    userHtmlStr += '<div id="fullName"> ' + fullName + '</div>'
    //Github user name
    userHtmlStr += '<div id="userName">' + usrName + '</div>'
    userHtmlStr += '</div>'
    userHtmlStr += '<p></p>'
    //User Bio
    userHtmlStr += '<div id="usrBio">' + userBio + '</div>'
    userHtmlStr += '<hr>'
    userHtmlStr += '<hr>'
    //stats for followers, starred, and following
    userHtmlStr += '<div class="cardStats">'
    userHtmlStr += '<div class ="stats" id="followers">' + followers
    userHtmlStr += '<p id="statText">' + 'Followers' + '</p>'
    userHtmlStr += '</div>'
    userHtmlStr += '<div class ="stats" id="starred">' + '0'
    userHtmlStr += '<p id="statText">' + 'Starred' + '</p>'
    userHtmlStr += '</div>'
    userHtmlStr += '<div class ="stats" id="following">' + following
    userHtmlStr += '<p id="statText">' + 'Following' + '</p>'
    userHtmlStr += '</div>'
    userHtmlStr += '</div>'
    userHtmlStr += '<hr>'

    var leftContainer = document.querySelector("#leftCol")
    leftContainer.innerHTML = userHtmlStr
}

promise.then(repoDataHandler)
userPromise.then(userDataHandler)