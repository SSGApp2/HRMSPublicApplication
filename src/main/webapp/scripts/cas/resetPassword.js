var casPath = "https://172.16.0.145:8448/cas-server";

$("#f_email").keypress(function(event){
    var ew = event.which;
    if(ew == 32)
        return true;
    if(45 <= ew && ew <= 46)
        return true;
    if(48 <= ew && ew <= 57)
        return true;
    if(64 <= ew && ew <= 90)
        return true;
    if(ew == 95)
        return true;
    if(97 <= ew && ew <= 122)
        return true;
    return false;
});

$(document).ajaxStop(function() {
    $('.dv-background').hide();
});

$(document).ajaxStart(function() {
    $('.dv-background').show();
});

$(document).ready(function () {
    $('body').css('background-image',"url("+casPath+"/images/bg.jpg)");
    $('#img_logo').attr('src', casPath+"/images/square-logo.png");

    AjaxUtils.get("/resetpassword/findParameterCas").complete(function (xhr) {
        var parameterCas = xhr.responseJSON;
        if(BeanUtils.isNotEmpty(parameterCas)){
            casPath = "https://"+parameterCas.parameterValue3+"/cas-server";
        }
    });
});

function openLoginForm() {
    // location.href = casPath+'/login';
    location.href = '/HRMS';
}

function resetPassword() {
    $('#msg_email_error').hide();
    $('#msg_email_success').hide();
    $('.br_msg').hide();
    var email = $('#f_email').val().trim();
    if (email.length > 0) {
        if (isEmail(email)) {
            $('#f_email').popover('destroy');
            updatePasswordByEmail(email);
        } else {
            $('#msg_email_error').text('รูปแบบอีเมล์ไม่ถูกต้อง');
            $('#msg_email_error').show();
            $('.br_msg').show();
            $('#f_email').focus();
        }
    } else {
        $('#f_email').popover().click();
    }
}

function updatePasswordByEmail(email) {
    var responseData = "";
    AjaxUtils.get("/resetpassword/resetPasswordCas",{email : email}).complete(function (xhr) {
        responseData = xhr.responseText;
        if(responseData == '"Success"'){
            $('#msg_email_success').text('รีเซ็ทรหัสผ่านสำเร็จ');
            $('#msg_email_success').show();
            $('.br_msg').show();
        } else if(responseData == '"Not Found"') {
            $('#msg_email_error').text('ไม่พบอีเมล์นี้ในระบบ กรุณากรอกอีเมล์ให้ถูกต้อง');
            $('#msg_email_error').show();
            $('.br_msg').show();
            $('#f_email').focus();
        } else {
            $('#msg_email_error').text('ผิดพลาด');
            $('#msg_email_error').show();
            $('.br_msg').show();
        }
    });
    // $.ajax({
    //     url: HRMSService+"/appusers/resetPasswordCas/"+email,
    //     data : {
    //         email : email
    //     },
    //     jsonp: "callbackChangePassword",
    //     dataType : "jsonp",
    //     async: false
    // });
    // return result;
}

function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

