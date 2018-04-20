import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, BoatService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'addboat.component.html'
})

export class AddBoatComponent {
    model: any = {};
    loading = false;

    constructor(
        private router: Router,
        private boatService: BoatService,
        private alertService: AlertService) { }

    addBoat() {
        this.loading = true;
        this.boatService.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/home']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}