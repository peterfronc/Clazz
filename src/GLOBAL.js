/* 
 * Author @ peter fronc 2013
 * Licensed under LGPL v3 - have fun.
 * https://github.com/peterfronc/Clazz
 */

//:import Function

var GLOBAL = (function () {
	return this.global || eval("this") || this;
}());

GLOBAL.NAMESPACE = GLOBAL;
GLOBAL.leIE7 = false;

// make sure its there
Function.prototype.bind = Function.prototype.bind || function (ctx) {
	var _this = this;
	return function () {
		_this.apply(ctx, arguments);
	};
};

/**
 * Namespacing function.
 * @param {String} path path where to attach object (org.package.Object).
 * @param {Object} instance instance to attach.
 * @param {Object} pckg proxy package where namespace will be defined 
 *					(default is GLOBAL)
 * @param {Boolean} noOverride if object attached should not override existing
 *					 one.
 * @returns {Object} {package root, addressed object} couple.
 */
function namespace(path, instance, pckg, noOverride) {
	var files = path.split("."),
			//access eval INDIRECT so it is called globally
			current = GLOBAL.NAMESPACE_BASE || GLOBAL,
			last = null,
			lastName = null,
			i;

	var root = current;

	current = pckg || current;

	for (i = 0; i < files.length - 1; i += 1) {
		last = current;
		lastName = files[i];
		current[lastName] = current[lastName] || {};
		current = current[lastName];
	}

	last = current;
	lastName = files[files.length - 1];

	if (instance !== undefined) {
		if (last[lastName] === undefined || !noOverride) {
			last[lastName] = instance;
		}
	} else {
		last[lastName] = last[lastName] || {};
	}

	if (instance) {
		files.splice(files.length - 1, 1);
		instance.PACKAGE_NAME = files.join(".");
	}

	return {
		root: root,
		object: last
	};
}

/**
 * Utility for simple class declaration (not definition).
 * It does similiar job as namespace with addition of adding CLASS_NAME
 * and PACKAGE_NAME on prototype. It also sets superclass to extending class
 * instance. If object is not function, STATIC_NAME is set instead of CLASS_NAME.
 * 
 * @param {String} path same as in namespace
 * @param {Object} instance class object reference (or static object)
 * @param {Function} extendingClass what to extend (optional).
 * @param {Object} pckg optional package reference (default GLOBAL)
 * @param {Object} config optional config to initialise prototype.
 * @returns {Object} new class reference.
 */
function clazz(path, instance, extendingClass, pckg, config) {
	namespace(path, instance, pckg, true);
	if (instance) {
		if (typeof (extendingClass) === "function") {
			instance.superclass = extendingClass;
			instance.prototype = new instance.superclass(config);
		}
		var names = path.split(".");
		if (instance.prototype) {
			instance.prototype.CLASS_NAME = names[names.length - 1];
			names.splice(names.length - 1, 1);
			instance.prototype.PACKAGE_NAME = names.join(".");
		} else {
			instance.STATIC_NAME = names[names.length - 1];
			names.splice(names.length - 1, 1);
	//		instance.PACKAGE_NAME = names.join(".");
		}
	}
	return instance;
}

GLOBAL.clazz = clazz;
GLOBAL.namespace = namespace;
