import { Component, OnInit } from '@angular/core';
import { Boat } from '../_models/index';
import { User } from '../_models/index';
import { BoatService } from '../_services/index';
import { UserService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    currentUser: User;
    boatService: BoatService;
    //adminVisible: true;
    users: User[] = [];
    boats: Boat[] = [];
    adminVisibleList = false;


    constructor(private userService: UserService, boatService: BoatService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        //this.boats = this.boatService.getAll()
        this.boatService = boatService;
        this.loadAllBoats();
        this.authorizeBoat();
        console.log(this.currentUser.email)

    }

    ngOnInit() {
        this.loadAllUsers();
    }

    authorizeBoat() {
        if(this.currentUser.role == "member" )
        {
            this.adminVisibleList = true;
        }
    }

    rentBoat(_id: string) {
        this.boatService.rentBoat(_id).subscribe(() => {this.rentBoat(_id) });
        this.loadAllBoats();
    }

    expireBoat(_id: string) {
        this.loadAllBoats();
        this.boatService.expireBoat(_id).subscribe(()=> {this.expireBoat(_id)});
        
    }

    deleteUser(_id: string) {
        this.userService.delete(_id).subscribe(() => { this.loadAllUsers() });
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }

    private loadAllBoats() {
        
        this.boatService.getAll()
            .subscribe(
                data => {
                    this.boats = data;
                    console.log(data);
                },
                error => {
                    alert(error);
                }
            )

    }
}