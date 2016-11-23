"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require('@angular/http');
var forms_1 = require('@angular/forms');
require("rxjs/add/operator/map");
var SPA = (function () {
    function SPA(_http, fb) {
        this._http = _http;
        this.fb = fb;
        this.form = fb.group({
            id: [""],
            repaymentPeriod: ["", forms_1.Validators.pattern("([1-9]|1[0-2])")],
            borrowingLimit: ["", forms_1.Validators.pattern("([5-8][0-9]{3}|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-9]|[1-8][0-9]{4}|9[0-8][0-9]{3}|99[0-8][0-9]{2}|999[0-8][0-9]|9999[0-9]|[1-4][0-9]{5}|500000)")],
            birthNo: ["", forms_1.Validators.pattern("^((0[1-9]|[12]|3[01])([04][1-9]|[15][0-2])[0-9]{7})$")],
            mobileNo: ["", forms_1.Validators.pattern("[0-9]{8}")],
            email: ["", forms_1.Validators.pattern("^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")],
        });
    }
    SPA.prototype.ngOnInit = function () {
        this.loading = true;
        this.showForm = true;
        this.showInitial = false;
        this.showInfo = true;
    };
    SPA.prototype.applyNowBtn = function () {
        this.showInitial = false;
        this.showForm = true;
    };
    SPA.prototype.moreInfoBtn = function () {
        this.showInitial = false;
        this.showInfo = true;
    };
    SPA.prototype.calculateMonthlyPayment = function (years, amount) {
        var payment = (0.07 * amount) / (1 - Math.pow((1 + 0.07), years));
        return payment;
    };
    SPA = __decorate([
        core_1.Component({
            selector: "my-app",
            templateUrl: "./app/SPA.html"
        }), 
        __metadata('design:paramtypes', [http_1.Http, forms_1.FormBuilder])
    ], SPA);
    return SPA;
}());
exports.SPA = SPA;
//# sourceMappingURL=spa.js.map