$(document).ready(function () {

});
var LoginCookieName = "Login=";
var UserId = document.cookie.substring(document.cookie.indexOf(LoginCookieName) + LoginCookieName.length);



var loginuser;
var ChangePassword = function () {
    var pwd = {};
    pwd.Id = parseInt(UserId);
    pwd.CurrentPassword = $('#txtcurrentpswd').val();
    pwd.NewPassword = $('#txtnewpswd').val();
    pwd.Confirmpassword = $('#txtconfirmpswd').val();
    pwd.Email = $('#lblemail').text();
    console.log(pwd.Email);

    var request = pwd;
    $.ajax({
        type: "POST",
        url: "/Home/ChangePassword",
        data: request,
        dataType: "json",
        success: function (response) {
            if (response === true) {
                $('#msg').html("Password Changed").css("color","green");
            }
            else {
                $('#msg').html("Invalid Details").css("color","red");
            }
            

        },
        error: function (response) {
            alert("Invalid Details");
        }
    });
};

var Userprofile = function () {
    var lbl = "";
    $('#lblemail').html("");
    $.ajax({
        type: "POST",
        url: "/Home/GetEmail",
        dataType: "json",
        success: function (response) {
            var list = response;
            lbl += '<strong>' + list.Email + '</strong>';
            console.log(lbl);
            $('#lblemail').html(lbl);
        },
        error: function (response) {
            alert("Error while getting data");
        }
    });
};

