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

promis.then(repoDataHandler)
userPromise.then(userDataHandler)