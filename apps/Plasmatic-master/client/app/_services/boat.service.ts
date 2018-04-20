import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { appConfig } from '../app.config';
import { Boat } from '../_models/index';

@Injectable()
export class BoatService {
    constructor(private http: HttpClient) { }

    getAll() {
        // api refers to Boats.js
        return this.http.get<Boat[]>(appConfig.apiUrl + '/api/boats');
    }

    
    getById(_id: string) {
        return this.http.get(appConfig.apiUrl + '/api/boats/' + _id);
    }
    
    create(boat: Boat) {
        return this.http.post(appConfig.apiUrl + '/api/boats', boat);
    }

    rentBoat(_id: string) {
        return this.http.get(appConfig.apiUrl + '/api/boats/rent/' +_id);
    }

    expireBoat(_id: string) {
        return this.http.get(appConfig.apiUrl + '/api/boats/expire/' +_id);
    }
    
    update(boat: Boat) {
        return this.http.put(appConfig.apiUrl + '/api/boats/' + boat.id, boat);
    }

    delete(_id: string) {
        return this.http.delete(appConfig.apiUrl + '/api/boats/' + _id);
    }
    
}