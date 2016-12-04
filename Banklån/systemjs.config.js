﻿/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {

    System.config({
        paths: {
            // paths serve as alias
            'npm:': 'node_modules/'
        },
        // map tells the System loader where to look for things
        map: {
            // our app is within the app folder
            app: 'app',
            // angular bundles
            '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
            '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
            '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
            '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
            '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
            '@angular/router/upgrade': 'npm:@angular/router/bundles/router-upgrade.umd.js',
            '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
            '@angular/upgrade': 'npm:@angular/upgrade/bundles/upgrade.umd.js',
            '@angular/upgrade/static': 'npm:@angular/upgrade/bundles/upgrade-static.umd.js',
            // other libraries
            'rxjs': 'npm:rxjs',
            'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js',
            'primeng': 'npm:primeng',
            'angular2-modal': 'npm:angular2-modal',
            'angular2-modal/plugins/bootstrap': 'npm:angular2-modal/bundles',
            "ng2-modal": "node_modules/ng2-modal"
        },
        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
            app: {
                main: './main.js',
                defaultExtension: 'js'
            },
            rxjs: {
                defaultExtension: 'js'
            },
            primeng: {
                defaultExtension: 'js'
            },
            'angular2-modal': { defaultExtension: 'js', main: 'bundles/angular2-modal.umd.js' },
            'angular2-modal/plugins/bootstrap': { defaultExtension: 'js', main: 'angular2-modal.bootstrap.umd.js' },
            "ng2-modal": { "main": "index.js", "defaultExtension": "js" }
        }

    });

    // Uncomment to use Individual files/modules
    // map[`angular2-modal/plugins/${plugin}`] = map['angular2-modal'] + `/plugins/${plugin}`;
    // packages['angular2-modal'] = { defaultExtension: 'js', main: 'index' };
    // packages[`angular2-modal/plugins/${plugin}`] =  { defaultExtension: 'js', main: `index` };  
})(this);
