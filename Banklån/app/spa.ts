import {Component, OnInit} from "@angular/core";
import { Http, Response } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import "rxjs/add/operator/map";
import {LoanApplication} from "./LoanApplication";
import {Headers} from "@angular/http";
import * as _ from 'ng2-slider-component';

@Component({
    selector: "my-app",
    templateUrl: "./app/SPA.html"
})

export class SPA {
    showForm: boolean;
    showInitial: boolean;
    showInfo: boolean;
    formStatus: string;
    form: FormGroup;
    loading: boolean;    
    monthlyPayent: number;


    constructor(private _http: Http, private fb: FormBuilder) {
        this.form = fb.group({
            id:[""],
            repaymentPeriod: ["", Validators.pattern("([1-9]|1[0-2])")],
            borrowingLimit: ["", Validators.pattern("([5-8][0-9]{3}|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-9]|[1-8][0-9]{4}|9[0-8][0-9]{3}|99[0-8][0-9]{2}|999[0-8][0-9]|9999[0-9]|[1-4][0-9]{5}|500000)")],
            birthNo: ["", Validators.pattern("^((0[1-9]|[12]|3[01])([04][1-9]|[15][0-2])[0-9]{7})$")],
            mobileNo: ["", Validators.pattern("[0-9]{8}")],
            email: ["", Validators.pattern("^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")],
        });
    }

    ngOnInit() {
        this.loading = true;
        this.showForm = true;
        this.showInitial = false;
        this.showInfo = true;
    }

    applyNowBtn() {
        this.showInitial = false;
        this.showForm = true;
    }

    moreInfoBtn() {
            this.showInitial = false;
            this.showInfo = true;
    }
    
    calculateMonthlyPayment(years: number, amount: number) {
        let payment = (0.07 * amount)/(1-Math.pow((1+0.07),years))
        return payment;
    }

}