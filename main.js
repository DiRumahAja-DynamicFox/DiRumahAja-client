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
    })
    .fail(function(err) {
        console.log(err, 'it is an error')
        err.responseJSON.forEach(el => {
            $('#alert').append(`${el}<br>`)
            $('#alert').fadeTo(2000, 500).slideUp(500, function(){
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
            $('#success').fadeTo(2000, 500).slideUp(500, function(){
                $("#success").slideUp(500);
                $('#success').empty()
            })
    }).fail(function(err) {
        console.log(err, 'it is an error')
        err.responseJSON.forEach(el => {
            $('#alert').append(`${el}<br>`)
            $('#alert').fadeTo(2000, 500).slideUp(500, function(){
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
    $('#favorites').hide()
}

function showRegister(event) {
    $('#landing-page').hide()
    $('#register-page').show()
    $('#dashboard').hide()
}

function showFav() {
    $('#favorites').show()
    $('#generated').hide()
    $('#generator').hide()
}

function generate() {
    $('#favorites').hide()
    $('#generated').show()
    $('#generator').show()
}

$(document).ready(function() {
    $('#alert').hide()
    $('#success').hide()
    let token = localStorage.getItem('token')
    if(!token) { 
        showLandingPage()
    }

})