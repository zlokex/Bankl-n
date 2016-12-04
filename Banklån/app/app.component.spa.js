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
var angular2_modal_1 = require('angular2-modal');
var bootstrap_1 = require('angular2-modal/plugins/bootstrap');
require("rxjs/add/operator/map");
var LoanApplication_1 = require("./LoanApplication");
var http_2 = require("@angular/http");
var SPA = (function () {
    function SPA(_http, fb, overlay, vcRef, modal) {
        this._http = _http;
        this.fb = fb;
        this.modal = modal;
        this.valYears = 1;
        this.valAmount = 5000;
        this.terms = false;
        overlay.defaultViewContainer = vcRef;
        this.form = fb.group({
            id: [""],
            terms: [false, forms_1.Validators.pattern('true')],
            repaymentPeriod: ["", forms_1.Validators.pattern("([1-9]|1[0-2])")],
            borrowingLimit: ["", forms_1.Validators.pattern("([5-8][0-9]{3}|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-9]|[1-8][0-9]{4}|9[0-8][0-9]{3}|99[0-8][0-9]{2}|999[0-8][0-9]|9999[0-9]|[1-4][0-9]{5}|500000)")],
            birthNo: ["", forms_1.Validators.pattern("^((0[1-9]|[12]|3[01])([04][1-9]|[15][0-2])[0-9]{7})$")],
            mobileNo: ["", forms_1.Validators.pattern("[0-9]{8}")],
            email: ["", forms_1.Validators.pattern("^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")],
        });
    }
    SPA.prototype.ngOnInit = function () {
        this.loading = true;
        this.showForm = false;
        this.showInfo = false;
        this.showAllLoanApplications = false;
        this.showInitial = true;
        this.getAllLoanApplications();
        this.calculateMonthlyPayment();
    };
    SPA.prototype.openModal = function (t, b) {
        this.modal.alert()
            .size('sm')
            .isBlocking(true)
            .showClose(true)
            .keyboard(27)
            .title(t)
            .okBtn('OK')
            .body(b)
            .open();
    };
    SPA.prototype.disableAllStepForms = function () {
        this.stepFormLoan = false;
        this.stepFormPersonalInfo = false;
        this.stepForm3 = false;
        this.stepForm4 = false;
    };
    SPA.prototype.disableAllStepProgress = function () {
        // STEP PROGRESS:
        this.is1Active = false;
        this.is2Active = false;
        this.is3Active = false;
        this.is4Active = false;
        this.is1Completed = false;
        this.is2Completed = false;
        this.is3Completed = false;
        this.is4Completed = false;
    };
    SPA.prototype.applyNowBtn = function () {
        this.showInitial = false;
        this.showForm = true;
        this.loadStepForm1();
    };
    SPA.prototype.loadStepForm1 = function () {
        // STEP PROGRESS:
        this.disableAllStepProgress();
        this.is1Active = true;
        // STEP FORM:
        this.disableAllStepForms();
        this.stepFormLoan = true;
        this.loading = false;
    };
    SPA.prototype.loadStepForm2 = function () {
        // STEP PROGRESS:
        this.disableAllStepProgress();
        this.is1Completed = true;
        this.is2Active = true;
        // STEP FORM:
        this.disableAllStepForms();
        this.stepFormPersonalInfo = true;
        this.loading = false;
    };
    SPA.prototype.loadStepForm3 = function () {
        // STEP PROGRESS:
        this.disableAllStepProgress();
        this.is1Completed = true;
        this.is2Completed = true;
        this.is3Active = true;
        // STEP FORM:
        this.disableAllStepForms();
        this.stepForm3 = true;
        this.loading = false;
    };
    SPA.prototype.loadStepForm4 = function () {
        // STEP PROGRESS:
        this.disableAllStepProgress();
        this.is1Completed = true;
        this.is2Completed = true;
        this.is3Completed = true;
        this.is4Active = true;
        // STEP FORM:
        this.disableAllStepForms();
        this.stepForm4 = true;
        this.loading = false;
    };
    SPA.prototype.information = function () {
        this.showInitial = false;
        this.showForm = false;
        this.showInfo = true;
    };
    SPA.prototype.loanApplicationsList = function () {
        this.loading = true;
        this.showForm = false;
        this.showInfo = false;
        this.showInitial = false;
        this.getAllLoanApplications();
        this.showAllLoanApplications = true;
    };
    SPA.prototype.onSubmit = function () {
        this.loading = true;
        this.checkIfCustomerExist(this.valBirthNo);
    };
    SPA.prototype.backBtn = function () {
        this.showForm = false;
        this.showInfo = false;
        this.showAllLoanApplications = false;
        this.showInitial = true;
    };
    SPA.prototype.calculateMonthlyPayment = function () {
        var payment = (0.07 * this.valAmount) / (1 - Math.pow((1 + 0.07), -this.valYears));
        var monthly = payment / 12;
        //var rounded = Math.round(monthly * 100) / 100
        this.monthlyPayment = monthly.toFixed(2);
    };
    SPA.prototype.addLoanApplication = function () {
        var _this = this;
        var loanApplication = new LoanApplication_1.LoanApplication();
        loanApplication.RepaymentPeriod = this.form.value.repaymentPeriod;
        loanApplication.BorrowingLimit = this.form.value.borrowingLimit;
        loanApplication.BirthNo = this.form.value.birthNo;
        loanApplication.MobileNo = this.form.value.mobileNo;
        loanApplication.Email = this.form.value.email;
        var body = JSON.stringify(loanApplication);
        var headers = new http_2.Headers({ "Content-Type": "application/json" });
        this._http.post("api/LoanApplication", body, { headers: headers })
            .map(function (returData) { return returData.toString(); })
            .subscribe(function (retur) {
            _this.loadStepForm4();
        }, function (error) { return _this.openModal("Error", error); }, function () { return console.log("ferdig post-api/kunde"); });
    };
    SPA.prototype.getAllLoanApplications = function () {
        var _this = this;
        this._http.get("api/LoanApplication/")
            .map(function (returData) {
            var JsonData = returData.json();
            return JsonData;
        })
            .subscribe(function (JsonData) {
            _this.allLoanApplications = [];
            if (JsonData) {
                for (var _i = 0, JsonData_1 = JsonData; _i < JsonData_1.length; _i++) {
                    var loanApplication = JsonData_1[_i];
                    _this.allLoanApplications.push(loanApplication);
                    _this.loading = false;
                }
            }
            ;
        }, function (error) { return alert(error); }, function () { return console.log("ferdig get-api/kunde"); });
    };
    ;
    SPA.prototype.editCustomer = function () {
        var _this = this;
        this.loadingInModal = true;
        var loanApplication = new LoanApplication_1.LoanApplication();
        loanApplication.RepaymentPeriod = this.form.value.repaymentPeriod;
        loanApplication.BorrowingLimit = this.form.value.borrowingLimit;
        loanApplication.BirthNo = this.form.value.birthNo;
        loanApplication.MobileNo = this.form.value.mobileNo;
        loanApplication.Email = this.form.value.email;
        var body = JSON.stringify(loanApplication);
        var headers = new http_2.Headers({ "Content-Type": "application/json" });
        this._http.put("api/LoanApplication/" + this.form.value.birthNo, body, { headers: headers })
            .map(function (returData) { return returData.toString(); })
            .subscribe(function (retur) {
            _this.loadingInModal = false;
            _this.loadStepForm4();
        }, function (error) { return alert(error); }, function () { return console.log("ferdig endre kunde"); });
        this.loadingInModal = false;
    };
    SPA.prototype.checkIfCustomerExist = function (BirthNo) {
        var _this = this;
        this.loading = true;
        this._http.get("api/LoanApplication/" + BirthNo)
            .map(function (returData) {
            var JsonData = returData.json();
            return JsonData;
        }).subscribe(function (JsonData) {
            if (JsonData == null) {
                _this.addLoanApplication();
            }
            else {
                _this.customerExistsModal.open();
            }
        }, function (error) { return alert(error); }, function () { return console.error("ferdig get"); });
        this.loading = false;
    };
    __decorate([
        core_1.ViewChild('customerExists'), 
        __metadata('design:type', Object)
    ], SPA.prototype, "customerExistsModal", void 0);
    SPA = __decorate([
        core_1.Component({
            selector: "my-app",
            templateUrl: "./app/SPA.html"
        }), 
        __metadata('design:paramtypes', [http_1.Http, forms_1.FormBuilder, angular2_modal_1.Overlay, core_1.ViewContainerRef, bootstrap_1.Modal])
    ], SPA);
    return SPA;
}());
exports.SPA = SPA;
//# sourceMappingURL=app.component.spa.js.map