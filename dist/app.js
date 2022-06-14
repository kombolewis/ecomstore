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
    baseURL: 'http://localhost:8000'
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
            console.log(response);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QW9DO0FBQzFELHNCQUFzQixtQ0FBbUM7QUFDekQ7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0Isb0NBQW9DO0FBQzFELHNCQUFzQixtQ0FBbUM7QUFDekQ7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0Isb0NBQW9DO0FBQzFELHNCQUFzQixtQ0FBbUM7QUFDekQ7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0Isb0NBQW9DO0FBQzFEO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFlOzs7Ozs7Ozs7OztBQzdMRjtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxlQUFlLG1CQUFPLENBQUMsdUNBQVE7QUFDL0Isa0JBQWUsS0FBSzs7Ozs7OztVQ0hwQjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7Ozs7Ozs7O0FDdEJhO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELG9CQUFvQixtQkFBTyxDQUFDLDJEQUF1QjtBQUNuRCIsInNvdXJjZXMiOlsid2VicGFjazovL2Zyb250ZW5kLy4vc3JjL2NvbmZpZy9jb25maWcudHMiLCJ3ZWJwYWNrOi8vZnJvbnRlbmQvLi9zcmMvZnJhbWV3b3JrL2FqYXgudHMiLCJ3ZWJwYWNrOi8vZnJvbnRlbmQvLi9zcmMvZnJhbWV3b3JrL2V2ZW50cy50cyIsIndlYnBhY2s6Ly9mcm9udGVuZC8uL3NyYy9mcmFtZXdvcmsvZnJhbWV3b3JrLnRzIiwid2VicGFjazovL2Zyb250ZW5kLy4vc3JjL2ZyYW1ld29yay9nbG9iYWxzLnRzIiwid2VicGFjazovL2Zyb250ZW5kLy4vc3JjL2ZyYW1ld29yay9saXN0ZW5lci50cyIsIndlYnBhY2s6Ly9mcm9udGVuZC8uL3NyYy9mcmFtZXdvcmsvdmFsaWRhdG9yLnRzIiwid2VicGFjazovL2Zyb250ZW5kLy4vc3JjL2xpc3RlbmVycy9Ib21lLnRzIiwid2VicGFjazovL2Zyb250ZW5kLy4vc3JjL2xpc3RlbmVycy9pbmRleC50cyIsIndlYnBhY2s6Ly9mcm9udGVuZC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9mcm9udGVuZC8uL3NyYy9sYXVuY2hlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGNvbmZpZyA9IHtcbiAgICBiYXNlVVJMOiAnaHR0cDovL2xvY2FsaG9zdDo4MDAwJ1xufTtcbmV4cG9ydHMuZGVmYXVsdCA9IGNvbmZpZztcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBjb25maWdfMSA9IHJlcXVpcmUoXCIuLi9jb25maWcvY29uZmlnXCIpO1xuY2xhc3MgYWpheCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMudXJsID0gY29uZmlnXzEuZGVmYXVsdC5iYXNlVVJMO1xuICAgIH1cbiAgICBnZXQoZW5kcG9pbnQpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3AgPSB5aWVsZCBmZXRjaCh0aGlzLnVybCArIGVuZHBvaW50KTtcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB5aWVsZCByZXNwLmpzb24oKTtcbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcG9zdChlbmRwb2ludCwgb3B0aW9ucywgZGF0YSkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIG9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxuICAgICAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKSxcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHJlc3AgPSB5aWVsZCBmZXRjaCh0aGlzLnVybCArIGVuZHBvaW50LCBvcHRpb25zKTtcbiAgICAgICAgICAgIGNvbnN0IGRhdGFKc29uID0geWllbGQgcmVzcC5qc29uKCk7XG4gICAgICAgICAgICByZXR1cm4gZGF0YUpzb247XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IChuZXcgYWpheCgpKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY2xhc3MgRXZlbnRzIHtcbiAgICBjb25zdHJ1Y3RvcihnbG9iYWxzKSB7XG4gICAgICAgIHRoaXMuZG9jdW1lbnQgPSBnbG9iYWxzLmRvY3VtZW50O1xuICAgIH1cbiAgICBnZXRFdmVudHMoKSB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IFtdO1xuICAgICAgICBjb25zdCBldmVudHMgPSB0aGlzLnJlZ2lzdGVyZWREb21FdmVudHMoKTtcbiAgICAgICAgZXZlbnRzLmZvckVhY2goZXZlbnQgPT4ge1xuICAgICAgICAgICAgY29uc3QgeyBjdXN0b21FdmVudCwgZG9tTWFwcGluZyB9ID0gZXZlbnQ7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50cyA9IHRoaXMuZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgWyR7Y3VzdG9tRXZlbnR9XWApO1xuICAgICAgICAgICAgZm9yIChsZXQgZWxlbWVudCBvZiBlbGVtZW50cykge1xuICAgICAgICAgICAgICAgIGxldCBsaXN0ZW5lciA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKGN1c3RvbUV2ZW50KTtcbiAgICAgICAgICAgICAgICBpZiAobGlzdGVuZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLnB1c2goeyBkb21FdmVudDogZG9tTWFwcGluZywgY2FsbGJhY2s6IGxpc3RlbmVyLCBlbGVtZW50IH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfVxuICAgIHJlZ2lzdGVyZWREb21FdmVudHMoKSB7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICB7IGN1c3RvbUV2ZW50OiAnY2hhbmdlJywgZG9tTWFwcGluZzogJ2NoYW5nZScgfSxcbiAgICAgICAgICAgIHsgY3VzdG9tRXZlbnQ6ICdpbnB1dCcsIGRvbU1hcHBpbmc6ICdpbnB1dCcgfSxcbiAgICAgICAgICAgIHsgY3VzdG9tRXZlbnQ6ICdzdWJtaXQnLCBkb21NYXBwaW5nOiAnc3VibWl0JyB9LFxuICAgICAgICAgICAgeyBjdXN0b21FdmVudDogJ2NsaWNrJywgZG9tTWFwcGluZzogJ2NsaWNrJyB9XG4gICAgICAgIF07XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gRXZlbnRzO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBldmVudHNfMSA9IHJlcXVpcmUoXCIuL2V2ZW50c1wiKTtcbmNvbnN0IGxpc3RlbmVyXzEgPSByZXF1aXJlKFwiLi9saXN0ZW5lclwiKTtcbmNvbnN0IGdsb2JhbHNfMSA9IHJlcXVpcmUoXCIuL2dsb2JhbHNcIik7XG5jbGFzcyBGcmFtZXdvcmsge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmdsb2JhbHMgPSBnbG9iYWxzXzEuZGVmYXVsdC5pbnN0YW50aWF0ZSgpO1xuICAgICAgICB0aGlzLmV2ZW50cyA9IG5ldyBldmVudHNfMS5kZWZhdWx0KHRoaXMuZ2xvYmFscyk7XG4gICAgICAgIHRoaXMubGlzdGVuZXIgPSBuZXcgbGlzdGVuZXJfMS5kZWZhdWx0KHRoaXMuZ2xvYmFscywgdGhpcy5ldmVudHMpO1xuICAgIH1cbiAgICBzdGFydCgpIHtcbiAgICAgICAgdGhpcy5saXN0ZW4oKTtcbiAgICB9XG4gICAgbGlzdGVuKCkge1xuICAgICAgICB0aGlzLmxpc3RlbmVyLnJlZ2lzdGVyKCk7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gRnJhbWV3b3JrO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jbGFzcyBHbG9iYWxzIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5kb2MgPSB3aW5kb3cuZG9jdW1lbnQ7XG4gICAgICAgIHRoaXMubG9jID0gd2luZG93LmxvY2F0aW9uO1xuICAgIH1cbiAgICBzdGF0aWMgaW5zdGFudGlhdGUoKSB7XG4gICAgICAgIGlmICghR2xvYmFscy5pbnN0YW5jZSkge1xuICAgICAgICAgICAgR2xvYmFscy5pbnN0YW5jZSA9IG5ldyBHbG9iYWxzKCk7IC8vIHRoZSBpbnN0YW5jZSBpcyBhbiBvYmplY3Qgb2YgdGhlIGVudGlyZSBjbGFzc1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBHbG9iYWxzLmluc3RhbmNlO1xuICAgIH1cbiAgICBnZXQgZG9jdW1lbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRvYztcbiAgICB9XG4gICAgZ2V0IGxvY2F0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5sb2M7XG4gICAgfVxuICAgIHJlZGlyZWN0KHBhdGgpIHtcbiAgICAgICAgY29uc3QgbG9jYXRpb24gPSB0aGlzLmxvY2F0aW9uO1xuICAgICAgICBsb2NhdGlvbi5wYXRobmFtZSA9IHBhdGg7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gR2xvYmFscztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgbGlzdGVuZXJzXzEgPSByZXF1aXJlKFwiLi4vbGlzdGVuZXJzXCIpO1xuY2xhc3MgTGlzdGVuZXIge1xuICAgIGNvbnN0cnVjdG9yKGdsb2JhbHMsIGV2ZW50cykge1xuICAgICAgICB0aGlzLmV2ZW50cyA9IGV2ZW50cztcbiAgICAgICAgdGhpcy5nbG9iYWxzID0gZ2xvYmFscztcbiAgICB9XG4gICAgcmVnaXN0ZXIoKSB7XG4gICAgICAgIE9iamVjdC5rZXlzKGxpc3RlbmVyc18xLmRlZmF1bHQpLmZvckVhY2gobCA9PiB7XG4gICAgICAgICAgICBjb25zdCBvYmpMaXN0bmVyID0gbmV3IGxpc3RlbmVyc18xLmRlZmF1bHRbbF0odGhpcy5nbG9iYWxzKTtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzLmdldEV2ZW50cygpLmZvckVhY2gob2JqID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IGRvbUV2ZW50LCBjYWxsYmFjaywgZWxlbWVudCB9ID0gb2JqO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygb2JqTGlzdG5lcltjYWxsYmFja10gPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZG9tRXZlbnQsIChlKSA9PiBvYmpMaXN0bmVyW2NhbGxiYWNrXShlbGVtZW50LCBlKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IExpc3RlbmVyO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGFqYXhfMSA9IHJlcXVpcmUoXCIuL2FqYXhcIik7XG5jbGFzcyBWYWxpZGF0b3Ige1xuICAgIGNvbnN0cnVjdG9yKGRvY3VtZW50KSB7XG4gICAgICAgIHRoaXMucGFzc2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZG9jdW1lbnQgPSBkb2N1bWVudDtcbiAgICB9XG4gICAgY2hlY2soZGF0YSwgaXRlbXMpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHRoaXMuZXJyb3JzID0gW107XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHsgZmllbGQsIGRpc3BsYXksIHJ1bGVzIH0gb2YgaXRlbXMpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHsgcnVsZSwgcnVsZV92YWx1ZSB9IG9mIHJ1bGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGlucHV0VmFsdWVPYmogPSBkYXRhLmZpbmQob2JqID0+IE9iamVjdC5rZXlzKG9iaikudG9TdHJpbmcoKSA9PSBmaWVsZCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gaW5wdXRWYWx1ZU9ialtmaWVsZF07XG4gICAgICAgICAgICAgICAgICAgIGlmIChydWxlID09ICdyZXF1aXJlZCcgJiYgIXZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLmFkZEVycm9yKHtmaWVsZCwgbWVzc2FnZTpgJHtkaXNwbGF5fSBpcyByZXF1aXJlZGB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRFcnJvcih7IGZpZWxkLCBtZXNzYWdlOiBgUGxlYXNlLCBzdWJtaXQgcmVxdWlyZWQgZGF0YWAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAocnVsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ21pbic6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZS5sZW5ndGggPCBydWxlX3ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZEVycm9yKHsgZmllbGQsIG1lc3NhZ2U6IGAke2Rpc3BsYXl9IG11c3QgYmUgYSBtaW5pbXVtIG9mICR7cnVsZV92YWx1ZX0gY2hhcmFjdGVyc2AgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnbWF4JzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlLmxlbmd0aCA+IHJ1bGVfdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkRXJyb3IoeyBmaWVsZCwgbWVzc2FnZTogYCR7ZGlzcGxheX0gbXVzdCBiZSBhIG1heGltdW0gb2YgJHtydWxlX3ZhbHVlfSBjaGFyYWN0ZXJzYCB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICd1bmlxdWUnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBxdWVyeSA9IHsgc3FsOiBgU0VMRUNUICR7ZmllbGR9IEZST00gJHtydWxlX3ZhbHVlfSBXSEVSRSAke2ZpZWxkfSA9ID9gLCBiaW5kOiBbdmFsdWVdIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBxdWVyeSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybURhdGEuYXBwZW5kKGtleSwgcXVlcnlba2V5XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHsgbWV0aG9kOiAnUE9TVCcsIGJvZHk6IGZvcm1EYXRhIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB5aWVsZCBhamF4XzEuZGVmYXVsdC5wb3N0KCcvdmFsaWRhdGUtdW5pcXVlJywgb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLmNvdW50ID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRFcnJvcih7IGZpZWxkLCBtZXNzYWdlOiBgJHtkaXNwbGF5fSBhbHJlYWR5IGV4aXN0cy4gUGxlYXNlIGNob29zZSAgYW5vdGhlciAke2Rpc3BsYXl9YCB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdudW1lcmljJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzTmFOKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRFcnJvcih7IGZpZWxkLCBtZXNzYWdlOiBgUGxlYXNlLCBwcm92aWRlIHRoZSBkYXRhIG9mIGluZGljYXRlZCB0eXBlYCB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHZhbGlkYXRlKGRhdGEsIGl0ZW1zLCBlbGVtZW50KSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICB0aGlzLnZhbGlkYXRlSGVscGVyKGRhdGEsIGl0ZW1zLCBlbGVtZW50KTtcbiAgICAgICAgICAgIHRoaXMuY2hlY2twYXNzZWQoKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgdmFsaWRhdGVIZWxwZXIoZGF0YSwgaXRlbXMsIGVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGlmIChlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgeWllbGQgdGhpcy5jaGVjayhkYXRhLCBpdGVtcyk7XG4gICAgICAgICAgICAgICAgdGhpcy53cml0ZShlbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3Qgb2JqIG9mIGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoT2JqZWN0LmtleXMob2JqKS50b1N0cmluZygpID09IGl0ZW0uZmllbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB5aWVsZCB0aGlzLmNoZWNrKFtvYmpdLCBbaXRlbV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud3JpdGUodGhpcy5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChpdGVtLmZpZWxkKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBhZGRFcnJvcihlcnJvcikge1xuICAgICAgICB0aGlzLmVycm9ycy5wdXNoKGVycm9yKTtcbiAgICAgICAgaWYgKHRoaXMuZXJyb3JzLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnBhc3NlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnBhc3NlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNoZWNrcGFzc2VkKCkge1xuICAgICAgICBpZiAodGhpcy5lcnJvcnMubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgIHRoaXMucGFzc2VkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB2YWxpZGF0aW9uUGFzc2VkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wYXNzZWQ7XG4gICAgfVxuICAgIHdyaXRlKGVsZW1lbnQpIHtcbiAgICAgICAgY29uc3QgZXJyb3JFbGVtZW50ID0gdGhpcy5nZXRFcnJvckVsZW1lbnQoZWxlbWVudCk7XG4gICAgICAgIGNvbnN0IGxpc3QgPSB0aGlzLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gICAgICAgIGVycm9yRWxlbWVudC5hcHBlbmRDaGlsZChsaXN0KTtcbiAgICAgICAgZm9yIChjb25zdCB7IG1lc3NhZ2UgfSBvZiB0aGlzLmVycm9ycykge1xuICAgICAgICAgICAgY29uc3QgbGkgPSB0aGlzLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJykuYXBwZW5kQ2hpbGQodGhpcy5kb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShtZXNzYWdlKSk7XG4gICAgICAgICAgICBsaXN0LmFwcGVuZENoaWxkKGxpKTtcbiAgICAgICAgfVxuICAgICAgICBlbGVtZW50LmFmdGVyKGVycm9yRWxlbWVudCk7XG4gICAgfVxuICAgIGdldEVycm9yRWxlbWVudChlbGVtZW50KSB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnRpZCA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdpZCcpO1xuICAgICAgICBjb25zdCBlcnJvckVsZW1lbnRJZCA9IGVsZW1lbnRpZCArICdFcnJvcnMnO1xuICAgICAgICBsZXQgZXJyb3JFbGVtZW50ID0gdGhpcy5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChlcnJvckVsZW1lbnRJZCk7XG4gICAgICAgIGlmIChlcnJvckVsZW1lbnQpIHtcbiAgICAgICAgICAgIGVycm9yRWxlbWVudC5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGVycm9yRWxlbWVudCA9IHRoaXMuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBlcnJvckVsZW1lbnQuc2V0QXR0cmlidXRlKCdpZCcsIGVycm9yRWxlbWVudElkKTtcbiAgICAgICAgICAgIGVycm9yRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwidGV4dC1kYW5nZXJcIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVycm9yRWxlbWVudDtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBWYWxpZGF0b3I7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGFqYXhfMSA9IHJlcXVpcmUoXCIuLi9mcmFtZXdvcmsvYWpheFwiKTtcbmNvbnN0IHZhbGlkYXRvcl8xID0gcmVxdWlyZShcIi4uL2ZyYW1ld29yay92YWxpZGF0b3JcIik7XG5jbGFzcyBIb21lIHtcbiAgICBjb25zdHJ1Y3RvcihnbG9iYWxzKSB7XG4gICAgICAgIHRoaXMuZ2xvYmFscyA9IGdsb2JhbHM7XG4gICAgICAgIHRoaXMudmFsaWRhdG9yID0gbmV3IHZhbGlkYXRvcl8xLmRlZmF1bHQoZ2xvYmFscy5kb2N1bWVudCk7XG4gICAgfVxuICAgIGhhbmRsZVNrdShlbGVtZW50LCBlKSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBbeyBza3U6IGUudGFyZ2V0LnZhbHVlIH1dO1xuICAgICAgICB0aGlzLnZhbGlkYXRvci52YWxpZGF0ZShkYXRhLCB0aGlzLnJ1bGVzKCdza3UnKSwgZWxlbWVudCk7XG4gICAgfVxuICAgIGhhbmRsZU5hbWUoZWxlbWVudCwgZSkge1xuICAgICAgICBjb25zdCBkYXRhID0gW3sgbmFtZTogZS50YXJnZXQudmFsdWUgfV07XG4gICAgICAgIHRoaXMudmFsaWRhdG9yLnZhbGlkYXRlKGRhdGEsIHRoaXMucnVsZXMoJ25hbWUnKSwgZWxlbWVudCk7XG4gICAgfVxuICAgIGhhbmRsZVByaWNlKGVsZW1lbnQsIGUpIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IFt7IHByaWNlOiBlLnRhcmdldC52YWx1ZSB9XTtcbiAgICAgICAgdGhpcy52YWxpZGF0b3IudmFsaWRhdGUoZGF0YSwgdGhpcy5ydWxlcygncHJpY2UnKSwgZWxlbWVudCk7XG4gICAgfVxuICAgIGhhbmRsZVdlaWdodChlbGVtZW50LCBlKSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBbeyB3ZWlnaHQ6IGUudGFyZ2V0LnZhbHVlIH1dO1xuICAgICAgICB0aGlzLnZhbGlkYXRvci52YWxpZGF0ZShkYXRhLCB0aGlzLnJ1bGVzKCd3ZWlnaHQnKSwgZWxlbWVudCk7XG4gICAgfVxuICAgIGhhbmRsZVNpemUoZWxlbWVudCwgZSkge1xuICAgICAgICBjb25zdCBkYXRhID0gW3sgc2l6ZTogZS50YXJnZXQudmFsdWUgfV07XG4gICAgICAgIHRoaXMudmFsaWRhdG9yLnZhbGlkYXRlKGRhdGEsIHRoaXMucnVsZXMoJ3NpemUnKSwgZWxlbWVudCk7XG4gICAgfVxuICAgIGhhbmRsZUZudEhlaWdodChlbGVtZW50LCBlKSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBbeyBoZWlnaHQ6IGUudGFyZ2V0LnZhbHVlIH1dO1xuICAgICAgICB0aGlzLnZhbGlkYXRvci52YWxpZGF0ZShkYXRhLCB0aGlzLnJ1bGVzKCdoZWlnaHQnKSwgZWxlbWVudCk7XG4gICAgfVxuICAgIGhhbmRsZUZudFdpZHRoKGVsZW1lbnQsIGUpIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IFt7IHdpZHRoOiBlLnRhcmdldC52YWx1ZSB9XTtcbiAgICAgICAgdGhpcy52YWxpZGF0b3IudmFsaWRhdGUoZGF0YSwgdGhpcy5ydWxlcygnd2lkdGgnKSwgZWxlbWVudCk7XG4gICAgfVxuICAgIGhhbmRsZUZudExlbmd0aChlbGVtZW50LCBlKSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBbeyBsZW5ndGg6IGUudGFyZ2V0LnZhbHVlIH1dO1xuICAgICAgICB0aGlzLnZhbGlkYXRvci52YWxpZGF0ZShkYXRhLCB0aGlzLnJ1bGVzKCdsZW5ndGgnKSwgZWxlbWVudCk7XG4gICAgfVxuICAgIHRyaW1EYXRhKGNkYXRhKSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBjZGF0YVswXTtcbiAgICAgICAgY29uc3QgY29udCA9IHtcbiAgICAgICAgICAgIERWRHM6ICdzaXplJyxcbiAgICAgICAgICAgIEZ1cm5pdHVyZTogWydoZWlnaHQnLCAnbGVuZ3RoJywgJ3dpZHRoJ10sXG4gICAgICAgICAgICBCb29rczogJ3dlaWdodCdcbiAgICAgICAgfTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIHJlbW92ZSB0aGUgc2VsZWN0ZWQga2V5IGZyb20gdGVtcCBhcnJheVxuICAgICAgICAgKi9cbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gZGF0YSkge1xuICAgICAgICAgICAgaWYgKGtleSA9PSAncHJvZHVjdFR5cGUnKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBkYXRhW2tleV07XG4gICAgICAgICAgICAgICAgZGVsZXRlIGNvbnRbdmFsdWVdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiByZW1vdmUgYWxsIG90aGVycyBmcm9tIHN1Ym1pdHRlZCBkYXRhXG4gICAgICAgICAqL1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBjb250KSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGNvbnRba2V5XTtcbiAgICAgICAgICAgIGlmICh2YWx1ZS5jb25zdHJ1Y3RvciA9PT0gQXJyYXkpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGRrZXkgaW4gZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtID09IGRrZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgZGF0YVtka2V5XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBkYXRhW3ZhbHVlXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW2RhdGFdO1xuICAgIH1cbiAgICBoYW5kbGVDYW5jZWwoZWxlbWVudCwgZSkge1xuICAgICAgICB0aGlzLmdsb2JhbHMucmVkaXJlY3QoJy8nKTtcbiAgICB9XG4gICAgaGFuZGxlU3VibWl0KGVsZW1lbnQsIGUpIHtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nbG9iYWxzLmRvY3VtZW50LmZvcm1zWzBdO1xuICAgICAgICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSh0YXJnZXQpO1xuICAgICAgICBsZXQgZGF0YSA9IFsuLi5mb3JtRGF0YS5lbnRyaWVzKCldLm1hcChhcnIgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5mcm9tRW50cmllcyhbYXJyXSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnZhbGlkYXRvci52YWxpZGF0ZShkYXRhLCB0aGlzLnJ1bGVzKCkpXG4gICAgICAgICAgICAudGhlbigob2JqKSA9PiB7XG4gICAgICAgICAgICBpZiAob2JqLnZhbGlkYXRpb25QYXNzZWQoKSkge1xuICAgICAgICAgICAgICAgIGRhdGEgPSB0aGlzLnRyaW1EYXRhKEFycmF5Lm9mKE9iamVjdC5mcm9tRW50cmllcyhmb3JtRGF0YS5lbnRyaWVzKCkpKSk7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3Rm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBkYXRhWzBdKSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld0Zvcm1EYXRhLmFwcGVuZChrZXksIGRhdGFbMF1ba2V5XSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7IG1ldGhvZDogJ3Bvc3QnLCBib2R5OiBuZXdGb3JtRGF0YSB9O1xuICAgICAgICAgICAgICAgIHJldHVybiBhamF4XzEuZGVmYXVsdC5wb3N0KCcvYWRkLXByb2R1Y3QnLCBvcHRpb25zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT0gJ3N1Y2Nlc3MnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nbG9iYWxzLnJlZGlyZWN0KCcvJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NvdWxkIG5vdCBjcmVhdGUgcmVjb3JkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcnVsZXMoYXR0cmlidXRlKSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmllbGQ6ICdza3UnLFxuICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdTS1UnLFxuICAgICAgICAgICAgICAgIHJ1bGVzOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgcnVsZTogJ3JlcXVpcmVkJywgcnVsZV92YWx1ZTogdHJ1ZSB9LFxuICAgICAgICAgICAgICAgICAgICB7IHJ1bGU6ICd1bmlxdWUnLCBydWxlX3ZhbHVlOiAncHJvZHVjdCcgfSxcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpZWxkOiAnbmFtZScsXG4gICAgICAgICAgICAgICAgZGlzcGxheTogJ05hbWUnLFxuICAgICAgICAgICAgICAgIHJ1bGVzOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgcnVsZTogJ3JlcXVpcmVkJywgcnVsZV92YWx1ZTogdHJ1ZSB9LFxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmllbGQ6ICdwcmljZScsXG4gICAgICAgICAgICAgICAgZGlzcGxheTogJ1ByaWNlJyxcbiAgICAgICAgICAgICAgICBydWxlczogW1xuICAgICAgICAgICAgICAgICAgICB7IHJ1bGU6ICdyZXF1aXJlZCcsIHJ1bGVfdmFsdWU6IHRydWUgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBydWxlOiAnbnVtZXJpYycsIHJ1bGVfdmFsdWU6IHRydWUgfSxcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpZWxkOiAnd2VpZ2h0JyxcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiAnV2VpZ2h0JyxcbiAgICAgICAgICAgICAgICBydWxlczogW1xuICAgICAgICAgICAgICAgICAgICB7IHJ1bGU6ICdyZXF1aXJlZCcsIHJ1bGVfdmFsdWU6IHRydWUgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBydWxlOiAnbnVtZXJpYycsIHJ1bGVfdmFsdWU6IHRydWUgfSxcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpZWxkOiAnc2l6ZScsXG4gICAgICAgICAgICAgICAgZGlzcGxheTogJ1NpemUnLFxuICAgICAgICAgICAgICAgIHJ1bGVzOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgcnVsZTogJ3JlcXVpcmVkJywgcnVsZV92YWx1ZTogdHJ1ZSB9LFxuICAgICAgICAgICAgICAgICAgICB7IHJ1bGU6ICdudW1lcmljJywgcnVsZV92YWx1ZTogdHJ1ZSB9LFxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmllbGQ6ICdoZWlnaHQnLFxuICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdIZWlnaHQnLFxuICAgICAgICAgICAgICAgIHJ1bGVzOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgcnVsZTogJ3JlcXVpcmVkJywgcnVsZV92YWx1ZTogdHJ1ZSB9LFxuICAgICAgICAgICAgICAgICAgICB7IHJ1bGU6ICdudW1lcmljJywgcnVsZV92YWx1ZTogdHJ1ZSB9LFxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmllbGQ6ICd3aWR0aCcsXG4gICAgICAgICAgICAgICAgZGlzcGxheTogJ1dpZHRoJyxcbiAgICAgICAgICAgICAgICBydWxlczogW1xuICAgICAgICAgICAgICAgICAgICB7IHJ1bGU6ICdyZXF1aXJlZCcsIHJ1bGVfdmFsdWU6IHRydWUgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBydWxlOiAnbnVtZXJpYycsIHJ1bGVfdmFsdWU6IHRydWUgfSxcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpZWxkOiAnbGVuZ3RoJyxcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiAnTGVuZ3RoJyxcbiAgICAgICAgICAgICAgICBydWxlczogW1xuICAgICAgICAgICAgICAgICAgICB7IHJ1bGU6ICdyZXF1aXJlZCcsIHJ1bGVfdmFsdWU6IHRydWUgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBydWxlOiAnbnVtZXJpYycsIHJ1bGVfdmFsdWU6IHRydWUgfSxcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZpZWxkOiAncHJvZHVjdFR5cGUnLFxuICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdUeXBlIFN3aXRjaGVyJyxcbiAgICAgICAgICAgICAgICBydWxlczogW1xuICAgICAgICAgICAgICAgICAgICB7IHJ1bGU6ICdyZXF1aXJlZCcsIHJ1bGVfdmFsdWU6IHRydWUgfSxcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICBdO1xuICAgICAgICBpZiAoYXR0cmlidXRlKVxuICAgICAgICAgICAgcmV0dXJuIGRhdGEuZmlsdGVyKG9iaiA9PiBvYmouZmllbGQgPT0gYXR0cmlidXRlKTtcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gSG9tZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgSG9tZV8xID0gcmVxdWlyZShcIi4vSG9tZVwiKTtcbmV4cG9ydHMuZGVmYXVsdCA9IHsgSG9tZTogSG9tZV8xLmRlZmF1bHQgfTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGZyYW1ld29ya18xID0gcmVxdWlyZShcIi4vZnJhbWV3b3JrL2ZyYW1ld29ya1wiKTtcbm5ldyBmcmFtZXdvcmtfMS5kZWZhdWx0KCkuc3RhcnQoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==