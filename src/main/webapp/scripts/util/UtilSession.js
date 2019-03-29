/**
 * Created by wichakarn on 31/8/2558.
 */

/**
 * Flow
 *  Object State ----> Prepare State ----> Excule State
 */

/**
 * Set Parameter
 */

var _session = {};

var typeSelect = "select";
var typeSelectized = "selectized";
var typeTypecombobox = "typecombobox";
var typeInput = "input";
var typeTextArea = "textarea";
var typeRadio = "radio";
var typeNumber = "number";
var typeText = "text";
var typeEmployeeLov = "employee-lov";
var typeEmployeeLovFrom = "employee-lov-from";
var typeEmployeeLovTo = "employee-lov-to";
var typeDepartmentLov = "department-lov";
var typeDepartmentLovFrom = "department-lov-from";
var typeDepartmentLovTo = "department-lov-to";
var typePositionLov = "position-lov";
var typePositionLovFrom = "position-lov-from";
var typePositionLovTo = "position-lov-to";

/**
 * Geter
 */

function getSessionForCriteriaSize() {
    return Object.keys(_session).length + " object waiting for excule";
}

function getSessionForCriteria() {
    return _session;
};

function getSessionForCriteriaById(Id) {
    return _session[Id + "#" + window.location.pathname];
};

function getSessionStorageForCriteria() {
    return sessionStorage;
};

function getSessionStorageForCriteriaById(Id) {
    return sessionStorage.getItem(Id + "#" + window.location.pathname);
};

/**
 *  Setter
 */

function setSessionForCriteria(Id) {
    try {
        if ($("#" + Id).size() >= 1) {
            _session[Id] = $("#" + Id).getTagName();
        } else if ($("input[name=" + Id + "]").size() >= 1) {
            _session[Id] = $("input[name=" + Id + "]").getTagName();
            var _class = $("input[name=" + Id + "]").attr("type").split(" ");
            for (var i = 0; i < _class.length; i++) {
                if (_class[i] == typeRadio) {
                    _session[Id] = typeRadio;
                    break;
                }
            }
        }
        if (_session[Id] == typeSelect) {
            var _class = $("#" + Id).attr("class").split(" ");
            for (var i = 0; i < _class.length; i++) {
                if (_class[i] == typeSelectized) {
                    _session[Id] = typeTypecombobox;
                    break;
                } else {
                    _session[Id] = typeSelect;
                }
            }
        } else if (_session[Id] == typeInput) {
            var _class = $("#" + Id).attr("type").split(" ");
            for (var i = 0; i < _class.length; i++) {
                if (_class[i] == typeNumber) {
                    _session[Id] = typeNumber;
                    break;
                } else if (_class[i] == typeText) {
                    _session[Id] = typeText;
                    break;
                } else if (_class[i] == typeEmployeeLov) {
                    _session[Id] = typeEmployeeLov;
                    break;
                } else if (_class[i] == typeEmployeeLovFrom) {
                    _session[Id] = typeEmployeeLovFrom;
                    break;
                } else if (_class[i] == typeEmployeeLovTo) {
                    _session[Id] = typeEmployeeLovTo;
                    break;
                } else if (_class[i] == typeDepartmentLov) {
                    _session[Id] = typeDepartmentLov;
                    break;
                } else if (_class[i] == typeDepartmentLovFrom) {
                    _session[Id] = typeDepartmentLovFrom;
                    break;
                } else if (_class[i] == typeDepartmentLovTo) {
                    _session[Id] = typeDepartmentLovTo;
                    break;
                } else if (_class[i] == typePositionLov) {
                    _session[Id] = typePositionLov;
                    break;
                } else if (_class[i] == typePositionLovFrom) {
                    _session[Id] = typePositionLovFrom;
                    break;
                } else if (_class[i] == typePositionLovTo) {
                    _session[Id] = typePositionLovTo;
                    break;
                } else {
                    _session[Id] = typeInput;
                }
            }
        } else if (_session[Id] == typeTextArea) {
            _session[Id] = typeTextArea;
        }
    } catch (Error) {
        console.error(Error);
    }
    return "Waiting for excule " + Object.keys(_session).length + " object";
};

/**
 * Excule Data
 */

function exculeSessionForCriteria() {
    var _counting = 0;
    for (var i = 0; i < Object.keys(_session).length; i++) {
        try {
            exculeSessionForCriteriaById(Object.keys(_session)[i]);
            i--;
            _counting++;
        } catch (Error) {
            console.error(Error);
        }
    }
    return "Excule session success " + _counting + " object";
};

function exculeSessionForCriteriaById(Id) {
    try {
        var _this = _session[Id];
        if (_this == typeSelect || _this == typeInput || _this == typeNumber || _this == typeText || _this == typeTextArea) {
            sessionStorage.setItem(Id + "#" + window.location.pathname, _session[Id] + "#" + $('#' + Id).val());
        } else if (_this == typeSelectized || _this == typeTypecombobox) {
            sessionStorage.setItem(Id + "#" + window.location.pathname, _session[Id] + "#" + $('#' + Id).getComboBoxValue());
        } else if (_this == typeRadio) {
            sessionStorage.setItem(Id + "#" + window.location.pathname, _session[Id] + "#" + $("input[name=" + Id + "]:checked").val());
        } else if (_this == typeEmployeeLov || _this == typeEmployeeLovFrom || _this == typeEmployeeLovTo ||
            _this == typeDepartmentLov || _this == typeDepartmentLovFrom || _this == typeDepartmentLovTo ||
            _this == typePositionLov || _this == typePositionLovFrom || _this == typePositionLovTo) {
            sessionStorage.setItem(Id + "#" + window.location.pathname, _session[Id] + "#" + $('#' + Id).data("data-code"));
        }
        removeSessionForCriteriaById(Id);
        return "Excule object ID : " + Id + " success"
    } catch (Error) {
        console.error(Error);
        return "Excule object ID : " + Id + " error"
    }
};

/**
 * Remove Data
 */

function removeSessionForCriteria() {
    var _counting = Object.keys(_session).length;
    for (var i = 0; i < Object.keys(_session).length; i++) {
        try {
            removeSessionForCriteriaById(Object.keys(_session)[i]);
            i--;
            _counting--;
        } catch (Error) {
            console.error(Error);
        }
    }
    return "Remove success " + _counting + " object";
};

function removeSessionForCriteriaById(Id) {
    delete _session[Id];
    return "Remove object id : " + Id + " success";
};

function removeSessionStorageForCriteria() {
    var _counting = 0;
    for (var i = 0; i < sessionStorage.length; i++) {
        try {
            removeSessionStorageForCriteriaById(sessionStorage.key(i));
            i--;
            _counting++;
        } catch (Error) {
            console.error(Error);
        }
    }
    return "Remove success " + _counting + " object";
};

function removeSessionStorageForCriteriaById(Id) {
    sessionStorage.removeItem(Id);
    return "Remove form SessionStrong Id :" + Id + " success";
};

/**
 * Release Data
 */

function releaseSessionStorageForCriteria() {
    var _counting = 0;
    for (var i = 0; i < sessionStorage.length; i++) {
        try {
            var _sessionKey = sessionStorage.key(i).split("#")
            if(releaseSessionStorageForCriteriaById(_sessionKey[0] , _sessionKey[1])) {
                i--;
                _counting++;
            }
        } catch (Error) {
            console.error(Error);
        }
    }
    return "Release success " + _counting + " object";
};

function releaseSessionStorageForCriteriaById(Id , _partName) {
    var _IdAndPath = Id + "#" + _partName;
    try {
        if(_partName == window.location.pathname) {
            var _this = sessionStorage.getItem(_IdAndPath).split("#")[0];
            if (_this == typeSelect || _this == typeInput || _this == typeNumber || _this == typeText || _this == typeTextArea) {
                $('#' + Id).val(sessionStorage.getItem(_IdAndPath).split("#")[1]);
                removeSessionStorageForCriteriaById(_IdAndPath);
                return true;
            } else if (_this == typeSelectized || _this == typeTypecombobox) {
                $('#' + Id).setComboBoxValue(sessionStorage.getItem(_IdAndPath).split("#")[1]);
                removeSessionStorageForCriteriaById(_IdAndPath);
                return true;
            } else if (_this == typeRadio) {
                $("input[name=" + Id + "][value=" + sessionStorage.getItem(_IdAndPath).split("#")[1] + "]").prop("checked", true);
                removeSessionStorageForCriteriaById(_IdAndPath);
                return true;
            } else if (_this == typeEmployeeLov) {
                UtilLov.setValueLovEmployee(Id, sessionStorage.getItem(_IdAndPath).split("#")[1]);
                removeSessionStorageForCriteriaById(_IdAndPath);
                return true;
            } else if (_this == typeEmployeeLovFrom) {
                UtilLov.setValueLovEmployeeFrom(Id, sessionStorage.getItem(_IdAndPath).split("#")[1]);
                removeSessionStorageForCriteriaById(_IdAndPath);
                return true;
            } else if (_this == typeEmployeeLovTo) {
                UtilLov.setValueLovEmployeeTo(Id, sessionStorage.getItem(_IdAndPath).split("#")[1]);
                removeSessionStorageForCriteriaById(_IdAndPath);
                return true;
            } else if (_this == typeDepartmentLov) {
                UtilLov.setValueLovDepartment(Id, sessionStorage.getItem(_IdAndPath).split("#")[1]);
                removeSessionStorageForCriteriaById(_IdAndPath);
                return true;
            } else if (_this == typeDepartmentLovFrom) {
                UtilLov.setValueLovDepartmentFrom(Id, sessionStorage.getItem(_IdAndPath).split("#")[1]);
                removeSessionStorageForCriteriaById(_IdAndPath);
                return true;
            } else if (_this == typeDepartmentLovTo) {
                UtilLov.setValueLovDepartmentTo(Id, sessionStorage.getItem(_IdAndPath).split("#")[1]);
                removeSessionStorageForCriteriaById(_IdAndPath);
                return true;
            } else if (_this == typePositionLov) {
                UtilLov.setValueLovPosition(Id, sessionStorage.getItem(_IdAndPath).split("#")[1]);
                removeSessionStorageForCriteriaById(_IdAndPath);
                return true;
            } else if (_this == typePositionLovFrom) {
                UtilLov.setValueLovPositionFrom(Id, sessionStorage.getItem(_IdAndPath).split("#")[1]);
                removeSessionStorageForCriteriaById(_IdAndPath);
                return true;
            } else if (_this == typePositionLovTo) {
                UtilLov.setValueLovPositionTo(Id, sessionStorage.getItem(_IdAndPath).split("#")[1]);
                removeSessionStorageForCriteriaById(_IdAndPath);
                return true;
            }
        }else{
            return false;
        }
    } catch (Error) {
        console.error(Error);
    }
    return "Release object id : " + Id + " success";
};

