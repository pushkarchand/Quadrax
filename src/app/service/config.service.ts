import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';


@Injectable()
export class ConfigService {
    // tslint:disable-next-line:no-inferrable-types
    static currentDomain: string = '';
    constructor(private httpCleient: HttpClient) { }

    public getSubDomains(): Observable<any> {
        return this.httpCleient.get('../../assets/configs/subdomain.config.json');
    }// public getSubDomains(): Observable<any>

    public setCurrentSunDomain(argDomainName: string): void {
        ConfigService.currentDomain = argDomainName;
        console.log(ConfigService.currentDomain);
    }// public setCurrentSunDomain(argDomainName: string): void

    public getCurrentSubDomain(): string {
        return ConfigService.currentDomain;
    }// public getCurrentSubDomain(): string
}
