var resultID = $("#resultID").val();
var batchID = $("#batchID").val();
// var timeout = $("#timeout").val();
$(document).ready(function() {
    // checkTime = "inTime";
    // checkTime = "NotYetTime";
    if(checkTime == "Timeout"){
       $("#is_timeout").show();
    } else if(checkTime == "NotYetTime"){
        $("#is_notYetTime").show();
    } else {
        $("#intime").show();
    }
});

$("#btn_join,#btn_dont_join").on('click',function () {
    var status = $(this).attr("status");

    var emp_code = $("#emp_code").val();
    if(!FormUtil.isEmpty(emp_code)){
        data = {
            batchId : batchID,
            resultIdTrainee : resultID,
            traineeCode : emp_code,
            status: status
        }
        AjaxUtils.get("/coursebatches/registerTrainee",data).complete(function (xhr) {
            if (xhr.readyState == 4) {
                if (xhr.responseText == 200) {
                    MessageUtil.alertBootBoxMessage({
                        title : Message.MSG_REGIS_SUCCESS,
                        buttons: {
                            cancel: {
                                label: Button.BUTTON_OK,
                                callback:function (){
                                    $("#emp_code").val("");
                                    $("#emp_name").val("");
                                }
                            }
                        }
                    });
                } else if (xhr.responseText == 216) {
                    MessageUtil.alertBootBoxMessage({
                        title : Message.MSG_EMP_CODE_INCORRECT,
                        buttons: {
                            cancel: {
                                label: Button.BUTTON_OK,
                                callback:function (){
                                    setTimeout(function () {
                                        $("#emp_code").focus();
                                    }, 100)

                                }
                            }
                        }
                    });
                    $("#emp_code").select();
                } else {
                    MessageUtil.alertBootBoxMessage({
                        title : Message.MSG_FAIL,
                        buttons: {
                            cancel: {
                                label: Button.BUTTON_OK,
                            }
                        }
                    });
                }
            }
        });
    }else {
        $("#emp_code").popover('show');
    }
})

function popupCourseClassDes() {
    AjaxUtils.get("/coursebatches/findTDRP20",{batchId:batchID}).complete(function (xhr) {
        var item = xhr.responseJSON;
        // console.log(item);
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                setTimeout(function () {
                    // console.log(window.session.lang);
                    $("#lb_course").html(Label.LABEL_COURSE + " : " + item.COURSE_NAME);
                    $("#lb_batch").html(Label.LABEL_BATCH + " : " + item.BATCH_NAME);
                    $("#lb_date").html(Label.LABEL_COURSE_DATE_TRAINING + " : " +(window.session.lang=="TH"?item.BATCH_START_COURSE_DATE_TH + " - " + item.BATCH_FINISH_COURSE_DATE_TH:item.BATCH_START_COURSE_DATE + " - " + item.BATCH_FINISH_COURSE_DATE));
                    $("#lb_hour").html(Label.LABEL_COURSE_AMOUNT_HOUR + " : " + item.PERIOD_NAME);
                    $("#p_course_detail").html(replaceString(item.COURSE_DETAIL));
                    $("#p_course_ocjective").html(replaceString(item.COURSE_OBJECTIVE));
                    $("#p_course_topic").html(replaceString(item.COURSE_STRUCTURE));
                    $("#p_course_batch_objective").html(replaceString(item.BATCH_COURSE_OBJECTIVE));
                    $("#p_course_location").html(replaceString(item.BATCH_LOCATION));
                    $("#p_course_department").html(replaceString(item.DEPARTMENT_TRAINING));
                    $("#p_course_target").html(replaceString(item.BATCH_TARGET_GROUP));
                    $("#p_course_trainer").html(replaceString(item.TRAINER));
                    $("#p_course_contact").html(replaceString(item.CONTACT));
                    $("#modal_course_detail").modal('show');
                }, 100)
            }
        }
    });
    // Label.LABEL_COURSE
    // Label.LABEL_BATCH
    // Label.LABEL_COURSE_DATE_TRAINING
    // Label.LABEL_COURSE_AMOUNT_HOUR
}

function replaceString(str) {
   return BeanUtils.isNull(str) ? "" : str.replace(/\n/g,"<br></br>")
}

$("#emp_code").on('keyup',function () {
    if(BeanUtils.isNotEmpty($("#emp_code").val())) {
        AjaxUtils.get("/coursebatches/findEmployeeByEmpCode", {empCode: $("#emp_code").val()}).complete(function (xhr) {
            var emp = xhr.responseJSON;
            if (BeanUtils.isNotNull(emp)) {
                $("#emp_name").val(emp.titleName.titleName + emp.thaiName + " " + emp.thaiLastName);
            } else {
                $("#emp_name").val("");
            }
        });
    }
});