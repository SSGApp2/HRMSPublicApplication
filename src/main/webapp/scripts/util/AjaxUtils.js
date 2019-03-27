function AjaxUtils() {
}

var pattern = {
    async: true,
    cache: false,
    data: '',
    contentType: "application/json; charset=utf-8",
    headers: {Accept: "application/json"},
    //,
    // beforeSend: function () {
    //     $('.dv-background').show();
    // },
    // complete: function() { $('.dv-background').hide(); }
};

/**
 * fire ajax request to server type post
 *
 * @param strUrl        (string)    url connect to server
 * @param jsonData      (json)      data send to server
 * @param bAsync        (boolean)   asynchronous type
 * @param eBackdrop     (element)   put backdrop (loader) over
 */

$(document).on({
    // ajaxStart: function() { $('.dv-background').show();},
    // ajaxStop: function() { $('.dv-background').hide(); }
});

AjaxUtils.post = function (strUrl, jsonData, bAsync, eBackdrop) {

    var options = {
        type: "POST",
        url: session['context'] + strUrl,
        data: jsonData,
        async: bAsync
    };

    var settings = $.extend({}, pattern, options);
    return $.ajax(settings);
};

AjaxUtils.put = function (strUrl, jsonData, bAsync, eBackdrop) {

    var options = {
        type: "PUT",
        url: session['context'] + strUrl,
        data: jsonData,
        async: bAsync
    };

    var settings = $.extend({}, pattern, options);
    return $.ajax(settings);
};

AjaxUtils.get = function (strUrl, jsonData, bAsync) {
    var options = {
        type: 'GET',
        url: session['context'] + strUrl,
        data: jsonData,
        async: bAsync
    };
    var settings = $.extend({}, pattern, options);
    return $.ajax(settings);
};

AjaxUtils.delete = function (strUrl, jsonData, bAsync, eBackdrop) {

    var options = {
        type: "DELETE",
        url: session['context'] + strUrl,
        data: jsonData,
        async: bAsync
    };

    var settings = $.extend({}, pattern, options);
    return $.ajax(settings);
};
