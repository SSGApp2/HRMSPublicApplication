var mapProvince = {};
var mapDistrict = {};

$(document).ready(function() {
    $("#province").isLovComboBox();
    $("#district").isLovComboBox();
    $("#sub_district").isLovComboBox();
    findAllProvince();
});

function findAllProvince() {
    var data = $.ajax({
        type: "GET",
        url: session['context'] + '/register/findAllProvince',
        async: false
    }).responseText;
    var jsonData = JSON.parse(data);
    $.each(jsonData,function (index,item) {
        mapProvince[item.provinceName.trim()] = item.provinceCode;
    });
}

$("#province").change(function(){
    if($("#province").val().length > 0){
        var districData = findDistricByProvinceCode(mapProvince[$("#province").val()]);
        $("#spanSelectDistrict").empty();
        $("#spanSelectDistrict").append('<select id="district" type="select" class="form-control validate" onchange="getSubDistrictEdit($(this).val())">');
        $.each(districData,function( index,value ) {
            $("#district").append("<option value='" + value.districName.trim() + "'>" + value.districName + "</option>");
            mapDistrict[value.districName.trim()] = value.districCode;
        });
    }
    $("#district").isLovComboBox();
    $("#district").change();
});

function findDistricByProvinceCode(provinceCode){
    var data = $.ajax({
        type: "GET",
        url: session['context'] + '/register/findDistricByProviceCode',
        data : {
            provinceCode : provinceCode
        },
        async: false
    }).responseJSON;
    return data;
}

function getSubDistrictEdit(value) {
    console.info(value);
    if(value.length > 0){
        var data = getSubDistrictByDistrictCode(mapDistrict[value]);
        $("#spanSubDistrict").empty();
        $("#spanSubDistrict").append('<select id="sub_district" class="form-control validate" type="select">');
        $.each(data, function (index,item) {
            $("#sub_district").append("<option value='" + item.subDistrictName.trim() + "'>" + item.subDistrictName + "</option>");
        });
        $("#sub_district").isLovComboBox();
    }
}

function getSubDistrictByDistrictCode(code){
    var data = $.ajax({
        type: "GET",
        url: session['context'] + '/register/getSubDistrictByDistrictCode/'+code,
        async: false
    }).responseJSON;
    return data;
}

$('#btn_save').on('click',function () {

    var validate = true;
    $("input.validate,select.validate").each(function(index) {
        if(BeanUtils.isEmpty($(this).val())){
            if($(this).prop('nodeName') == "INPUT"){
                $(this).popover('show');
            } else {
                $(this).parent().popover('show');
            }
            validate = false;
            return false;
        }
    });

    if(validate){
        data = {
            customerThaiName : $('#com_name_th').val(),
            customerEngName : $('#com_name_en').val(),
            ouThaiName : $('#branch_name_th').val(),
            ouEngName : $('#branch_name_en').val(),
            building : $('#building').val(),
            room : $('#room').val(),
            floor : $('#floor').val(),
            officeNo : $('#house_no').val(),
            moo : $('#moo').val(),
            village : $('#village').val(),
            alley : $('#soi').val(),
            road : $('#road').val(),
            province : $('#province').val(),
            district : $('#district').val(),
            subDistrict : $('#sub_district').val(),
            postCode : $('#zip_code').val(),
            ouTel : $('#tel_no').val(),
            fax : $('#fax').val(),
        }

        AjaxUtils.post("/register/customerRegistry",JSON.stringify(data)).complete(function (xhr) {
            console.log(xhr);
            if(xhr.status == 200){
                var result = xhr.responseJSON;
                $('#div_register').hide();
                $('#div_regis_success').show();
                $('#username').text(LABEL.LABEL_USERNAME+" : "+result.username);
                $('#password').text(LABEL.LABEL_PASSWORD+" : "+result.password);
            } else {
                console.log("Fail");
            }

        });

    }
});

$('#link_login').on('click',function () {
    var url = "http://"+window.location.hostname+":"+window.location.port+"/HRMS";
    window.location.href = url;
});
