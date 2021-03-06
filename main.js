const localhost = 'http://localhost:3000'

function login(event) {
    event.preventDefault()
    $.ajax({
            method: 'POST',
            url: `${localhost}/users/login`,
            data: {
                email: $('#email-login').val(),
                password: $('#password-login').val()
            }
        }).done(response => {
            localStorage.setItem('token', response.access_token)
            showDashboard()
        })
        .fail(function(err) {
            console.log(err, 'it is an error')
            err.responseJSON.forEach(el => {
                $('#alert').append(`${el}<br>`)
                $('#alert').fadeTo(2000, 500).slideUp(500, function() {
                    $("#alert").slideUp(500);
                    $('#alert').empty()
                })
            })
        })
}

function register(event) {
    event.preventDefault()
    $.ajax({
        method: 'POST',
        url: `${localhost}/users/register`,
        data: {
            email: $(`#email-register`).val(),
            password: $(`#password-register`).val()
        }
    }).done(response => {
        // localStorage.setItem('token', )
        $('#success').append(`${response.email} ${response.msg}`)
        $('#success').fadeTo(2000, 500).slideUp(500, function() {
            $("#success").slideUp(500);
            $('#success').empty()
        })
        showLandingPage()
    }).fail(function(err) {
        console.log(err, 'it is an error')
        err.responseJSON.forEach(el => {
            $('#alert').append(`${el}<br>`)
            $('#alert').fadeTo(2000, 500).slideUp(500, function() {
                $("#alert").slideUp(500);
                $('#alert').empty()
            })
        })
    })
}

function showLandingPage() {
    $('#landing-page').show()
    $('#register-page').hide()
    $('#dashboard').hide()
}

function showDashboard() {
    $('#landing-page').hide()
    $('#register-page').hide()
    $('#dashboard').show()
    generate()
}

function showRegister(event) {
    $('#landing-page').hide()
    $('#register-page').show()
    $('#dashboard').hide()
}

function showFav(event) {
    event.preventDefault()
    $('#favorites').show()
    $('#generated').hide()
    $('#generator').hide()
}

function generate(event) {
    event.preventDefault()
    $('#favorites').hide()
    $('#generated').show(function() {
        $.ajax({
            method: 'GET',
            url: `${localhost}/meme`, 
            headers: {
                access_token: localStorage.token
            }
        }).done(response => {
            console.log(response.data)
            $('#meme').empty()
            $('#meme').append(` <img src="${response.data.url}"> `)
        })
        $.ajax({
            method: 'GET',
            url: `${localhost}/recipe`, 
            headers: {
                access_token: localStorage.token
            }
        }).done(response => {
            console.log(response.data)
            $('#recipe').empty()
            $('#recipe-img').empty()
            $('#recipe-ingredients').empty()

            $('#recipe').append(` ${response.data.title}`)
            $('#recipe-img').append(` <img src="${response.data.thumbnail}">`)
            $('#recipe-ingredients').append(` ${response.data.ingredients}`)

        })
        $.ajax({
            method: 'GET',
            url: `${localhost}/music`, 
            headers: {
                access_token: localStorage.token
            }
        }).done(response => {
            console.log(response.data)
            $('#music').empty()
            $('#music-src').empty()
            $('#music').append(` ${response.data.title} by: ${response.data.contributors[0].name} `)
            $('#music-src').append(` <a href="${response.data.preview}">Play</a> <a href="${response.data.link}">Original Source</a> `)
                // $('#music-preview').append(`  `)

        })
        console.log('a')
        console.log('b')
        console.log('c')
    })
    $('#generator').show()
    console.log('d')
    console.log('e')
}

function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    // console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    // console.log('Full Name: ' + profile.getName());
    // console.log('Given Name: ' + profile.getGivenName());
    // console.log('Family Name: ' + profile.getFamilyName());
    // console.log("Image URL: " + profile.getImageUrl());
    // console.log("Email: " + profile.getEmail());

    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    // console.log("ID Token: " + id_token);

    $.ajax({
            method: "POST",
            url: `${localhost}/users/googleSign`
        }).done(function(response) {
            console.log({
                response: response,
                msg: "Sent google token to server. Received server token."
            })
            localStorage.setItem("token", response.token)
            showDashboard()
        })
        .fail(function(err) {
            console.log(err, "<= It's an error on google signin")
            err.responseJSON.forEach(el => {
                $('#alert').append(`${el}<br>`)
                $('#alert').fadeTo(2000, 500).slideUp(500, function() {
                    $("#alert").slideUp(500);
                    $('#alert').empty()
                })
            })
        })
}

function testUser(event) {
    event.preventDefault()
    localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJiQGIuY29tIiwiaWF0IjoxNTg1ODg5MzcwfQ.MBCno3sXBRU9zGzkG5z8Yw7RrD59BJqqkP8fDbmtbN4')
    showDashboard()
}

function logout(event) {
    event.preventDefault()
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function() {
        console.log('User signed out.');
    });

    localStorage.clear()
    showLandingPage()
}

$(document).ready(function() {
    $('#alert').hide()
    $('#success').hide()
    let token = localStorage.getItem('token')
    if (!token) {
        showLandingPage()
    } else {
        showDashboard()
    }

})