var genParamString = function(paramObject) {
    var outputString = '?'
    for (var key in paramObject) {
        if (key === "access_token" && !paramObject[key]) {
            continue
        }
        outputString += key + '=' + paramObject[key] + '&'
    }
    return outputString.substr(0,outputString.length - 1)
}

var name

//work around for github API token
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

var repoPromise = $.getJSON(url + genParamString(params))
var userPromise = $.getJSON(userUrl +genParamString(params))


var container = document.querySelector("#container")
var leftContainer = document.querySelector("#leftCol")
var rightContainer = document.querySelector("#rightCol")

//Construst user data info

var userDataHandler = function(responsObj){
    console.log(responsObj)

    //create an empty string
    var userHtmlStr = ''

    //get info from API
    var profilPic = responsObj.avatar_url
    var fullName = responsObj.name
    var usrName = responsObj.login
    var userBio = responsObj.bio
    var followers = responsObj.followers
    var following = responsObj.following
    var userLocation = responsObj.location
    if (!userLocation) {
        userLocation == ''
    }
    var userEmail = responsObj.email
    if (!userEmail) {
        userEmail = ''
    }
    var joined = responsObj.created_at

    //modify date to show
    var d = new Date(joined),
        dstring = d.toDateString(),
        newdString = dstring.substring(3),
        dateArray = newdString.split(' ')
        var newArray = []
        var addComma = dateArray[2] + ','
        joinDate = dateArray[1] + ' ' +  addComma + ' ' + dateArray[3]

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
    userHtmlStr += '<ul class ="details">'
    userHtmlStr += '<li id ="userLocation">' + userLocation + '</li>'
    userHtmlStr += '<li> <a href="' + userEmail + '">' + responsObj.email + '</a>'+ '</li>'
    userHtmlStr += '<li id ="joined"> Joined on ' + joinDate + '</li>'
    userHtmlStr += '</ul>'
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

    //place userHtmlStr into left container
    leftContainer.innerHTML = userHtmlStr
}

//Construct repo data info

var repoDataHandler = function(repoAry){
    var repoHtmlStr = ''
    for (var i = 0; i < repoAry.length; i++){
        var repoObj = repoAry[i],
            repoName = repoObj.name,
            repoDescription = repoObj.descrpition,
            repoUpdate = repoObj.updated_at
        if (!repoDescription) {
            repoDescription = ''
        }

        var timeNow = new Date();
            var timeNowMilsec = timeNow.getTime();
            var repoUpdateTime = new Date (repoUpdate)
            var repoUpdateTimeMilsec = repoUpdateTime.getTime();
            var repoElapsedTime = timeNowMilsec - repoUpdateTimeMilsec

            var elapsedTime = function (milSecs) {
                var s = 1000,
                    m = s * 60,
                    h = m * 60,
                    d = h * 24,
                    m = d * 31,
                    y = m * 12

                var secs = Math.floor(milSecs/s) + " sec",
                    mins = Math.floor(milSecs/(m)) + " min",
                    hrs = Math.floor(milSecs/(h)) + " hr",
                    days = Math.floor(milSecs/(d)) + " day",
                    mos = Math.floor(milSecs/(m)) + " mo",
                    yrs = Math.floor(milSecs/(y)) + " yr"

                var timeArray = [yrs, mos, days, hrs, mins, secs]

                for(var i = 0; i < timeArray.length; i++) {
                    if (parseInt(timeArray[i]) !== 0) {

                        if(parseInt(timeArray[i]) >= 2) {
                            return "Updated" + '  ' + timeArray[i] + "s ago"
                        }
                        else if (parseInt(timeArray[i]) < 2) {
                                return "Updated" + '  ' + timeArray[i] + " ago"
                        }
                    }

                }

            }

            var newRepoUpdateTime = elapsedTime(repoElapsedTime)

        repoHtmlStr += '<ul class = "repoInfo">'
        repoHtmlStr += '<h1 class = "repoName">' + repoName + '</h1>'
        repoHtmlStr += '<p class="description">' + repoDescription + '</p>'
        repoHtmlStr += '<p class="update">' + newRepoUpdateTime + '</p>'
        repoHtmlStr += '<hr>'

    }
    rightContainer.innerHTML = repoHtmlStr
}

repoPromise.then(repoDataHandler)
userPromise.then(userDataHandler)