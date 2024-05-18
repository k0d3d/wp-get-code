var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
System.register("getCodeApp", [], function (exports_1, context_1) {
    "use strict";
    var getCodeApp;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            if (process.env.NODE_ENV === "test") {
                window['GetCodeAppVars'] = {
                    "nonce": "644744b619",
                    "user_id": "0",
                    "ajax_url": "https://localhost:8898/wp-admin/admin-ajax.php",
                    "post_id": "417",
                    "destination": "E8otxw1CVX9bfyddKu3ZB3BVLa4VVF9J7CTPdnUwT9jR",
                    "default_amount": "0.4"
                };
            }
            exports_1("getCodeApp", getCodeApp = window['GetCodeAppVars']);
        }
    };
});
System.register("common/fetch", ["getCodeApp"], function (exports_2, context_2) {
    "use strict";
    var getCodeApp_1, handlePurchase, invokeIntent;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [
            function (getCodeApp_1_1) {
                getCodeApp_1 = getCodeApp_1_1;
            }
        ],
        execute: function () {
            exports_2("handlePurchase", handlePurchase = function (intent) { return __awaiter(void 0, void 0, void 0, function () {
                var data, response, responseData, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            data = {
                                action: 'get_code_complete_purchase',
                                nonce: getCodeApp_1.getCodeApp.nonce,
                                tx_intent: intent || 'purchase',
                            };
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 4, , 5]);
                            return [4 /*yield*/, fetch(getCodeApp_1.getCodeApp.ajax_url, {
                                    method: 'POST',
                                    // @ts-ignore
                                    body: new URLSearchParams(data),
                                    headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded',
                                    },
                                })];
                        case 2:
                            response = _a.sent();
                            return [4 /*yield*/, response.text()];
                        case 3:
                            responseData = _a.sent();
                            if (response.ok && responseData) {
                                return [2 /*return*/, responseData];
                            }
                            else {
                                return [2 /*return*/, ""];
                            }
                            return [3 /*break*/, 5];
                        case 4:
                            error_1 = _a.sent();
                            return [2 /*return*/, "AJAX error: ".concat(error_1)];
                        case 5: return [2 /*return*/];
                    }
                });
            }); });
            exports_2("invokeIntent", invokeIntent = function (_a) {
                var amount = _a.amount, currency = _a.currency, destination = _a.destination;
                return __awaiter(void 0, void 0, void 0, function () {
                    var data, response, responseData, error_2;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                data = {
                                    action: 'get_code_save_purchase',
                                    nonce: getCodeApp_1.getCodeApp.nonce,
                                    user_id: getCodeApp_1.getCodeApp.user_id,
                                    post_url: location.pathname,
                                    post_id: getCodeApp_1.getCodeApp.post_id,
                                    amount: amount,
                                    currency: currency,
                                    destination: destination,
                                };
                                _b.label = 1;
                            case 1:
                                _b.trys.push([1, 4, , 5]);
                                return [4 /*yield*/, fetch(getCodeApp_1.getCodeApp.ajax_url, {
                                        method: 'POST',
                                        // @ts-ignore
                                        body: new URLSearchParams(data),
                                        headers: {
                                            'Content-Type': 'application/x-www-form-urlencoded',
                                        },
                                    })];
                            case 2:
                                response = _b.sent();
                                return [4 /*yield*/, response.json()];
                            case 3:
                                responseData = _b.sent();
                                return [2 /*return*/, responseData.data];
                            case 4:
                                error_2 = _b.sent();
                                return [2 /*return*/, "AJAX error: ".concat(error_2)];
                            case 5: return [2 /*return*/];
                        }
                    });
                });
            });
        }
    };
});
/* eslint-disable @typescript-eslint/ban-ts-comment */
System.register("common/utils", [], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    function adjustHeight(contentHtml) {
        var getCodeDiv = document.querySelector('.get_code-box');
        var contentDiv = document.querySelector('.content');
        var contentTitleDiv = document.querySelector('.content > .entry-title');
        if (!getCodeDiv || !contentDiv)
            return;
        getCodeDiv.classList.add('slide-down-fade-out');
        // Listen for the transitionend event
        getCodeDiv.addEventListener('transitionend', function () {
            if (contentDiv.classList.contains('injected-post'))
                return true;
            if (!contentTitleDiv)
                return;
            var nextSibling = contentTitleDiv.nextElementSibling;
            while (nextSibling) {
                // @ts-ignore
                contentTitleDiv.parentNode.removeChild(nextSibling);
                nextSibling = contentTitleDiv.nextElementSibling;
            }
            contentTitleDiv && contentTitleDiv.insertAdjacentHTML("afterend", contentHtml);
            contentDiv.classList.add('injected-post');
            // getCodeDiv.style.display = "none";
        });
    }
    exports_3("adjustHeight", adjustHeight);
    /**
     * Scrolls element into view.
     */
    function scrollToElement(element) {
        if (element) {
            element.scrollIntoView({
                behavior: "smooth",
            });
        }
    }
    exports_3("scrollToElement", scrollToElement);
    /**
     * Checks if the returned status code is not an error code.
     */
    function isSuccessCode(statusCode) {
        if (!isNaN(statusCode)) {
            return statusCode < 400 && statusCode > 199;
        }
    }
    exports_3("isSuccessCode", isSuccessCode);
    return {
        setters: [],
        execute: function () {/* eslint-disable @typescript-eslint/ban-ts-comment */
        }
    };
});
System.register("common/woo-service", ["common/utils"], function (exports_4, context_4) {
    "use strict";
    var utils_1, $, WooCommerce;
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [
            function (utils_1_1) {
                utils_1 = utils_1_1;
            }
        ],
        execute: function () {
            $ = window.jQuery;
            WooCommerce = /** @class */ (function () {
                function WooCommerce() {
                    this.transactionIsDone = false;
                }
                /**
                 * Validates the WooCommerce form
                 */
                WooCommerce.prototype.validateWCCheckoutForm = function () {
                    var inputs = this.getJQueryFormInputs();
                    //@ts-ignore
                    if (inputs)
                        inputs.trigger("validate");
                    else
                        return true;
                    var invalidInput = this.getFirstInvalidInput();
                    if (!invalidInput)
                        return true;
                    else {
                        utils_1.scrollToElement(invalidInput);
                        return false;
                        // throw new Error(__("Please complete the form"));
                    }
                };
                /**
                 * Updates the transaction status.
                 */
                WooCommerce.prototype.updateTransactionStatus = function (isDone) {
                    this.transactionIsDone = isDone;
                };
                /**
                 * Gets the WooCommerce form inputs selected using JQuery to allow for applying
                 * JQuery operatons on it.
                 */
                WooCommerce.prototype.getJQueryFormInputs = function () {
                    var inputs = $("form.woocommerce-checkout input");
                    if (inputs && inputs.length) {
                        return inputs;
                    }
                };
                /**
                 * Gets the first invalid field in the WooCommerce form.
                 */
                WooCommerce.prototype.getFirstInvalidInput = function () {
                    var invalids = $("form.woocommerce-checkout .woocommerce-invalid");
                    if (invalids)
                        return invalids[0];
                };
                /**
                 * Subscibes to JQuery AJAX complete event, and excutes the passed callback on
                 * each AJAX complete.
                 * @param callback A function to be called after the AJAX is completed
                 */
                WooCommerce.prototype.handleAJAXComplete = function (callback) {
                    $(document).ajaxComplete(function (_event, xhr, settings) {
                        var _a;
                        var requestURL = settings.url;
                        var isFailed = ((_a = xhr.responseJSON) === null || _a === void 0 ? void 0 : _a.result) === "failure";
                        callback(requestURL, xhr.status, isFailed);
                    });
                };
                /**
                 * Handles after an WC checkout AJAX request is complete.
                 * @param statusCode Response status code
                 * @param isFailed Whether checkout failed or not as success code does not mean
                 * the checkout succeeds.
                 */
                WooCommerce.prototype.handleCheckoutAJAXComplete = function (statusCode, isFailed) {
                    if (isFailed || !utils_1.isSuccessCode(statusCode)) {
                        this.togglePlaceOrderButton(true);
                    }
                };
                /**
                 * Disables checkout form inputs.
                 */
                WooCommerce.prototype.disableCheckoutFormInputs = function () {
                    this.toggleCheckoutInputsDisableState(true);
                };
                /**
                 * Enables checkout form inputs.
                 */
                WooCommerce.prototype.enableCheckoutFormInputs = function () {
                    this.toggleCheckoutInputsDisableState(false);
                };
                /**
                 * Toggles checkout form inputs disable state on/off.
                 * @param disabled Whether to disable the inputs or not
                 */
                WooCommerce.prototype.toggleCheckoutInputsDisableState = function (disabled) {
                    var inputs = this.getJQueryFormInputs();
                    if (inputs) {
                        for (var _i = 0, inputs_1 = inputs; _i < inputs_1.length; _i++) {
                            var input = inputs_1[_i];
                            //@ts-ignore
                            input.disabled = disabled;
                        }
                    }
                };
                /**
                 * Shows/hides the WooCommerce original place order button.
                 * @param {boolean} show Whether to show or hide.
                 */
                WooCommerce.prototype.togglePlaceOrderButton = function (show) {
                    var button = this.getPlaceOrderButton();
                    if (button) {
                        button.setAttribute("aria-hidden", (!show).toString());
                    }
                };
                /**
                 * Gets the original place order button of WooCommerce
                 */
                WooCommerce.prototype.getPlaceOrderButton = function () {
                    return document.getElementById("place_order");
                };
                /**
                 * Prevent WC form submit before the payment is done.
                 */
                WooCommerce.prototype.preventCheckoutFormSubmit = function () {
                    var formInputs = this.getJQueryFormInputs();
                    if (formInputs) {
                        for (var _i = 0, formInputs_1 = formInputs; _i < formInputs_1.length; _i++) {
                            var input = formInputs_1[_i];
                            //@ts-ignore
                            input.addEventListener("keydown", this.preventSubmitOnEnter);
                        }
                    }
                };
                /**
                 * Allow WC form submit as the default behavior.
                 */
                WooCommerce.prototype.allowCheckoutFormSubmit = function () {
                    var formInputs = this.getJQueryFormInputs();
                    if (formInputs) {
                        for (var _i = 0, formInputs_2 = formInputs; _i < formInputs_2.length; _i++) {
                            var input = formInputs_2[_i];
                            //@ts-ignore
                            input.removeEventListener("keydown", this.preventSubmitOnEnter);
                        }
                    }
                };
                /**
                 * Prevent the WC input from triggering the submit on pressing 'Enter' on keyboard
                 * if the transaction is not done.
                 */
                WooCommerce.prototype.preventSubmitOnEnter = function (e) {
                    if ((e.key === "Enter" || e.keyCode === 13) && !this.transactionIsDone) {
                        e.stopImmediatePropagation();
                        e.preventDefault();
                    }
                };
                /**
                 * Toggles other payment methods disable state on/off.
                 * @param disabled Whether to disable other methods or not.
                 */
                WooCommerce.prototype.toggleOtherPaymentMethodsDisableState = function (disabled) {
                    var inputs = this.getPaymentMethodsInputs();
                    if (inputs) {
                        for (var _i = 0, _a = Array.from(inputs); _i < _a.length; _i++) {
                            var input = _a[_i];
                            input.disabled = disabled;
                        }
                    }
                };
                /**
                 * Disable payment methods other than Solpress
                 */
                WooCommerce.prototype.disableOtherPaymentMethods = function () {
                    this.toggleOtherPaymentMethodsDisableState(true);
                };
                /**
                 * Enables payment methods other than Solpress
                 */
                WooCommerce.prototype.enableOtherPaymentMethods = function () {
                    this.toggleOtherPaymentMethodsDisableState(false);
                };
                /**
                 * Triggers the WooCommerce order by clicking the WooCommerce place order button.
                 */
                WooCommerce.prototype.triggerWCOrder = function () {
                    var placeOrderButton = this.getWooCommercePlaceOrderButton();
                    if (placeOrderButton) {
                        setTimeout(function () {
                            placeOrderButton.click();
                        }, 1000);
                    }
                };
                /**
                 * Checks whether the AJAX completed is a checkout request.
                 */
                WooCommerce.prototype.isCheckoutAction = function (requestURL) {
                    return requestURL && requestURL.indexOf("wc-ajax=checkout") >= 0;
                };
                /**
                 * Gets the original place order button of WooCommerce
                 */
                WooCommerce.prototype.getWooCommercePlaceOrderButton = function () {
                    return document.getElementById("place_order");
                };
                /**
                 * Gets payment methods radio input
                 */
                WooCommerce.prototype.getPaymentMethodsInputs = function () {
                    return document.querySelectorAll(".payment_methods input[name='payment_method'][type='radio']");
                };
                return WooCommerce;
            }());
            exports_4("default", WooCommerce);
        }
    };
});
System.register("app", ["common/fetch", "common/woo-service"], function (exports_5, context_5) {
    "use strict";
    var fetch_1, woo_service_1, woo, isDone;
    var __moduleName = context_5 && context_5.id;
    function beforeCheckout(tx_intent) {
        var checkoutForm = document.querySelector('form.checkout');
        if (checkoutForm) {
            // Check if the checkout form exists
            var hiddenIntentInput = document.createElement('input');
            hiddenIntentInput.type = 'hidden';
            hiddenIntentInput.name = 'tx_intent';
            hiddenIntentInput.value = tx_intent || 'your_default_value';
            var hiddenNonceInput = document.createElement('input');
            hiddenNonceInput.type = 'hidden';
            hiddenNonceInput.name = 'code_checkout_nonce';
            hiddenNonceInput.value = window['GetCodeAppVars'].nonce || 'your_default_value';
            checkoutForm.appendChild(hiddenNonceInput);
            checkoutForm.appendChild(hiddenIntentInput);
        }
    }
    function main() {
        return __awaiter(this, void 0, void 0, function () {
            var button;
            var _this = this;
            return __generator(this, function (_a) {
                button = code.elements.create('button', {
                    currency: 'usd',
                    destination: window['GetCodeAppVars'].destination,
                    amount: parseFloat(window['GetCodeAppVars'].cart_total || 0),
                }).button;
                if (!button)
                    return [2 /*return*/];
                button.on('cancel', function (e) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, fetch_1.handlePurchase(e.intent)];
                            case 1:
                                _a.sent();
                                return [2 /*return*/, true];
                        }
                    });
                }); });
                button.on('success', function (e) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        beforeCheckout(e.intent);
                        isDone();
                        return [2 /*return*/, true];
                    });
                }); });
                button.on('invoke', function () { return __awaiter(_this, void 0, void 0, function () {
                    var response, clientSecret;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                woo.disableOtherPaymentMethods();
                                woo.disableCheckoutFormInputs();
                                return [4 /*yield*/, fetch_1.invokeIntent({
                                        currency: 'usd',
                                        destination: window['GetCodeAppVars'].destination,
                                        amount: parseFloat(window['GetCodeAppVars'].cart_total || 0), // @todo: move to serverside
                                    })];
                            case 1:
                                response = _a.sent();
                                clientSecret = response.clientSecret;
                                button.update({
                                    clientSecret: clientSecret
                                });
                                return [2 /*return*/];
                        }
                    });
                }); });
                button.mount('#button-container');
                return [2 /*return*/];
            });
        });
    }
    return {
        setters: [
            function (fetch_1_1) {
                fetch_1 = fetch_1_1;
            },
            function (woo_service_1_1) {
                woo_service_1 = woo_service_1_1;
            }
        ],
        execute: function () {
            woo = new woo_service_1.default();
            isDone = function () {
                woo.enableOtherPaymentMethods();
                woo.enableCheckoutFormInputs();
                woo.triggerWCOrder();
            };
        }
    };
});
