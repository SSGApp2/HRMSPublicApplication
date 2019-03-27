var resultID = $("#resultID").val();
// var timeout = $("#timeout").val();
$(document).ready(function() {
    // checkTime = "NotYetTime";
    if(checkTime == "Timeout"){
       $("#is_timeout").show();
    }else if(checkTime == "NotYetTime"){
        $("#is_notYetTime").show();
    } else {
        $("#intime").show();
    }
});

$("#btn_confirm").on('click',function () {
    var emp_code = $("#emp_code").val();
    if(!FormUtil.isEmpty(emp_code)){
        data = {
            resultIdTrainee : resultID,
            traineeCode : emp_code,
        }
        AjaxUtils.get("/coursebatches/confirmTrainee",data).complete(function (xhr) {
            if (xhr.readyState == 4) {
                if (xhr.responseText == 200) {
                    MessageUtil.alertBootBoxMessage({
                        title : Message.MSG_CONFIRM_SUCCESS,
                        buttons: {
                            cancel: {
                                label: Button.BUTTON_OK
                            }
                        }
                    });
                } else if (xhr.responseText == 216) {
                    MessageUtil.alertBootBoxMessage({
                        title : Message.MSG_EMP_CODE_INCORRECT,
                        buttons: {
                            cancel: {
                                label: Button.BUTTON_OK,
                            }
                        }
                    });
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