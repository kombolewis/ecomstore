/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/config/config.ts":
/*!******************************!*\
  !*** ./src/config/config.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const config = {
    baseURL: 'https://ecomstore14.herokuapp.com'
};
exports["default"] = config;


/***/ }),

/***/ "./src/framework/ajax.ts":
/*!*******************************!*\
  !*** ./src/framework/ajax.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const config_1 = __webpack_require__(/*! ../config/config */ "./src/config/config.ts");
class ajax {
    constructor() {
        this.url = config_1.default.baseURL;
    }
    get(endpoint) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield fetch(this.url + endpoint);
            const data = yield resp.json();
            return data;
        });
    }
    post(endpoint, options, data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (options == null) {
                options = {
                    method: 'post',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };
            }
            const resp = yield fetch(this.url + endpoint, options);
            const dataJson = yield resp.json();
            return dataJson;
        });
    }
}
exports["default"] = (new ajax());


/***/ }),

/***/ "./src/framework/events.ts":
/*!*********************************!*\
  !*** ./src/framework/events.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
class Events {
    constructor(globals) {
        this.document = globals.document;
    }
    getEvents() {
        const container = [];
        const events = this.registeredDomEvents();
        events.forEach(event => {
            const { customEvent, domMapping } = event;
            const elements = this.document.querySelectorAll(`[${customEvent}]`);
            for (let element of elements) {
                let listener = element.getAttribute(customEvent);
                if (listener) {
                    container.push({ domEvent: domMapping, callback: listener, element });
                }
            }
        });
        return container;
    }
    registeredDomEvents() {
        return [
            { customEvent: 'change', domMapping: 'change' },
            { customEvent: 'input', domMapping: 'input' },
            { customEvent: 'submit', domMapping: 'submit' },
            { customEvent: 'click', domMapping: 'click' }
        ];
    }
}
exports["default"] = Events;


/***/ }),

/***/ "./src/framework/framework.ts":
/*!************************************!*\
  !*** ./src/framework/framework.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const events_1 = __webpack_require__(/*! ./events */ "./src/framework/events.ts");
const listener_1 = __webpack_require__(/*! ./listener */ "./src/framework/listener.ts");
const globals_1 = __webpack_require__(/*! ./globals */ "./src/framework/globals.ts");
class Framework {
    constructor() {
        this.globals = globals_1.default.instantiate();
        this.events = new events_1.default(this.globals);
        this.listener = new listener_1.default(this.globals, this.events);
    }
    start() {
        this.listen();
    }
    listen() {
        this.listener.register();
    }
}
exports["default"] = Framework;


/***/ }),

/***/ "./src/framework/globals.ts":
/*!**********************************!*\
  !*** ./src/framework/globals.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
class Globals {
    constructor() {
        this.doc = window.document;
        this.loc = window.location;
    }
    static instantiate() {
        if (!Globals.instance) {
            Globals.instance = new Globals(); // the instance is an object of the entire class
        }
        return Globals.instance;
    }
    get document() {
        return this.doc;
    }
    get location() {
        return this.loc;
    }
    redirect(path) {
        const location = this.location;
        location.pathname = path;
    }
}
exports["default"] = Globals;


/***/ }),

/***/ "./src/framework/listener.ts":
/*!***********************************!*\
  !*** ./src/framework/listener.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const listeners_1 = __webpack_require__(/*! ../listeners */ "./src/listeners/index.ts");
class Listener {
    constructor(globals, events) {
        this.events = events;
        this.globals = globals;
    }
    register() {
        Object.keys(listeners_1.default).forEach(l => {
            const objListner = new listeners_1.default[l](this.globals);
            this.events.getEvents().forEach(obj => {
                const { domEvent, callback, element } = obj;
                if (typeof objListner[callback] == 'function') {
                    element.addEventListener(domEvent, (e) => objListner[callback](element, e));
                }
            });
        });
    }
}
exports["default"] = Listener;


/***/ }),

/***/ "./src/framework/validator.ts":
/*!************************************!*\
  !*** ./src/framework/validator.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const ajax_1 = __webpack_require__(/*! ./ajax */ "./src/framework/ajax.ts");
class Validator {
    constructor(document) {
        this.passed = false;
        this.document = document;
    }
    check(data, items) {
        return __awaiter(this, void 0, void 0, function* () {
            this.errors = [];
            for (const { field, display, rules } of items) {
                for (const { rule, rule_value } of rules) {
                    const inputValueObj = data.find(obj => Object.keys(obj).toString() == field);
                    const value = inputValueObj[field];
                    if (rule == 'required' && !value) {
                        // this.addError({field, message:`${display} is required`})
                        this.addError({ field, message: `Please, submit required data` });
                    }
                    else if (value) {
                        switch (rule) {
                            case 'min':
                                if (value.length < rule_value) {
                                    this.addError({ field, message: `${display} must be a minimum of ${rule_value} characters` });
                                }
                                break;
                            case 'max':
                                if (value.length > rule_value) {
                                    this.addError({ field, message: `${display} must be a maximum of ${rule_value} characters` });
                                }
                                break;
                            case 'unique':
                                const query = { sql: `SELECT ${field} FROM ${rule_value} WHERE ${field} = ?`, bind: [value] };
                                var formData = new FormData();
                                for (const key in query) {
                                    formData.append(key, query[key]);
                                }
                                const options = { method: 'POST', body: formData };
                                const data = yield ajax_1.default.post('/validate-unique', options);
                                if (data.count > 0) {
                                    this.addError({ field, message: `${display} already exists. Please choose  another ${display}` });
                                }
                                break;
                            case 'numeric':
                                if (isNaN(value)) {
                                    this.addError({ field, message: `Please, provide the data of indicated type` });
                                }
                                break;
                        }
                    }
                }
            }
        });
    }
    validate(data, items, element) {
        return __awaiter(this, void 0, void 0, function* () {
            this.validateHelper(data, items, element);
            this.checkpassed();
            return this;
        });
    }
    validateHelper(data, items, element) {
        return __awaiter(this, void 0, void 0, function* () {
            if (element) {
                yield this.check(data, items);
                this.write(element);
            }
            else {
                for (const obj of data) {
                    for (const item of items) {
                        if (Object.keys(obj).toString() == item.field) {
                            yield this.check([obj], [item]);
                            this.write(this.document.getElementById(item.field));
                        }
                    }
                }
            }
        });
    }
    addError(error) {
        this.errors.push(error);
        if (this.errors.length == 0) {
            this.passed = true;
        }
        else {
            this.passed = false;
        }
    }
    checkpassed() {
        if (this.errors.length == 0) {
            this.passed = true;
        }
    }
    validationPassed() {
        return this.passed;
    }
    write(element) {
        const errorElement = this.getErrorElement(element);
        const list = this.document.createElement('ul');
        errorElement.appendChild(list);
        for (const { message } of this.errors) {
            const li = this.document.createElement('li').appendChild(this.document.createTextNode(message));
            list.appendChild(li);
        }
        element.after(errorElement);
    }
    getErrorElement(element) {
        const elementid = element.getAttribute('id');
        const errorElementId = elementid + 'Errors';
        let errorElement = this.document.getElementById(errorElementId);
        if (errorElement) {
            errorElement.innerHTML = '';
        }
        else {
            errorElement = this.document.createElement('div');
            errorElement.setAttribute('id', errorElementId);
            errorElement.classList.add("text-danger");
        }
        return errorElement;
    }
}
exports["default"] = Validator;


/***/ }),

/***/ "./src/listeners/Home.ts":
/*!*******************************!*\
  !*** ./src/listeners/Home.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const ajax_1 = __webpack_require__(/*! ../framework/ajax */ "./src/framework/ajax.ts");
const validator_1 = __webpack_require__(/*! ../framework/validator */ "./src/framework/validator.ts");
class Home {
    constructor(globals) {
        this.globals = globals;
        this.validator = new validator_1.default(globals.document);
    }
    handleSku(element, e) {
        const data = [{ sku: e.target.value }];
        this.validator.validate(data, this.rules('sku'), element);
    }
    handleName(element, e) {
        const data = [{ name: e.target.value }];
        this.validator.validate(data, this.rules('name'), element);
    }
    handlePrice(element, e) {
        const data = [{ price: e.target.value }];
        this.validator.validate(data, this.rules('price'), element);
    }
    handleWeight(element, e) {
        const data = [{ weight: e.target.value }];
        this.validator.validate(data, this.rules('weight'), element);
    }
    handleSize(element, e) {
        const data = [{ size: e.target.value }];
        this.validator.validate(data, this.rules('size'), element);
    }
    handleFntHeight(element, e) {
        const data = [{ height: e.target.value }];
        this.validator.validate(data, this.rules('height'), element);
    }
    handleFntWidth(element, e) {
        const data = [{ width: e.target.value }];
        this.validator.validate(data, this.rules('width'), element);
    }
    handleFntLength(element, e) {
        const data = [{ length: e.target.value }];
        this.validator.validate(data, this.rules('length'), element);
    }
    trimData(cdata) {
        const data = cdata[0];
        const cont = {
            DVDs: 'size',
            Furniture: ['height', 'length', 'width'],
            Books: 'weight'
        };
        /**
         * remove the selected key from temp array
         */
        for (const key in data) {
            if (key == 'productType') {
                const value = data[key];
                delete cont[value];
            }
        }
        /**
         * remove all others from submitted data
         */
        for (const key in cont) {
            const value = cont[key];
            if (value.constructor === Array) {
                for (const dkey in data) {
                    for (const item of value) {
                        if (item == dkey) {
                            delete data[dkey];
                        }
                    }
                }
            }
            else {
                delete data[value];
            }
        }
        return [data];
    }
    handleCancel(element, e) {
        this.globals.redirect('/');
    }
    handleSubmit(element, e) {
        const target = this.globals.document.forms[0];
        const formData = new FormData(target);
        let data = [...formData.entries()].map(arr => {
            return Object.fromEntries([arr]);
        });
        this.validator.validate(data, this.rules())
            .then((obj) => {
            if (obj.validationPassed()) {
                data = this.trimData(Array.of(Object.fromEntries(formData.entries())));
                const newFormData = new FormData();
                for (const key in data[0]) {
                    newFormData.append(key, data[0][key]);
                }
                const options = { method: 'post', body: newFormData };
                return ajax_1.default.post('/add-product', options);
            }
        })
            .then(response => {
            if (response.status == 'success') {
                this.globals.redirect('/');
            }
            else {
                throw new Error('could not create record');
            }
        })
            .catch(error => {
            console.log(error);
        });
    }
    rules(attribute) {
        const data = [
            {
                field: 'sku',
                display: 'SKU',
                rules: [
                    { rule: 'required', rule_value: true },
                    { rule: 'unique', rule_value: 'product' },
                ]
            },
            {
                field: 'name',
                display: 'Name',
                rules: [
                    { rule: 'required', rule_value: true },
                ]
            },
            {
                field: 'price',
                display: 'Price',
                rules: [
                    { rule: 'required', rule_value: true },
                    { rule: 'numeric', rule_value: true },
                ]
            },
            {
                field: 'weight',
                display: 'Weight',
                rules: [
                    { rule: 'required', rule_value: true },
                    { rule: 'numeric', rule_value: true },
                ]
            },
            {
                field: 'size',
                display: 'Size',
                rules: [
                    { rule: 'required', rule_value: true },
                    { rule: 'numeric', rule_value: true },
                ]
            },
            {
                field: 'height',
                display: 'Height',
                rules: [
                    { rule: 'required', rule_value: true },
                    { rule: 'numeric', rule_value: true },
                ]
            },
            {
                field: 'width',
                display: 'Width',
                rules: [
                    { rule: 'required', rule_value: true },
                    { rule: 'numeric', rule_value: true },
                ]
            },
            {
                field: 'length',
                display: 'Length',
                rules: [
                    { rule: 'required', rule_value: true },
                    { rule: 'numeric', rule_value: true },
                ]
            },
            {
                field: 'productType',
                display: 'Type Switcher',
                rules: [
                    { rule: 'required', rule_value: true },
                ]
            },
        ];
        if (attribute)
            return data.filter(obj => obj.field == attribute);
        return data;
    }
}
exports["default"] = Home;


/***/ }),

/***/ "./src/listeners/index.ts":
/*!********************************!*\
  !*** ./src/listeners/index.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const Home_1 = __webpack_require__(/*! ./Home */ "./src/listeners/Home.ts");
exports["default"] = { Home: Home_1.default };


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!*************************!*\
  !*** ./src/launcher.ts ***!
  \*************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const framework_1 = __webpack_require__(/*! ./framework/framework */ "./src/framework/framework.ts");
new framework_1.default().start();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUMxRCxzQkFBc0IsbUNBQW1DO0FBQ3pEO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLG9DQUFvQztBQUMxRCxzQkFBc0IsbUNBQW1DO0FBQ3pEO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLG9DQUFvQztBQUMxRCxzQkFBc0IsbUNBQW1DO0FBQ3pEO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLG9DQUFvQztBQUMxRDtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBZTs7Ozs7Ozs7Ozs7QUM1TEY7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsZUFBZSxtQkFBTyxDQUFDLHVDQUFRO0FBQy9CLGtCQUFlLEtBQUs7Ozs7Ozs7VUNIcEI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7Ozs7OztBQ3RCYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxvQkFBb0IsbUJBQU8sQ0FBQywyREFBdUI7QUFDbkQiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mcm9udGVuZC8uL3NyYy9jb25maWcvY29uZmlnLnRzIiwid2VicGFjazovL2Zyb250ZW5kLy4vc3JjL2ZyYW1ld29yay9hamF4LnRzIiwid2VicGFjazovL2Zyb250ZW5kLy4vc3JjL2ZyYW1ld29yay9ldmVudHMudHMiLCJ3ZWJwYWNrOi8vZnJvbnRlbmQvLi9zcmMvZnJhbWV3b3JrL2ZyYW1ld29yay50cyIsIndlYnBhY2s6Ly9mcm9udGVuZC8uL3NyYy9mcmFtZXdvcmsvZ2xvYmFscy50cyIsIndlYnBhY2s6Ly9mcm9udGVuZC8uL3NyYy9mcmFtZXdvcmsvbGlzdGVuZXIudHMiLCJ3ZWJwYWNrOi8vZnJvbnRlbmQvLi9zcmMvZnJhbWV3b3JrL3ZhbGlkYXRvci50cyIsIndlYnBhY2s6Ly9mcm9udGVuZC8uL3NyYy9saXN0ZW5lcnMvSG9tZS50cyIsIndlYnBhY2s6Ly9mcm9udGVuZC8uL3NyYy9saXN0ZW5lcnMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vZnJvbnRlbmQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZnJvbnRlbmQvLi9zcmMvbGF1bmNoZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBjb25maWcgPSB7XG4gICAgYmFzZVVSTDogJ2h0dHBzOi8vZWNvbXN0b3JlMTQuaGVyb2t1YXBwLmNvbSdcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBjb25maWc7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgY29uZmlnXzEgPSByZXF1aXJlKFwiLi4vY29uZmlnL2NvbmZpZ1wiKTtcbmNsYXNzIGFqYXgge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnVybCA9IGNvbmZpZ18xLmRlZmF1bHQuYmFzZVVSTDtcbiAgICB9XG4gICAgZ2V0KGVuZHBvaW50KSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBjb25zdCByZXNwID0geWllbGQgZmV0Y2godGhpcy51cmwgKyBlbmRwb2ludCk7XG4gICAgICAgICAgICBjb25zdCBkYXRhID0geWllbGQgcmVzcC5qc29uKCk7XG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHBvc3QoZW5kcG9pbnQsIG9wdGlvbnMsIGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGlmIChvcHRpb25zID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zID0ge1xuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdwb3N0JyxcbiAgICAgICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZGF0YSksXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCByZXNwID0geWllbGQgZmV0Y2godGhpcy51cmwgKyBlbmRwb2ludCwgb3B0aW9ucyk7XG4gICAgICAgICAgICBjb25zdCBkYXRhSnNvbiA9IHlpZWxkIHJlc3AuanNvbigpO1xuICAgICAgICAgICAgcmV0dXJuIGRhdGFKc29uO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSAobmV3IGFqYXgoKSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNsYXNzIEV2ZW50cyB7XG4gICAgY29uc3RydWN0b3IoZ2xvYmFscykge1xuICAgICAgICB0aGlzLmRvY3VtZW50ID0gZ2xvYmFscy5kb2N1bWVudDtcbiAgICB9XG4gICAgZ2V0RXZlbnRzKCkge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSBbXTtcbiAgICAgICAgY29uc3QgZXZlbnRzID0gdGhpcy5yZWdpc3RlcmVkRG9tRXZlbnRzKCk7XG4gICAgICAgIGV2ZW50cy5mb3JFYWNoKGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHsgY3VzdG9tRXZlbnQsIGRvbU1hcHBpbmcgfSA9IGV2ZW50O1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudHMgPSB0aGlzLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYFske2N1c3RvbUV2ZW50fV1gKTtcbiAgICAgICAgICAgIGZvciAobGV0IGVsZW1lbnQgb2YgZWxlbWVudHMpIHtcbiAgICAgICAgICAgICAgICBsZXQgbGlzdGVuZXIgPSBlbGVtZW50LmdldEF0dHJpYnV0ZShjdXN0b21FdmVudCk7XG4gICAgICAgICAgICAgICAgaWYgKGxpc3RlbmVyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5wdXNoKHsgZG9tRXZlbnQ6IGRvbU1hcHBpbmcsIGNhbGxiYWNrOiBsaXN0ZW5lciwgZWxlbWVudCB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH1cbiAgICByZWdpc3RlcmVkRG9tRXZlbnRzKCkge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgeyBjdXN0b21FdmVudDogJ2NoYW5nZScsIGRvbU1hcHBpbmc6ICdjaGFuZ2UnIH0sXG4gICAgICAgICAgICB7IGN1c3RvbUV2ZW50OiAnaW5wdXQnLCBkb21NYXBwaW5nOiAnaW5wdXQnIH0sXG4gICAgICAgICAgICB7IGN1c3RvbUV2ZW50OiAnc3VibWl0JywgZG9tTWFwcGluZzogJ3N1Ym1pdCcgfSxcbiAgICAgICAgICAgIHsgY3VzdG9tRXZlbnQ6ICdjbGljaycsIGRvbU1hcHBpbmc6ICdjbGljaycgfVxuICAgICAgICBdO1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IEV2ZW50cztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgZXZlbnRzXzEgPSByZXF1aXJlKFwiLi9ldmVudHNcIik7XG5jb25zdCBsaXN0ZW5lcl8xID0gcmVxdWlyZShcIi4vbGlzdGVuZXJcIik7XG5jb25zdCBnbG9iYWxzXzEgPSByZXF1aXJlKFwiLi9nbG9iYWxzXCIpO1xuY2xhc3MgRnJhbWV3b3JrIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5nbG9iYWxzID0gZ2xvYmFsc18xLmRlZmF1bHQuaW5zdGFudGlhdGUoKTtcbiAgICAgICAgdGhpcy5ldmVudHMgPSBuZXcgZXZlbnRzXzEuZGVmYXVsdCh0aGlzLmdsb2JhbHMpO1xuICAgICAgICB0aGlzLmxpc3RlbmVyID0gbmV3IGxpc3RlbmVyXzEuZGVmYXVsdCh0aGlzLmdsb2JhbHMsIHRoaXMuZXZlbnRzKTtcbiAgICB9XG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHRoaXMubGlzdGVuKCk7XG4gICAgfVxuICAgIGxpc3RlbigpIHtcbiAgICAgICAgdGhpcy5saXN0ZW5lci5yZWdpc3RlcigpO1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IEZyYW1ld29yaztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY2xhc3MgR2xvYmFscyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZG9jID0gd2luZG93LmRvY3VtZW50O1xuICAgICAgICB0aGlzLmxvYyA9IHdpbmRvdy5sb2NhdGlvbjtcbiAgICB9XG4gICAgc3RhdGljIGluc3RhbnRpYXRlKCkge1xuICAgICAgICBpZiAoIUdsb2JhbHMuaW5zdGFuY2UpIHtcbiAgICAgICAgICAgIEdsb2JhbHMuaW5zdGFuY2UgPSBuZXcgR2xvYmFscygpOyAvLyB0aGUgaW5zdGFuY2UgaXMgYW4gb2JqZWN0IG9mIHRoZSBlbnRpcmUgY2xhc3NcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gR2xvYmFscy5pbnN0YW5jZTtcbiAgICB9XG4gICAgZ2V0IGRvY3VtZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kb2M7XG4gICAgfVxuICAgIGdldCBsb2NhdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubG9jO1xuICAgIH1cbiAgICByZWRpcmVjdChwYXRoKSB7XG4gICAgICAgIGNvbnN0IGxvY2F0aW9uID0gdGhpcy5sb2NhdGlvbjtcbiAgICAgICAgbG9jYXRpb24ucGF0aG5hbWUgPSBwYXRoO1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IEdsb2JhbHM7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGxpc3RlbmVyc18xID0gcmVxdWlyZShcIi4uL2xpc3RlbmVyc1wiKTtcbmNsYXNzIExpc3RlbmVyIHtcbiAgICBjb25zdHJ1Y3RvcihnbG9iYWxzLCBldmVudHMpIHtcbiAgICAgICAgdGhpcy5ldmVudHMgPSBldmVudHM7XG4gICAgICAgIHRoaXMuZ2xvYmFscyA9IGdsb2JhbHM7XG4gICAgfVxuICAgIHJlZ2lzdGVyKCkge1xuICAgICAgICBPYmplY3Qua2V5cyhsaXN0ZW5lcnNfMS5kZWZhdWx0KS5mb3JFYWNoKGwgPT4ge1xuICAgICAgICAgICAgY29uc3Qgb2JqTGlzdG5lciA9IG5ldyBsaXN0ZW5lcnNfMS5kZWZhdWx0W2xdKHRoaXMuZ2xvYmFscyk7XG4gICAgICAgICAgICB0aGlzLmV2ZW50cy5nZXRFdmVudHMoKS5mb3JFYWNoKG9iaiA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgeyBkb21FdmVudCwgY2FsbGJhY2ssIGVsZW1lbnQgfSA9IG9iajtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9iakxpc3RuZXJbY2FsbGJhY2tdID09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGRvbUV2ZW50LCAoZSkgPT4gb2JqTGlzdG5lcltjYWxsYmFja10oZWxlbWVudCwgZSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBMaXN0ZW5lcjtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBhamF4XzEgPSByZXF1aXJlKFwiLi9hamF4XCIpO1xuY2xhc3MgVmFsaWRhdG9yIHtcbiAgICBjb25zdHJ1Y3Rvcihkb2N1bWVudCkge1xuICAgICAgICB0aGlzLnBhc3NlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmRvY3VtZW50ID0gZG9jdW1lbnQ7XG4gICAgfVxuICAgIGNoZWNrKGRhdGEsIGl0ZW1zKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICB0aGlzLmVycm9ycyA9IFtdO1xuICAgICAgICAgICAgZm9yIChjb25zdCB7IGZpZWxkLCBkaXNwbGF5LCBydWxlcyB9IG9mIGl0ZW1zKSB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCB7IHJ1bGUsIHJ1bGVfdmFsdWUgfSBvZiBydWxlcykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpbnB1dFZhbHVlT2JqID0gZGF0YS5maW5kKG9iaiA9PiBPYmplY3Qua2V5cyhvYmopLnRvU3RyaW5nKCkgPT0gZmllbGQpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGlucHV0VmFsdWVPYmpbZmllbGRdO1xuICAgICAgICAgICAgICAgICAgICBpZiAocnVsZSA9PSAncmVxdWlyZWQnICYmICF2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5hZGRFcnJvcih7ZmllbGQsIG1lc3NhZ2U6YCR7ZGlzcGxheX0gaXMgcmVxdWlyZWRgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkRXJyb3IoeyBmaWVsZCwgbWVzc2FnZTogYFBsZWFzZSwgc3VibWl0IHJlcXVpcmVkIGRhdGFgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHJ1bGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdtaW4nOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUubGVuZ3RoIDwgcnVsZV92YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRFcnJvcih7IGZpZWxkLCBtZXNzYWdlOiBgJHtkaXNwbGF5fSBtdXN0IGJlIGEgbWluaW11bSBvZiAke3J1bGVfdmFsdWV9IGNoYXJhY3RlcnNgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ21heCc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZS5sZW5ndGggPiBydWxlX3ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZEVycm9yKHsgZmllbGQsIG1lc3NhZ2U6IGAke2Rpc3BsYXl9IG11c3QgYmUgYSBtYXhpbXVtIG9mICR7cnVsZV92YWx1ZX0gY2hhcmFjdGVyc2AgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAndW5pcXVlJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcXVlcnkgPSB7IHNxbDogYFNFTEVDVCAke2ZpZWxkfSBGUk9NICR7cnVsZV92YWx1ZX0gV0hFUkUgJHtmaWVsZH0gPSA/YCwgYmluZDogW3ZhbHVlXSB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gcXVlcnkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1EYXRhLmFwcGVuZChrZXksIHF1ZXJ5W2tleV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7IG1ldGhvZDogJ1BPU1QnLCBib2R5OiBmb3JtRGF0YSB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0geWllbGQgYWpheF8xLmRlZmF1bHQucG9zdCgnL3ZhbGlkYXRlLXVuaXF1ZScsIG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5jb3VudCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkRXJyb3IoeyBmaWVsZCwgbWVzc2FnZTogYCR7ZGlzcGxheX0gYWxyZWFkeSBleGlzdHMuIFBsZWFzZSBjaG9vc2UgIGFub3RoZXIgJHtkaXNwbGF5fWAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnbnVtZXJpYyc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc05hTih2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkRXJyb3IoeyBmaWVsZCwgbWVzc2FnZTogYFBsZWFzZSwgcHJvdmlkZSB0aGUgZGF0YSBvZiBpbmRpY2F0ZWQgdHlwZWAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICB2YWxpZGF0ZShkYXRhLCBpdGVtcywgZWxlbWVudCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgdGhpcy52YWxpZGF0ZUhlbHBlcihkYXRhLCBpdGVtcywgZWxlbWVudCk7XG4gICAgICAgICAgICB0aGlzLmNoZWNrcGFzc2VkKCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHZhbGlkYXRlSGVscGVyKGRhdGEsIGl0ZW1zLCBlbGVtZW50KSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBpZiAoZWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHlpZWxkIHRoaXMuY2hlY2soZGF0YSwgaXRlbXMpO1xuICAgICAgICAgICAgICAgIHRoaXMud3JpdGUoZWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IG9iaiBvZiBkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKE9iamVjdC5rZXlzKG9iaikudG9TdHJpbmcoKSA9PSBpdGVtLmZpZWxkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeWllbGQgdGhpcy5jaGVjayhbb2JqXSwgW2l0ZW1dKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndyaXRlKHRoaXMuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaXRlbS5maWVsZCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgYWRkRXJyb3IoZXJyb3IpIHtcbiAgICAgICAgdGhpcy5lcnJvcnMucHVzaChlcnJvcik7XG4gICAgICAgIGlmICh0aGlzLmVycm9ycy5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgdGhpcy5wYXNzZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wYXNzZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjaGVja3Bhc3NlZCgpIHtcbiAgICAgICAgaWYgKHRoaXMuZXJyb3JzLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnBhc3NlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdmFsaWRhdGlvblBhc3NlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFzc2VkO1xuICAgIH1cbiAgICB3cml0ZShlbGVtZW50KSB7XG4gICAgICAgIGNvbnN0IGVycm9yRWxlbWVudCA9IHRoaXMuZ2V0RXJyb3JFbGVtZW50KGVsZW1lbnQpO1xuICAgICAgICBjb25zdCBsaXN0ID0gdGhpcy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xuICAgICAgICBlcnJvckVsZW1lbnQuYXBwZW5kQ2hpbGQobGlzdCk7XG4gICAgICAgIGZvciAoY29uc3QgeyBtZXNzYWdlIH0gb2YgdGhpcy5lcnJvcnMpIHtcbiAgICAgICAgICAgIGNvbnN0IGxpID0gdGhpcy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpLmFwcGVuZENoaWxkKHRoaXMuZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUobWVzc2FnZSkpO1xuICAgICAgICAgICAgbGlzdC5hcHBlbmRDaGlsZChsaSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxlbWVudC5hZnRlcihlcnJvckVsZW1lbnQpO1xuICAgIH1cbiAgICBnZXRFcnJvckVsZW1lbnQoZWxlbWVudCkge1xuICAgICAgICBjb25zdCBlbGVtZW50aWQgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnaWQnKTtcbiAgICAgICAgY29uc3QgZXJyb3JFbGVtZW50SWQgPSBlbGVtZW50aWQgKyAnRXJyb3JzJztcbiAgICAgICAgbGV0IGVycm9yRWxlbWVudCA9IHRoaXMuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZXJyb3JFbGVtZW50SWQpO1xuICAgICAgICBpZiAoZXJyb3JFbGVtZW50KSB7XG4gICAgICAgICAgICBlcnJvckVsZW1lbnQuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBlcnJvckVsZW1lbnQgPSB0aGlzLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgZXJyb3JFbGVtZW50LnNldEF0dHJpYnV0ZSgnaWQnLCBlcnJvckVsZW1lbnRJZCk7XG4gICAgICAgICAgICBlcnJvckVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInRleHQtZGFuZ2VyXCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlcnJvckVsZW1lbnQ7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gVmFsaWRhdG9yO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBhamF4XzEgPSByZXF1aXJlKFwiLi4vZnJhbWV3b3JrL2FqYXhcIik7XG5jb25zdCB2YWxpZGF0b3JfMSA9IHJlcXVpcmUoXCIuLi9mcmFtZXdvcmsvdmFsaWRhdG9yXCIpO1xuY2xhc3MgSG9tZSB7XG4gICAgY29uc3RydWN0b3IoZ2xvYmFscykge1xuICAgICAgICB0aGlzLmdsb2JhbHMgPSBnbG9iYWxzO1xuICAgICAgICB0aGlzLnZhbGlkYXRvciA9IG5ldyB2YWxpZGF0b3JfMS5kZWZhdWx0KGdsb2JhbHMuZG9jdW1lbnQpO1xuICAgIH1cbiAgICBoYW5kbGVTa3UoZWxlbWVudCwgZSkge1xuICAgICAgICBjb25zdCBkYXRhID0gW3sgc2t1OiBlLnRhcmdldC52YWx1ZSB9XTtcbiAgICAgICAgdGhpcy52YWxpZGF0b3IudmFsaWRhdGUoZGF0YSwgdGhpcy5ydWxlcygnc2t1JyksIGVsZW1lbnQpO1xuICAgIH1cbiAgICBoYW5kbGVOYW1lKGVsZW1lbnQsIGUpIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IFt7IG5hbWU6IGUudGFyZ2V0LnZhbHVlIH1dO1xuICAgICAgICB0aGlzLnZhbGlkYXRvci52YWxpZGF0ZShkYXRhLCB0aGlzLnJ1bGVzKCduYW1lJyksIGVsZW1lbnQpO1xuICAgIH1cbiAgICBoYW5kbGVQcmljZShlbGVtZW50LCBlKSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBbeyBwcmljZTogZS50YXJnZXQudmFsdWUgfV07XG4gICAgICAgIHRoaXMudmFsaWRhdG9yLnZhbGlkYXRlKGRhdGEsIHRoaXMucnVsZXMoJ3ByaWNlJyksIGVsZW1lbnQpO1xuICAgIH1cbiAgICBoYW5kbGVXZWlnaHQoZWxlbWVudCwgZSkge1xuICAgICAgICBjb25zdCBkYXRhID0gW3sgd2VpZ2h0OiBlLnRhcmdldC52YWx1ZSB9XTtcbiAgICAgICAgdGhpcy52YWxpZGF0b3IudmFsaWRhdGUoZGF0YSwgdGhpcy5ydWxlcygnd2VpZ2h0JyksIGVsZW1lbnQpO1xuICAgIH1cbiAgICBoYW5kbGVTaXplKGVsZW1lbnQsIGUpIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IFt7IHNpemU6IGUudGFyZ2V0LnZhbHVlIH1dO1xuICAgICAgICB0aGlzLnZhbGlkYXRvci52YWxpZGF0ZShkYXRhLCB0aGlzLnJ1bGVzKCdzaXplJyksIGVsZW1lbnQpO1xuICAgIH1cbiAgICBoYW5kbGVGbnRIZWlnaHQoZWxlbWVudCwgZSkge1xuICAgICAgICBjb25zdCBkYXRhID0gW3sgaGVpZ2h0OiBlLnRhcmdldC52YWx1ZSB9XTtcbiAgICAgICAgdGhpcy52YWxpZGF0b3IudmFsaWRhdGUoZGF0YSwgdGhpcy5ydWxlcygnaGVpZ2h0JyksIGVsZW1lbnQpO1xuICAgIH1cbiAgICBoYW5kbGVGbnRXaWR0aChlbGVtZW50LCBlKSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBbeyB3aWR0aDogZS50YXJnZXQudmFsdWUgfV07XG4gICAgICAgIHRoaXMudmFsaWRhdG9yLnZhbGlkYXRlKGRhdGEsIHRoaXMucnVsZXMoJ3dpZHRoJyksIGVsZW1lbnQpO1xuICAgIH1cbiAgICBoYW5kbGVGbnRMZW5ndGgoZWxlbWVudCwgZSkge1xuICAgICAgICBjb25zdCBkYXRhID0gW3sgbGVuZ3RoOiBlLnRhcmdldC52YWx1ZSB9XTtcbiAgICAgICAgdGhpcy52YWxpZGF0b3IudmFsaWRhdGUoZGF0YSwgdGhpcy5ydWxlcygnbGVuZ3RoJyksIGVsZW1lbnQpO1xuICAgIH1cbiAgICB0cmltRGF0YShjZGF0YSkge1xuICAgICAgICBjb25zdCBkYXRhID0gY2RhdGFbMF07XG4gICAgICAgIGNvbnN0IGNvbnQgPSB7XG4gICAgICAgICAgICBEVkRzOiAnc2l6ZScsXG4gICAgICAgICAgICBGdXJuaXR1cmU6IFsnaGVpZ2h0JywgJ2xlbmd0aCcsICd3aWR0aCddLFxuICAgICAgICAgICAgQm9va3M6ICd3ZWlnaHQnXG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKiByZW1vdmUgdGhlIHNlbGVjdGVkIGtleSBmcm9tIHRlbXAgYXJyYXlcbiAgICAgICAgICovXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIGRhdGEpIHtcbiAgICAgICAgICAgIGlmIChrZXkgPT0gJ3Byb2R1Y3RUeXBlJykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gZGF0YVtrZXldO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBjb250W3ZhbHVlXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogcmVtb3ZlIGFsbCBvdGhlcnMgZnJvbSBzdWJtaXR0ZWQgZGF0YVxuICAgICAgICAgKi9cbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gY29udCkge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBjb250W2tleV07XG4gICAgICAgICAgICBpZiAodmFsdWUuY29uc3RydWN0b3IgPT09IEFycmF5KSB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBka2V5IGluIGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbSA9PSBka2V5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGRhdGFbZGtleV07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgZGF0YVt2YWx1ZV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtkYXRhXTtcbiAgICB9XG4gICAgaGFuZGxlQ2FuY2VsKGVsZW1lbnQsIGUpIHtcbiAgICAgICAgdGhpcy5nbG9iYWxzLnJlZGlyZWN0KCcvJyk7XG4gICAgfVxuICAgIGhhbmRsZVN1Ym1pdChlbGVtZW50LCBlKSB7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2xvYmFscy5kb2N1bWVudC5mb3Jtc1swXTtcbiAgICAgICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEodGFyZ2V0KTtcbiAgICAgICAgbGV0IGRhdGEgPSBbLi4uZm9ybURhdGEuZW50cmllcygpXS5tYXAoYXJyID0+IHtcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuZnJvbUVudHJpZXMoW2Fycl0pO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy52YWxpZGF0b3IudmFsaWRhdGUoZGF0YSwgdGhpcy5ydWxlcygpKVxuICAgICAgICAgICAgLnRoZW4oKG9iaikgPT4ge1xuICAgICAgICAgICAgaWYgKG9iai52YWxpZGF0aW9uUGFzc2VkKCkpIHtcbiAgICAgICAgICAgICAgICBkYXRhID0gdGhpcy50cmltRGF0YShBcnJheS5vZihPYmplY3QuZnJvbUVudHJpZXMoZm9ybURhdGEuZW50cmllcygpKSkpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld0Zvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gZGF0YVswXSkge1xuICAgICAgICAgICAgICAgICAgICBuZXdGb3JtRGF0YS5hcHBlbmQoa2V5LCBkYXRhWzBdW2tleV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBvcHRpb25zID0geyBtZXRob2Q6ICdwb3N0JywgYm9keTogbmV3Rm9ybURhdGEgfTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYWpheF8xLmRlZmF1bHQucG9zdCgnL2FkZC1wcm9kdWN0Jywgb3B0aW9ucyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09ICdzdWNjZXNzJykge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2xvYmFscy5yZWRpcmVjdCgnLycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjb3VsZCBub3QgY3JlYXRlIHJlY29yZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJ1bGVzKGF0dHJpYnV0ZSkge1xuICAgICAgICBjb25zdCBkYXRhID0gW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpZWxkOiAnc2t1JyxcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiAnU0tVJyxcbiAgICAgICAgICAgICAgICBydWxlczogW1xuICAgICAgICAgICAgICAgICAgICB7IHJ1bGU6ICdyZXF1aXJlZCcsIHJ1bGVfdmFsdWU6IHRydWUgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBydWxlOiAndW5pcXVlJywgcnVsZV92YWx1ZTogJ3Byb2R1Y3QnIH0sXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWVsZDogJ25hbWUnLFxuICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdOYW1lJyxcbiAgICAgICAgICAgICAgICBydWxlczogW1xuICAgICAgICAgICAgICAgICAgICB7IHJ1bGU6ICdyZXF1aXJlZCcsIHJ1bGVfdmFsdWU6IHRydWUgfSxcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpZWxkOiAncHJpY2UnLFxuICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdQcmljZScsXG4gICAgICAgICAgICAgICAgcnVsZXM6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBydWxlOiAncmVxdWlyZWQnLCBydWxlX3ZhbHVlOiB0cnVlIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgcnVsZTogJ251bWVyaWMnLCBydWxlX3ZhbHVlOiB0cnVlIH0sXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWVsZDogJ3dlaWdodCcsXG4gICAgICAgICAgICAgICAgZGlzcGxheTogJ1dlaWdodCcsXG4gICAgICAgICAgICAgICAgcnVsZXM6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBydWxlOiAncmVxdWlyZWQnLCBydWxlX3ZhbHVlOiB0cnVlIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgcnVsZTogJ251bWVyaWMnLCBydWxlX3ZhbHVlOiB0cnVlIH0sXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWVsZDogJ3NpemUnLFxuICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdTaXplJyxcbiAgICAgICAgICAgICAgICBydWxlczogW1xuICAgICAgICAgICAgICAgICAgICB7IHJ1bGU6ICdyZXF1aXJlZCcsIHJ1bGVfdmFsdWU6IHRydWUgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBydWxlOiAnbnVtZXJpYycsIHJ1bGVfdmFsdWU6IHRydWUgfSxcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpZWxkOiAnaGVpZ2h0JyxcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiAnSGVpZ2h0JyxcbiAgICAgICAgICAgICAgICBydWxlczogW1xuICAgICAgICAgICAgICAgICAgICB7IHJ1bGU6ICdyZXF1aXJlZCcsIHJ1bGVfdmFsdWU6IHRydWUgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBydWxlOiAnbnVtZXJpYycsIHJ1bGVfdmFsdWU6IHRydWUgfSxcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpZWxkOiAnd2lkdGgnLFxuICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdXaWR0aCcsXG4gICAgICAgICAgICAgICAgcnVsZXM6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBydWxlOiAncmVxdWlyZWQnLCBydWxlX3ZhbHVlOiB0cnVlIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgcnVsZTogJ251bWVyaWMnLCBydWxlX3ZhbHVlOiB0cnVlIH0sXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWVsZDogJ2xlbmd0aCcsXG4gICAgICAgICAgICAgICAgZGlzcGxheTogJ0xlbmd0aCcsXG4gICAgICAgICAgICAgICAgcnVsZXM6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBydWxlOiAncmVxdWlyZWQnLCBydWxlX3ZhbHVlOiB0cnVlIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgcnVsZTogJ251bWVyaWMnLCBydWxlX3ZhbHVlOiB0cnVlIH0sXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWVsZDogJ3Byb2R1Y3RUeXBlJyxcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiAnVHlwZSBTd2l0Y2hlcicsXG4gICAgICAgICAgICAgICAgcnVsZXM6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBydWxlOiAncmVxdWlyZWQnLCBydWxlX3ZhbHVlOiB0cnVlIH0sXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgXTtcbiAgICAgICAgaWYgKGF0dHJpYnV0ZSlcbiAgICAgICAgICAgIHJldHVybiBkYXRhLmZpbHRlcihvYmogPT4gb2JqLmZpZWxkID09IGF0dHJpYnV0ZSk7XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IEhvbWU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IEhvbWVfMSA9IHJlcXVpcmUoXCIuL0hvbWVcIik7XG5leHBvcnRzLmRlZmF1bHQgPSB7IEhvbWU6IEhvbWVfMS5kZWZhdWx0IH07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBmcmFtZXdvcmtfMSA9IHJlcXVpcmUoXCIuL2ZyYW1ld29yay9mcmFtZXdvcmtcIik7XG5uZXcgZnJhbWV3b3JrXzEuZGVmYXVsdCgpLnN0YXJ0KCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=