var BeanUtils = {};
(function() {
	BeanUtils = (function() {

		return {
			numberValue : function(value, defaultValue) {
				return BeanUtils.isNumber(value)?Number(value):defaultValue;
			},
			booleanValue : function(value, defaultValue) {
				return ((/^(true|false|1|0|y|n)$/i).test(value))?(/^(true|1|Y|y)$/i).test(value):defaultValue;
			},
			value : function(value, defaultValue) {
				return BeanUtils.isNotEmpty(value)?value:defaultValue;
			},
			isNull : function(value) {
				return value === undefined || value === null;
			},
			isNotNull : function(value) {
				return !BeanUtils.isNull(value);
			},
			isEmpty : function(value) {
				return BeanUtils.isNull(value) || (BeanUtils.isArray(value) && Array(value).length === 0) || String(value).trim().length === 0;
			},
			isNotEmpty : function(value) {
				return !BeanUtils.isEmpty(value);
			},
			isArray : function(value) {
				return jQuery.type(value) === 'array'; 
			},
			isFunction : function(value) {
				return jQuery.type(value) === 'function';
			},
			isNumber : function(value) {
				return $.isNumeric(value);
			},
			isBoolean : function(value) {
				return String(value).toLowerCase() === 'true' || String(value).toLowerCase() === 'false';	
			},
			isDate : function(value) {
				return jQuery.type(value) === 'date'; 
			},
			isString : function(value) {
				return jQuery.type(value) === 'string';
			},
			isPlainObject : function(value) {
				return jQuery.isPlainObject(value);
			},
			equals : function(value1, value2) {
			  if (value1 === value2) return true;
			  if (BeanUtils.isNull(value1) || BeanUtils.isNull(value2) === null) return false;
			  if (value1 !== value1 && value2 !== value2) return true; // NaN === NaN
			  var type1 = typeof value1, type2 = typeof value2, length, key, keySet;
			  if (type1 == type2) {
			      if (BeanUtils.isArray(value1) && BeanUtils.isArray(value2)) {
			        if ((length = value1.length) == value2.length) {
			          for (key = 0; key < length; key++) {
			            if (!BeanUtils.equals(value1[key], value2[key])) return false;
			          }
			          return true;
			        }
			      } else if (BeanUtils.isDate(value1) && BeanUtils.isDate(value2)) {
			        return BeanUtils.equals(value1.getTime(), value2.getTime());
			      } else if(BeanUtils.isPlainObject(value1)) {
			        keySet = Object.create(null);
			        for (key in value1) {
			          if (key.charAt(0) === '$' || BeanUtils.isFunction(value1[key])) continue;
			          if (!BeanUtils.equals(value1[key], value2[key])) return false;
			          keySet[key] = true;
			        }
			        for (key in value2) {
			          if (!(key in keySet) && key.charAt(0) !== '$' && value2[key] !== undefined && !BeanUtils.isFunction(value2[key])) return false;
			        }
			        return true;
			      }
			  }
			  return false;
			},
			format : function() {
				var args = Array.prototype.slice.call(arguments);
				var text = args.shift();
				return String(text).replace(/{(\d+)}/g, function(match, number) {
					return typeof args[number] != 'undefined' ? args[number] : match;
			    });
			},
			replaceAll : function(data,replaceForm,replaceTo) {
				var reg = new RegExp(replaceForm, 'g');
				return data = data.replace(reg,replaceTo);
			}
		};
	})();

})();