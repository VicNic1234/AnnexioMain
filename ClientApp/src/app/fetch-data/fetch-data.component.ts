import { Component, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public countrydetails: Country[] = [];
  public countrydetailsC: Country[] = [];

  public ctype: string | undefined;
  public cval: string | undefined;
  
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private _Activatedroute: ActivatedRoute,
    private _router: Router  ) {
  
    this._Activatedroute.paramMap.subscribe(params => {
      //this.pcode = params.get('code')?.toString();
      //console.log(params);

      if (params.get('ctype')?.toString() == "code")
      { //baseUrl + 'countrylist'
       // http.get<Country[]>('https://restcountries.com/v2/alpha/' + params.get('cval')?.toString()).subscribe(result => {
        http.get<Country[]>(baseUrl + 'countrylist/countrybycode/' + '/' + params.get('cval')?.toString()  ).subscribe(result => {
          this.countrydetailsC = result;
          this.countrydetails = this.countrydetailsC;
          
        }, error => console.error(error));
      }

      if (params.get('ctype')?.toString() == "name") {
        //http.get<Country[]>('https://restcountries.com/v2/name/' + params.get('cval')?.toString()).subscribe(result => {
        http.get<Country[]>(baseUrl + 'countrylist/countrybyname/' + params.get('cval')?.toString()).subscribe(result => {
          this.countrydetails = result;
        }, error => console.error(error));
      }

      
      //else {
      //  _router.navigate(['/view-countries']);
      //}
    });

  
  }

  //https://restcountries.com/v2/name/{name}
}

interface currency {
  code: string;
  name: string;
  symbol: string;
}

interface language {
  iso639_1: string;
  iso639_2: string;
  sqi: string;
  name: string;
  nativeName: string;
}


interface border {
  br: string;
}

interface Country {
  name: string;
  capital: string;
  population: number;
  currencies: currency[];
  languages: language[];
  borders: string;
}
