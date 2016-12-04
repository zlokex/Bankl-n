import { Component, ViewContainerRef, ViewEncapsulation, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Http, Response } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import "rxjs/add/operator/map";
import {LoanApplication} from "./LoanApplication";

import { Headers } from "@angular/http";

@Component({
    selector: "my-app",
    templateUrl: "./app/SPA.html"
})



export class SPA {
    showForm: boolean;
    showInitial: boolean;
    showInfo: boolean;
    showAllLoanApplications: boolean;
    formStatus: string;
    form: FormGroup;
    loading: boolean;  
    loadingInModal: boolean;  
    monthlyPayent: number;
    valYears: number = 1;
    valAmount: number = 5000;
    monthlyPayment: string;
    
    valBirthNo: string;
    valMobileNo: string;
    valEmail: string;
    allLoanApplications: Array<LoanApplication>;

    terms: boolean = false;

    // STEP PROGRESS:
    stepFormLoan: boolean;
    stepFormPersonalInfo: boolean;
    stepForm3: boolean;
    stepForm4: boolean;
    
    is1Active: boolean;
    is2Active: boolean;
    is3Active: boolean;
    is4Active: boolean;

    is1Completed: boolean;
    is2Completed: boolean;
    is3Completed: boolean;
    is4Completed: boolean;
    
    @ViewChild('customerExists') customerExistsModal;

    constructor(private _http: Http, private fb: FormBuilder, overlay: Overlay, vcRef: ViewContainerRef, public modal: Modal) {
        overlay.defaultViewContainer = vcRef;
        this.form = fb.group({
            id:[""],
            terms:[false, Validators.pattern('true')],
            repaymentPeriod: ["", Validators.pattern("([1-9]|1[0-2])")],
            borrowingLimit: ["", Validators.pattern("([5-8][0-9]{3}|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-9]|[1-8][0-9]{4}|9[0-8][0-9]{3}|99[0-8][0-9]{2}|999[0-8][0-9]|9999[0-9]|[1-4][0-9]{5}|500000)")],
            birthNo: ["", Validators.pattern("^((0[1-9]|[12]|3[01])([04][1-9]|[15][0-2])[0-9]{7})$")],
            mobileNo: ["", Validators.pattern("[0-9]{8}")],
            email: ["", Validators.pattern("^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")],
        });
    }

    ngOnInit() {
        this.loading = true;
        this.showForm = false;
        this.showInfo = false;
        this.showAllLoanApplications = false;

        this.showInitial = true;
                

        this.getAllLoanApplications();
        this.calculateMonthlyPayment();
        
    }

    openModal(t, b) {
        this.modal.alert()
        .size('sm')
        .isBlocking(true)
        .showClose(true)
        .keyboard(27)
        .title(t)
        .okBtn('OK')
        .body(b)
        .open();
    }

    disableAllStepForms() {
        this.stepFormLoan = false;
        this.stepFormPersonalInfo = false;
        this.stepForm3 = false;
        this.stepForm4 = false;
    }

    disableAllStepProgress() {
        // STEP PROGRESS:
        this.is1Active = false;
        this.is2Active = false;
        this.is3Active = false;
        this.is4Active = false;

        this.is1Completed = false;
        this.is2Completed = false;
        this.is3Completed = false;
        this.is4Completed = false;
    }

    applyNowBtn() {
        this.showInitial = false;
        this.showForm = true;

        this.loadStepForm1();
    }

    loadStepForm1() {
        // STEP PROGRESS:
        this.disableAllStepProgress();
        this.is1Active = true;
        
        // STEP FORM:
        this.disableAllStepForms();
        this.stepFormLoan = true;
        this.loading = false;
    }

    loadStepForm2() {
        // STEP PROGRESS:
        this.disableAllStepProgress();
        this.is1Completed = true;
        this.is2Active = true;
        
        // STEP FORM:
        this.disableAllStepForms();
        this.stepFormPersonalInfo = true; 
        this.loading = false;
    }

    loadStepForm3() {
        // STEP PROGRESS:
        this.disableAllStepProgress();
        this.is1Completed = true;
        this.is2Completed = true;
        this.is3Active = true;
        
        // STEP FORM:
        this.disableAllStepForms();
        this.stepForm3 = true; 
        this.loading = false;
    }

    loadStepForm4() {
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
    }

    information() {
        this.showInitial = false;
        this.showForm = false;

        this.showInfo = true;
    }

    loanApplicationsList() {
        this.loading = true;
        this.showForm = false;
        this.showInfo = false;
        this.showInitial = false;
        
        this.getAllLoanApplications();
        this.showAllLoanApplications = true;
    }

    onSubmit() {
        this.loading = true;
        this.checkIfCustomerExist(this.valBirthNo);
    }

    backBtn() {
        this.showForm = false;
        this.showInfo = false;
        this.showAllLoanApplications = false;

        this.showInitial = true;
    }
    
    calculateMonthlyPayment() {
        var payment = (0.07 * this.valAmount)/(1-Math.pow((1+0.07),-this.valYears))
        var monthly = payment / 12;
        //var rounded = Math.round(monthly * 100) / 100
        this.monthlyPayment = monthly.toFixed(2);
    }

    addLoanApplication() {
        var loanApplication = new LoanApplication();

        loanApplication.RepaymentPeriod = this.form.value.repaymentPeriod;
        loanApplication.BorrowingLimit = this.form.value.borrowingLimit;
        loanApplication.BirthNo = this.form.value.birthNo;
        loanApplication.MobileNo = this.form.value.mobileNo;
        loanApplication.Email = this.form.value.email;

        var body: string = JSON.stringify(loanApplication);
        var headers = new Headers({ "Content-Type": "application/json" });

        this._http.post("api/LoanApplication", body, { headers: headers })
            .map(returData => returData.toString())
            .subscribe(
                retur=> {
                    this.loadStepForm4();
                },
            error => this.openModal("Error", error),
            () => console.log("ferdig post-api/kunde")
        );
    }

    getAllLoanApplications() {
        this._http.get("api/LoanApplication/")
            .map(returData => {
                let JsonData = returData.json();
                return JsonData;
            })
            .subscribe(
            JsonData => {
                this.allLoanApplications = [];
                if (JsonData) {
                    for (let loanApplication of JsonData) {
                        this.allLoanApplications.push(loanApplication);
                        this.loading = false;
                    }
                };
            },
            error => alert(error),
            () => console.log("ferdig get-api/kunde")
        );
    };

    editCustomer() {
        this.loadingInModal = true;
        var loanApplication = new LoanApplication();

        loanApplication.RepaymentPeriod = this.form.value.repaymentPeriod;
        loanApplication.BorrowingLimit = this.form.value.borrowingLimit;
        loanApplication.BirthNo = this.form.value.birthNo;
        loanApplication.MobileNo = this.form.value.mobileNo;
        loanApplication.Email = this.form.value.email;

        var body: string = JSON.stringify(loanApplication);
        var headers = new Headers({ "Content-Type": "application/json" });

        this._http.put("api/LoanApplication/" + this.form.value.birthNo, body, { headers: headers })
            .map(returData => returData.toString())
            .subscribe(
            retur => {
                this.loadingInModal = false;
                this.loadStepForm4();
            },
            error => alert(error),
            () => console.log("ferdig endre kunde")
        );
        this.loadingInModal = false;
    }

    checkIfCustomerExist(BirthNo: string) {
        this.loading = true;
        this._http.get("api/LoanApplication/"+BirthNo)
            .map(returData => {
                let JsonData = returData.json();
                return JsonData;
            }).subscribe(
            JsonData => {
                if (JsonData == null) {
                    this.addLoanApplication();
                } else {
                    this.customerExistsModal.open();
                }
            },
            error => alert(error),
            () => console.error("ferdig get")
        );
        this.loading = false;
    }
}