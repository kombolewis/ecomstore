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
    // baseURL: 'http://localhost:8000'
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QW9DO0FBQzFELHNCQUFzQixtQ0FBbUM7QUFDekQ7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0Isb0NBQW9DO0FBQzFELHNCQUFzQixtQ0FBbUM7QUFDekQ7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0Isb0NBQW9DO0FBQzFELHNCQUFzQixtQ0FBbUM7QUFDekQ7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0Isb0NBQW9DO0FBQzFEO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFlOzs7Ozs7Ozs7OztBQzVMRjtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxlQUFlLG1CQUFPLENBQUMsdUNBQVE7QUFDL0Isa0JBQWUsS0FBSzs7Ozs7OztVQ0hwQjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7Ozs7Ozs7O0FDdEJhO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELG9CQUFvQixtQkFBTyxDQUFDLDJEQUF1QjtBQUNuRCIsInNvdXJjZXMiOlsid2VicGFjazovL2Zyb250ZW5kLy4vc3JjL2NvbmZpZy9jb25maWcudHMiLCJ3ZWJwYWNrOi8vZnJvbnRlbmQvLi9zcmMvZnJhbWV3b3JrL2FqYXgudHMiLCJ3ZWJwYWNrOi8vZnJvbnRlbmQvLi9zcmMvZnJhbWV3b3JrL2V2ZW50cy50cyIsIndlYnBhY2s6Ly9mcm9udGVuZC8uL3NyYy9mcmFtZXdvcmsvZnJhbWV3b3JrLnRzIiwid2VicGFjazovL2Zyb250ZW5kLy4vc3JjL2ZyYW1ld29yay9nbG9iYWxzLnRzIiwid2VicGFjazovL2Zyb250ZW5kLy4vc3JjL2ZyYW1ld29yay9saXN0ZW5lci50cyIsIndlYnBhY2s6Ly9mcm9udGVuZC8uL3NyYy9mcmFtZXdvcmsvdmFsaWRhdG9yLnRzIiwid2VicGFjazovL2Zyb250ZW5kLy4vc3JjL2xpc3RlbmVycy9Ib21lLnRzIiwid2VicGFjazovL2Zyb250ZW5kLy4vc3JjL2xpc3RlbmVycy9pbmRleC50cyIsIndlYnBhY2s6Ly9mcm9udGVuZC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9mcm9udGVuZC8uL3NyYy9sYXVuY2hlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGNvbmZpZyA9IHtcbiAgICBiYXNlVVJMOiAnaHR0cHM6Ly9lY29tc3RvcmUxNC5oZXJva3VhcHAuY29tJ1xuICAgIC8vIGJhc2VVUkw6ICdodHRwOi8vbG9jYWxob3N0OjgwMDAnXG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gY29uZmlnO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGNvbmZpZ18xID0gcmVxdWlyZShcIi4uL2NvbmZpZy9jb25maWdcIik7XG5jbGFzcyBhamF4IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy51cmwgPSBjb25maWdfMS5kZWZhdWx0LmJhc2VVUkw7XG4gICAgfVxuICAgIGdldChlbmRwb2ludCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgY29uc3QgcmVzcCA9IHlpZWxkIGZldGNoKHRoaXMudXJsICsgZW5kcG9pbnQpO1xuICAgICAgICAgICAgY29uc3QgZGF0YSA9IHlpZWxkIHJlc3AuanNvbigpO1xuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBwb3N0KGVuZHBvaW50LCBvcHRpb25zLCBkYXRhKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBpZiAob3B0aW9ucyA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAncG9zdCcsXG4gICAgICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgcmVzcCA9IHlpZWxkIGZldGNoKHRoaXMudXJsICsgZW5kcG9pbnQsIG9wdGlvbnMpO1xuICAgICAgICAgICAgY29uc3QgZGF0YUpzb24gPSB5aWVsZCByZXNwLmpzb24oKTtcbiAgICAgICAgICAgIHJldHVybiBkYXRhSnNvbjtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gKG5ldyBhamF4KCkpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jbGFzcyBFdmVudHMge1xuICAgIGNvbnN0cnVjdG9yKGdsb2JhbHMpIHtcbiAgICAgICAgdGhpcy5kb2N1bWVudCA9IGdsb2JhbHMuZG9jdW1lbnQ7XG4gICAgfVxuICAgIGdldEV2ZW50cygpIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gW107XG4gICAgICAgIGNvbnN0IGV2ZW50cyA9IHRoaXMucmVnaXN0ZXJlZERvbUV2ZW50cygpO1xuICAgICAgICBldmVudHMuZm9yRWFjaChldmVudCA9PiB7XG4gICAgICAgICAgICBjb25zdCB7IGN1c3RvbUV2ZW50LCBkb21NYXBwaW5nIH0gPSBldmVudDtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnRzID0gdGhpcy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGBbJHtjdXN0b21FdmVudH1dYCk7XG4gICAgICAgICAgICBmb3IgKGxldCBlbGVtZW50IG9mIGVsZW1lbnRzKSB7XG4gICAgICAgICAgICAgICAgbGV0IGxpc3RlbmVyID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoY3VzdG9tRXZlbnQpO1xuICAgICAgICAgICAgICAgIGlmIChsaXN0ZW5lcikge1xuICAgICAgICAgICAgICAgICAgICBjb250YWluZXIucHVzaCh7IGRvbUV2ZW50OiBkb21NYXBwaW5nLCBjYWxsYmFjazogbGlzdGVuZXIsIGVsZW1lbnQgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICB9XG4gICAgcmVnaXN0ZXJlZERvbUV2ZW50cygpIHtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIHsgY3VzdG9tRXZlbnQ6ICdjaGFuZ2UnLCBkb21NYXBwaW5nOiAnY2hhbmdlJyB9LFxuICAgICAgICAgICAgeyBjdXN0b21FdmVudDogJ2lucHV0JywgZG9tTWFwcGluZzogJ2lucHV0JyB9LFxuICAgICAgICAgICAgeyBjdXN0b21FdmVudDogJ3N1Ym1pdCcsIGRvbU1hcHBpbmc6ICdzdWJtaXQnIH0sXG4gICAgICAgICAgICB7IGN1c3RvbUV2ZW50OiAnY2xpY2snLCBkb21NYXBwaW5nOiAnY2xpY2snIH1cbiAgICAgICAgXTtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBFdmVudHM7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGV2ZW50c18xID0gcmVxdWlyZShcIi4vZXZlbnRzXCIpO1xuY29uc3QgbGlzdGVuZXJfMSA9IHJlcXVpcmUoXCIuL2xpc3RlbmVyXCIpO1xuY29uc3QgZ2xvYmFsc18xID0gcmVxdWlyZShcIi4vZ2xvYmFsc1wiKTtcbmNsYXNzIEZyYW1ld29yayB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZ2xvYmFscyA9IGdsb2JhbHNfMS5kZWZhdWx0Lmluc3RhbnRpYXRlKCk7XG4gICAgICAgIHRoaXMuZXZlbnRzID0gbmV3IGV2ZW50c18xLmRlZmF1bHQodGhpcy5nbG9iYWxzKTtcbiAgICAgICAgdGhpcy5saXN0ZW5lciA9IG5ldyBsaXN0ZW5lcl8xLmRlZmF1bHQodGhpcy5nbG9iYWxzLCB0aGlzLmV2ZW50cyk7XG4gICAgfVxuICAgIHN0YXJ0KCkge1xuICAgICAgICB0aGlzLmxpc3RlbigpO1xuICAgIH1cbiAgICBsaXN0ZW4oKSB7XG4gICAgICAgIHRoaXMubGlzdGVuZXIucmVnaXN0ZXIoKTtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBGcmFtZXdvcms7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNsYXNzIEdsb2JhbHMge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmRvYyA9IHdpbmRvdy5kb2N1bWVudDtcbiAgICAgICAgdGhpcy5sb2MgPSB3aW5kb3cubG9jYXRpb247XG4gICAgfVxuICAgIHN0YXRpYyBpbnN0YW50aWF0ZSgpIHtcbiAgICAgICAgaWYgKCFHbG9iYWxzLmluc3RhbmNlKSB7XG4gICAgICAgICAgICBHbG9iYWxzLmluc3RhbmNlID0gbmV3IEdsb2JhbHMoKTsgLy8gdGhlIGluc3RhbmNlIGlzIGFuIG9iamVjdCBvZiB0aGUgZW50aXJlIGNsYXNzXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEdsb2JhbHMuaW5zdGFuY2U7XG4gICAgfVxuICAgIGdldCBkb2N1bWVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZG9jO1xuICAgIH1cbiAgICBnZXQgbG9jYXRpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxvYztcbiAgICB9XG4gICAgcmVkaXJlY3QocGF0aCkge1xuICAgICAgICBjb25zdCBsb2NhdGlvbiA9IHRoaXMubG9jYXRpb247XG4gICAgICAgIGxvY2F0aW9uLnBhdGhuYW1lID0gcGF0aDtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBHbG9iYWxzO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBsaXN0ZW5lcnNfMSA9IHJlcXVpcmUoXCIuLi9saXN0ZW5lcnNcIik7XG5jbGFzcyBMaXN0ZW5lciB7XG4gICAgY29uc3RydWN0b3IoZ2xvYmFscywgZXZlbnRzKSB7XG4gICAgICAgIHRoaXMuZXZlbnRzID0gZXZlbnRzO1xuICAgICAgICB0aGlzLmdsb2JhbHMgPSBnbG9iYWxzO1xuICAgIH1cbiAgICByZWdpc3RlcigpIHtcbiAgICAgICAgT2JqZWN0LmtleXMobGlzdGVuZXJzXzEuZGVmYXVsdCkuZm9yRWFjaChsID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG9iakxpc3RuZXIgPSBuZXcgbGlzdGVuZXJzXzEuZGVmYXVsdFtsXSh0aGlzLmdsb2JhbHMpO1xuICAgICAgICAgICAgdGhpcy5ldmVudHMuZ2V0RXZlbnRzKCkuZm9yRWFjaChvYmogPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgZG9tRXZlbnQsIGNhbGxiYWNrLCBlbGVtZW50IH0gPSBvYmo7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBvYmpMaXN0bmVyW2NhbGxiYWNrXSA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihkb21FdmVudCwgKGUpID0+IG9iakxpc3RuZXJbY2FsbGJhY2tdKGVsZW1lbnQsIGUpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gTGlzdGVuZXI7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgYWpheF8xID0gcmVxdWlyZShcIi4vYWpheFwiKTtcbmNsYXNzIFZhbGlkYXRvciB7XG4gICAgY29uc3RydWN0b3IoZG9jdW1lbnQpIHtcbiAgICAgICAgdGhpcy5wYXNzZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5kb2N1bWVudCA9IGRvY3VtZW50O1xuICAgIH1cbiAgICBjaGVjayhkYXRhLCBpdGVtcykge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgdGhpcy5lcnJvcnMgPSBbXTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgeyBmaWVsZCwgZGlzcGxheSwgcnVsZXMgfSBvZiBpdGVtcykge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgeyBydWxlLCBydWxlX3ZhbHVlIH0gb2YgcnVsZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaW5wdXRWYWx1ZU9iaiA9IGRhdGEuZmluZChvYmogPT4gT2JqZWN0LmtleXMob2JqKS50b1N0cmluZygpID09IGZpZWxkKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBpbnB1dFZhbHVlT2JqW2ZpZWxkXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJ1bGUgPT0gJ3JlcXVpcmVkJyAmJiAhdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuYWRkRXJyb3Ioe2ZpZWxkLCBtZXNzYWdlOmAke2Rpc3BsYXl9IGlzIHJlcXVpcmVkYH0pXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZEVycm9yKHsgZmllbGQsIG1lc3NhZ2U6IGBQbGVhc2UsIHN1Ym1pdCByZXF1aXJlZCBkYXRhYCB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChydWxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnbWluJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlLmxlbmd0aCA8IHJ1bGVfdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkRXJyb3IoeyBmaWVsZCwgbWVzc2FnZTogYCR7ZGlzcGxheX0gbXVzdCBiZSBhIG1pbmltdW0gb2YgJHtydWxlX3ZhbHVlfSBjaGFyYWN0ZXJzYCB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdtYXgnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUubGVuZ3RoID4gcnVsZV92YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRFcnJvcih7IGZpZWxkLCBtZXNzYWdlOiBgJHtkaXNwbGF5fSBtdXN0IGJlIGEgbWF4aW11bSBvZiAke3J1bGVfdmFsdWV9IGNoYXJhY3RlcnNgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3VuaXF1ZSc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHF1ZXJ5ID0geyBzcWw6IGBTRUxFQ1QgJHtmaWVsZH0gRlJPTSAke3J1bGVfdmFsdWV9IFdIRVJFICR7ZmllbGR9ID0gP2AsIGJpbmQ6IFt2YWx1ZV0gfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIHF1ZXJ5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JtRGF0YS5hcHBlbmQoa2V5LCBxdWVyeVtrZXldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBvcHRpb25zID0geyBtZXRob2Q6ICdQT1NUJywgYm9keTogZm9ybURhdGEgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IHlpZWxkIGFqYXhfMS5kZWZhdWx0LnBvc3QoJy92YWxpZGF0ZS11bmlxdWUnLCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuY291bnQgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZEVycm9yKHsgZmllbGQsIG1lc3NhZ2U6IGAke2Rpc3BsYXl9IGFscmVhZHkgZXhpc3RzLiBQbGVhc2UgY2hvb3NlICBhbm90aGVyICR7ZGlzcGxheX1gIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ251bWVyaWMnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNOYU4odmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZEVycm9yKHsgZmllbGQsIG1lc3NhZ2U6IGBQbGVhc2UsIHByb3ZpZGUgdGhlIGRhdGEgb2YgaW5kaWNhdGVkIHR5cGVgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgdmFsaWRhdGUoZGF0YSwgaXRlbXMsIGVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHRoaXMudmFsaWRhdGVIZWxwZXIoZGF0YSwgaXRlbXMsIGVsZW1lbnQpO1xuICAgICAgICAgICAgdGhpcy5jaGVja3Bhc3NlZCgpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICB2YWxpZGF0ZUhlbHBlcihkYXRhLCBpdGVtcywgZWxlbWVudCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICB5aWVsZCB0aGlzLmNoZWNrKGRhdGEsIGl0ZW1zKTtcbiAgICAgICAgICAgICAgICB0aGlzLndyaXRlKGVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBvYmogb2YgZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChPYmplY3Qua2V5cyhvYmopLnRvU3RyaW5nKCkgPT0gaXRlbS5maWVsZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHlpZWxkIHRoaXMuY2hlY2soW29ial0sIFtpdGVtXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53cml0ZSh0aGlzLmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGl0ZW0uZmllbGQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGFkZEVycm9yKGVycm9yKSB7XG4gICAgICAgIHRoaXMuZXJyb3JzLnB1c2goZXJyb3IpO1xuICAgICAgICBpZiAodGhpcy5lcnJvcnMubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgIHRoaXMucGFzc2VkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucGFzc2VkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2hlY2twYXNzZWQoKSB7XG4gICAgICAgIGlmICh0aGlzLmVycm9ycy5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgdGhpcy5wYXNzZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHZhbGlkYXRpb25QYXNzZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhc3NlZDtcbiAgICB9XG4gICAgd3JpdGUoZWxlbWVudCkge1xuICAgICAgICBjb25zdCBlcnJvckVsZW1lbnQgPSB0aGlzLmdldEVycm9yRWxlbWVudChlbGVtZW50KTtcbiAgICAgICAgY29uc3QgbGlzdCA9IHRoaXMuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgICAgICAgZXJyb3JFbGVtZW50LmFwcGVuZENoaWxkKGxpc3QpO1xuICAgICAgICBmb3IgKGNvbnN0IHsgbWVzc2FnZSB9IG9mIHRoaXMuZXJyb3JzKSB7XG4gICAgICAgICAgICBjb25zdCBsaSA9IHRoaXMuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKS5hcHBlbmRDaGlsZCh0aGlzLmRvY3VtZW50LmNyZWF0ZVRleHROb2RlKG1lc3NhZ2UpKTtcbiAgICAgICAgICAgIGxpc3QuYXBwZW5kQ2hpbGQobGkpO1xuICAgICAgICB9XG4gICAgICAgIGVsZW1lbnQuYWZ0ZXIoZXJyb3JFbGVtZW50KTtcbiAgICB9XG4gICAgZ2V0RXJyb3JFbGVtZW50KGVsZW1lbnQpIHtcbiAgICAgICAgY29uc3QgZWxlbWVudGlkID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2lkJyk7XG4gICAgICAgIGNvbnN0IGVycm9yRWxlbWVudElkID0gZWxlbWVudGlkICsgJ0Vycm9ycyc7XG4gICAgICAgIGxldCBlcnJvckVsZW1lbnQgPSB0aGlzLmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVycm9yRWxlbWVudElkKTtcbiAgICAgICAgaWYgKGVycm9yRWxlbWVudCkge1xuICAgICAgICAgICAgZXJyb3JFbGVtZW50LmlubmVySFRNTCA9ICcnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZXJyb3JFbGVtZW50ID0gdGhpcy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGVycm9yRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2lkJywgZXJyb3JFbGVtZW50SWQpO1xuICAgICAgICAgICAgZXJyb3JFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJ0ZXh0LWRhbmdlclwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZXJyb3JFbGVtZW50O1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IFZhbGlkYXRvcjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgYWpheF8xID0gcmVxdWlyZShcIi4uL2ZyYW1ld29yay9hamF4XCIpO1xuY29uc3QgdmFsaWRhdG9yXzEgPSByZXF1aXJlKFwiLi4vZnJhbWV3b3JrL3ZhbGlkYXRvclwiKTtcbmNsYXNzIEhvbWUge1xuICAgIGNvbnN0cnVjdG9yKGdsb2JhbHMpIHtcbiAgICAgICAgdGhpcy5nbG9iYWxzID0gZ2xvYmFscztcbiAgICAgICAgdGhpcy52YWxpZGF0b3IgPSBuZXcgdmFsaWRhdG9yXzEuZGVmYXVsdChnbG9iYWxzLmRvY3VtZW50KTtcbiAgICB9XG4gICAgaGFuZGxlU2t1KGVsZW1lbnQsIGUpIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IFt7IHNrdTogZS50YXJnZXQudmFsdWUgfV07XG4gICAgICAgIHRoaXMudmFsaWRhdG9yLnZhbGlkYXRlKGRhdGEsIHRoaXMucnVsZXMoJ3NrdScpLCBlbGVtZW50KTtcbiAgICB9XG4gICAgaGFuZGxlTmFtZShlbGVtZW50LCBlKSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBbeyBuYW1lOiBlLnRhcmdldC52YWx1ZSB9XTtcbiAgICAgICAgdGhpcy52YWxpZGF0b3IudmFsaWRhdGUoZGF0YSwgdGhpcy5ydWxlcygnbmFtZScpLCBlbGVtZW50KTtcbiAgICB9XG4gICAgaGFuZGxlUHJpY2UoZWxlbWVudCwgZSkge1xuICAgICAgICBjb25zdCBkYXRhID0gW3sgcHJpY2U6IGUudGFyZ2V0LnZhbHVlIH1dO1xuICAgICAgICB0aGlzLnZhbGlkYXRvci52YWxpZGF0ZShkYXRhLCB0aGlzLnJ1bGVzKCdwcmljZScpLCBlbGVtZW50KTtcbiAgICB9XG4gICAgaGFuZGxlV2VpZ2h0KGVsZW1lbnQsIGUpIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IFt7IHdlaWdodDogZS50YXJnZXQudmFsdWUgfV07XG4gICAgICAgIHRoaXMudmFsaWRhdG9yLnZhbGlkYXRlKGRhdGEsIHRoaXMucnVsZXMoJ3dlaWdodCcpLCBlbGVtZW50KTtcbiAgICB9XG4gICAgaGFuZGxlU2l6ZShlbGVtZW50LCBlKSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBbeyBzaXplOiBlLnRhcmdldC52YWx1ZSB9XTtcbiAgICAgICAgdGhpcy52YWxpZGF0b3IudmFsaWRhdGUoZGF0YSwgdGhpcy5ydWxlcygnc2l6ZScpLCBlbGVtZW50KTtcbiAgICB9XG4gICAgaGFuZGxlRm50SGVpZ2h0KGVsZW1lbnQsIGUpIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IFt7IGhlaWdodDogZS50YXJnZXQudmFsdWUgfV07XG4gICAgICAgIHRoaXMudmFsaWRhdG9yLnZhbGlkYXRlKGRhdGEsIHRoaXMucnVsZXMoJ2hlaWdodCcpLCBlbGVtZW50KTtcbiAgICB9XG4gICAgaGFuZGxlRm50V2lkdGgoZWxlbWVudCwgZSkge1xuICAgICAgICBjb25zdCBkYXRhID0gW3sgd2lkdGg6IGUudGFyZ2V0LnZhbHVlIH1dO1xuICAgICAgICB0aGlzLnZhbGlkYXRvci52YWxpZGF0ZShkYXRhLCB0aGlzLnJ1bGVzKCd3aWR0aCcpLCBlbGVtZW50KTtcbiAgICB9XG4gICAgaGFuZGxlRm50TGVuZ3RoKGVsZW1lbnQsIGUpIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IFt7IGxlbmd0aDogZS50YXJnZXQudmFsdWUgfV07XG4gICAgICAgIHRoaXMudmFsaWRhdG9yLnZhbGlkYXRlKGRhdGEsIHRoaXMucnVsZXMoJ2xlbmd0aCcpLCBlbGVtZW50KTtcbiAgICB9XG4gICAgdHJpbURhdGEoY2RhdGEpIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IGNkYXRhWzBdO1xuICAgICAgICBjb25zdCBjb250ID0ge1xuICAgICAgICAgICAgRFZEczogJ3NpemUnLFxuICAgICAgICAgICAgRnVybml0dXJlOiBbJ2hlaWdodCcsICdsZW5ndGgnLCAnd2lkdGgnXSxcbiAgICAgICAgICAgIEJvb2tzOiAnd2VpZ2h0J1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICogcmVtb3ZlIHRoZSBzZWxlY3RlZCBrZXkgZnJvbSB0ZW1wIGFycmF5XG4gICAgICAgICAqL1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBkYXRhKSB7XG4gICAgICAgICAgICBpZiAoa2V5ID09ICdwcm9kdWN0VHlwZScpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGRhdGFba2V5XTtcbiAgICAgICAgICAgICAgICBkZWxldGUgY29udFt2YWx1ZV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIHJlbW92ZSBhbGwgb3RoZXJzIGZyb20gc3VibWl0dGVkIGRhdGFcbiAgICAgICAgICovXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIGNvbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gY29udFtrZXldO1xuICAgICAgICAgICAgaWYgKHZhbHVlLmNvbnN0cnVjdG9yID09PSBBcnJheSkge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgZGtleSBpbiBkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0gPT0gZGtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBkYXRhW2RrZXldO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIGRhdGFbdmFsdWVdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbZGF0YV07XG4gICAgfVxuICAgIGhhbmRsZUNhbmNlbChlbGVtZW50LCBlKSB7XG4gICAgICAgIHRoaXMuZ2xvYmFscy5yZWRpcmVjdCgnLycpO1xuICAgIH1cbiAgICBoYW5kbGVTdWJtaXQoZWxlbWVudCwgZSkge1xuICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdsb2JhbHMuZG9jdW1lbnQuZm9ybXNbMF07XG4gICAgICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKHRhcmdldCk7XG4gICAgICAgIGxldCBkYXRhID0gWy4uLmZvcm1EYXRhLmVudHJpZXMoKV0ubWFwKGFyciA9PiB7XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmZyb21FbnRyaWVzKFthcnJdKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMudmFsaWRhdG9yLnZhbGlkYXRlKGRhdGEsIHRoaXMucnVsZXMoKSlcbiAgICAgICAgICAgIC50aGVuKChvYmopID0+IHtcbiAgICAgICAgICAgIGlmIChvYmoudmFsaWRhdGlvblBhc3NlZCgpKSB7XG4gICAgICAgICAgICAgICAgZGF0YSA9IHRoaXMudHJpbURhdGEoQXJyYXkub2YoT2JqZWN0LmZyb21FbnRyaWVzKGZvcm1EYXRhLmVudHJpZXMoKSkpKTtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdGb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIGRhdGFbMF0pIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3Rm9ybURhdGEuYXBwZW5kKGtleSwgZGF0YVswXVtrZXldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHsgbWV0aG9kOiAncG9zdCcsIGJvZHk6IG5ld0Zvcm1EYXRhIH07XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFqYXhfMS5kZWZhdWx0LnBvc3QoJy9hZGQtcHJvZHVjdCcsIG9wdGlvbnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PSAnc3VjY2VzcycpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdsb2JhbHMucmVkaXJlY3QoJy8nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignY291bGQgbm90IGNyZWF0ZSByZWNvcmQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBydWxlcyhhdHRyaWJ1dGUpIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWVsZDogJ3NrdScsXG4gICAgICAgICAgICAgICAgZGlzcGxheTogJ1NLVScsXG4gICAgICAgICAgICAgICAgcnVsZXM6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBydWxlOiAncmVxdWlyZWQnLCBydWxlX3ZhbHVlOiB0cnVlIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgcnVsZTogJ3VuaXF1ZScsIHJ1bGVfdmFsdWU6ICdwcm9kdWN0JyB9LFxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmllbGQ6ICduYW1lJyxcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiAnTmFtZScsXG4gICAgICAgICAgICAgICAgcnVsZXM6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBydWxlOiAncmVxdWlyZWQnLCBydWxlX3ZhbHVlOiB0cnVlIH0sXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWVsZDogJ3ByaWNlJyxcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiAnUHJpY2UnLFxuICAgICAgICAgICAgICAgIHJ1bGVzOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgcnVsZTogJ3JlcXVpcmVkJywgcnVsZV92YWx1ZTogdHJ1ZSB9LFxuICAgICAgICAgICAgICAgICAgICB7IHJ1bGU6ICdudW1lcmljJywgcnVsZV92YWx1ZTogdHJ1ZSB9LFxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmllbGQ6ICd3ZWlnaHQnLFxuICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdXZWlnaHQnLFxuICAgICAgICAgICAgICAgIHJ1bGVzOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgcnVsZTogJ3JlcXVpcmVkJywgcnVsZV92YWx1ZTogdHJ1ZSB9LFxuICAgICAgICAgICAgICAgICAgICB7IHJ1bGU6ICdudW1lcmljJywgcnVsZV92YWx1ZTogdHJ1ZSB9LFxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmllbGQ6ICdzaXplJyxcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiAnU2l6ZScsXG4gICAgICAgICAgICAgICAgcnVsZXM6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBydWxlOiAncmVxdWlyZWQnLCBydWxlX3ZhbHVlOiB0cnVlIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgcnVsZTogJ251bWVyaWMnLCBydWxlX3ZhbHVlOiB0cnVlIH0sXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWVsZDogJ2hlaWdodCcsXG4gICAgICAgICAgICAgICAgZGlzcGxheTogJ0hlaWdodCcsXG4gICAgICAgICAgICAgICAgcnVsZXM6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBydWxlOiAncmVxdWlyZWQnLCBydWxlX3ZhbHVlOiB0cnVlIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgcnVsZTogJ251bWVyaWMnLCBydWxlX3ZhbHVlOiB0cnVlIH0sXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmaWVsZDogJ3dpZHRoJyxcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiAnV2lkdGgnLFxuICAgICAgICAgICAgICAgIHJ1bGVzOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgcnVsZTogJ3JlcXVpcmVkJywgcnVsZV92YWx1ZTogdHJ1ZSB9LFxuICAgICAgICAgICAgICAgICAgICB7IHJ1bGU6ICdudW1lcmljJywgcnVsZV92YWx1ZTogdHJ1ZSB9LFxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmllbGQ6ICdsZW5ndGgnLFxuICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdMZW5ndGgnLFxuICAgICAgICAgICAgICAgIHJ1bGVzOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgcnVsZTogJ3JlcXVpcmVkJywgcnVsZV92YWx1ZTogdHJ1ZSB9LFxuICAgICAgICAgICAgICAgICAgICB7IHJ1bGU6ICdudW1lcmljJywgcnVsZV92YWx1ZTogdHJ1ZSB9LFxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmllbGQ6ICdwcm9kdWN0VHlwZScsXG4gICAgICAgICAgICAgICAgZGlzcGxheTogJ1R5cGUgU3dpdGNoZXInLFxuICAgICAgICAgICAgICAgIHJ1bGVzOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgcnVsZTogJ3JlcXVpcmVkJywgcnVsZV92YWx1ZTogdHJ1ZSB9LFxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIF07XG4gICAgICAgIGlmIChhdHRyaWJ1dGUpXG4gICAgICAgICAgICByZXR1cm4gZGF0YS5maWx0ZXIob2JqID0+IG9iai5maWVsZCA9PSBhdHRyaWJ1dGUpO1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBIb21lO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBIb21lXzEgPSByZXF1aXJlKFwiLi9Ib21lXCIpO1xuZXhwb3J0cy5kZWZhdWx0ID0geyBIb21lOiBIb21lXzEuZGVmYXVsdCB9O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgZnJhbWV3b3JrXzEgPSByZXF1aXJlKFwiLi9mcmFtZXdvcmsvZnJhbWV3b3JrXCIpO1xubmV3IGZyYW1ld29ya18xLmRlZmF1bHQoKS5zdGFydCgpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9