var factor = [];
var pageData;
$(document).ready(function() {
    AjaxUtils.get("/coursebatches/findDataForEvaluationPage",{courseCode:courseCode , batchId : courseBatchId},false).complete(function (xhr) {
        pageData = xhr.responseJSON;
        console.log(pageData);
    });

    $('#courseBatch').html(Label.LABEL_COURSE+' '+pageData.courseCode+' '+Label.LABEL_BATCH+' '+pageData.batchName);

    var startDate = new Date(pageData.batchStartCourseDate);
    var endDate = new Date(pageData.batchFinishCourseDate);

    if(window.session.lang == "TH"){
        startDate = startDate.toLocaleDateString('th-TH');
        endDate = endDate.toLocaleDateString('th-TH');
    } else {
        startDate = startDate.toLocaleDateString('en-EN');
        endDate = endDate.toLocaleDateString('en-EN');
    }

    $('#courseDate').html(startDate+" - "+endDate+', '+pageData.periodName);
    $('#location').html(pageData.batchLocation);


    $("#evaluation_form_name").html(pageData.evaluationForm.formName);
    $('#div_eva_topic').empty();
    pageData.evaluationForm.evaluationTopics.forEach(function (top) {
        $('#div_eva_topic').append('<div class="col-md-12">'+
            '<b class="control-label required topic">'+top.topicDescription+'</b>'+
            '</div>'+
            '<div class="col-md-12">'+
            '<div class="row row-factor">'+
            '<div class="col-md-offset-3 col-xs-offset-3 col-md-2 col-xs-2 score col-custom">'+top.score5+'<br></br>'+top.scoreDescription5+'</div>'+
            '<div class="col-md-2 col-xs-2 score col-custom">'+top.score4+'<br></br>'+top.scoreDescription4+'</div>'+
            '<div class="col-md-2 col-xs-2 score col-custom">'+top.score3+'<br></br>'+top.scoreDescription3+'</div>'+
            '<div class="col-md-2 col-xs-2 score col-custom">'+top.score2+'<br></br>'+top.scoreDescription2+'</div>'+
            '<div class="col-md-2 col-xs-2 score col-custom">'+top.score1+'<br></br>'+top.scoreDescription1+'</div>'+
            '</div>'+
            '</div>'+
            '<div id="div_eva_factor_'+top.topicPartNumberEvaluationTopic+'"></div>'+
            '<div class="col-md-12">'+
            '<div class="row" style="margin-top: 15px;margin-bottom: 25px">'+
            '<p class="col-sm-1 col-xs-12 score label-comment">'+Label.LABEL_COMMENT+'</p>'+
            '<div class="col-sm-10 textarea-comment">'+
            '<textarea rows="3" id="comment_'+top.topicPartNumberEvaluationTopic+'" class="form-control" maxlength="200"></textarea>'+
            '</div>'+
            '</div>'+
            '</div>'
        );

        top.evaluationFactors.forEach(function (fac) {
            fac.topicDescription = top.topicDescription;
            fac.topicOrdinal = top.topicOrdinal;
            factor.push(fac);
            $('#div_eva_factor_'+fac.id.topicPartNumberEvaluationFactor).append(
                '<div class="col-md-12">'+
                '<div class="row row-factor" id="row_'+fac.id.topicPartNumberEvaluationFactor+'_'+fac.id.factorNumberEvaluationFactor+'">'+
                '<div class="col-md-3 col-xs-3 factor">'+fac.factorDescription+'</div>'+
                '<div class="col-md-2 col-xs-2 score col-custom">'+
                '<label>'+
                '<input type="radio" name="radio_'+fac.id.topicPartNumberEvaluationFactor+'_'+fac.id.factorNumberEvaluationFactor+'" value="5" required="true" oninvalid="notice(this)"><span class="label-text"></span></input>'+
                '</label>'+
                '</div>'+
                '<div class="col-md-2 col-xs-2 score col-custom">'+
                '<label>'+
                '<input type="radio" name="radio_'+fac.id.topicPartNumberEvaluationFactor+'_'+fac.id.factorNumberEvaluationFactor+'" value="4"><span class="label-text"></span></input>'+
                '</label>'+
                '</div>'+
                '<div class="col-md-2 col-xs-2 score col-custom">'+
                '<label>'+
                '<input type="radio" name="radio_'+fac.id.topicPartNumberEvaluationFactor+'_'+fac.id.factorNumberEvaluationFactor+'" value="3"><span class="label-text"></span></input>'+
                '</label>'+
                '</div>'+
                '<div class="col-md-2 col-xs-2 score col-custom">'+
                '<label>'+
                '<input type="radio" name="radio_'+fac.id.topicPartNumberEvaluationFactor+'_'+fac.id.factorNumberEvaluationFactor+'" value="2"><span class="label-text"></span></input>'+
                '</label>'+
                '</div>'+
                '<div class="col-md-2 col-xs-2 score col-custom">'+
                '<label>'+
                '<input type="radio" name="radio_'+fac.id.topicPartNumberEvaluationFactor+'_'+fac.id.factorNumberEvaluationFactor+'" value="1"><span class="label-text"></span></input>'+
                '</label>'+
                '</div>'+
                '</div>'+
                '<div id="notice_'+fac.id.topicPartNumberEvaluationFactor+'_'+fac.id.factorNumberEvaluationFactor+'" style="color: red;display: none">*'+Message.MSG_INPUT_INVALID+'</div>'+
                '</div>'
            )
        });
    });

    initailFunction();
});

function initailFunction() {
    $('[name^=radio_]').on('change',function () {
        // console.log($(this).parent().parent().parent().parent().children('[id^=notice]'));
        $(this).parent().parent().parent().parent().css('background-color','#fff');
        $(this).parent().parent().parent().parent().children('[id^=notice]').hide();
    })
}

$('#evaluation').on('submit', function(event){
    event.preventDefault();

    var data = [];
    factor.forEach(function (item) {
        $("input[name='gender']:checked").val();
        var factorSelect = $("input[name='radio_"+item.id.topicPartNumberEvaluationFactor+'_'+item.id.factorNumberEvaluationFactor+"']:checked").val();
        var eva = {
            ouCode : pageData.ouCode,
            resultCode : courseCode,
            resultGenerator : courseBatchId,
            resultId : pageData.resultId,
            formCodeEvalForm : item.id.formCodeEvaluationFactor,
            topicPartNoEvalTopic : item.id.topicPartNumberEvaluationFactor,
            topicDescription : item.topicDescription,
            topicOrdinal : item.topicOrdinal,
            factorNoEvalFactor : item.id.factorNumberEvaluationFactor,
            factorDescription : item.factorDescription,
            factorLevel1Point : item.factorLevel1Point,
            factorLevel1Description : item.factorLevel1Description,
            factorCheck1 : factorSelect == '1' ? 'Y' : 'N',
            factorLevel2Point : item.factorLevel2Point,
            factorLevel2Description : item.factorLevel2Description,
            factorCheck2 : factorSelect == '2' ? 'Y' : 'N',
            factorLevel3Point : item.factorLevel3Point,
            factorLevel3Description : item.factorLevel3Description,
            factorCheck3 : factorSelect == '3' ? 'Y' : 'N',
            factorLevel4Point : item.factorLevel4Point,
            factorLevel4Description : item.factorLevel4Description,
            factorCheck4 : factorSelect == '4' ? 'Y' : 'N',
            factorLevel5Point : item.factorLevel5Point,
            factorLevel5Description : item.factorLevel5Description,
            factorCheck5 : factorSelect == '5' ? 'Y' : 'N',
            evaluatorName : $('#evaluator_name').val(),
            remark : $('#comment_'+item.id.topicPartNumberEvaluationFactor).val(),
            version : 0
        }
        data.push(eva);
    });

    console.log(data);
    AjaxUtils.post("/coursebatches/createFromJsonArray",JSON.stringify(data)).complete(function (xhr) {
        if (xhr.status == 201) {
            $('.container').hide();
            MessageUtil.alertBootBoxMessage({
                title : Message.MSG_SAVE_SUCCESS,
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
    });
});

function notice(element) {
    $('#row_'+element.name.split("_")[1]+"_"+element.name.split("_")[2]).parent().css('background-color','#ffebee');
    $('#notice_'+element.name.split("_")[1]+"_"+element.name.split("_")[2]).show();
}
