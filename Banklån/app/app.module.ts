import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import {ModalModule as m2} from "ng2-modal";
import { HttpModule, JsonpModule } from '@angular/http';
import { SPA }   from './app.component.spa';
import { SliderModule } from 'primeng/primeng';

@NgModule({
    imports: [
        BrowserModule, 
        SliderModule, 
        FormsModule, 
        ReactiveFormsModule, 
        HttpModule, 
        JsonpModule,
        ModalModule.forRoot(),
        BootstrapModalModule,
        m2
    ],
    declarations: [SPA],
    bootstrap: [SPA]
})
export class AppModule { }
