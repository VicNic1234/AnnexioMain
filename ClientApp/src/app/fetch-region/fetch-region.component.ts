import { Component, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fetch-region',
  templateUrl: './fetch-region.component.html'
})
export class FetchRegionComponent {
  
  public regiondetails: regionDetails[] = [];
  public TotalPopulation: number = 0;
  
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private _Activatedroute: ActivatedRoute,
    private _router: Router  ) {
  
    this._Activatedroute.paramMap.subscribe(params => {
      //this.pcode = params.get('code')?.toString();
      //console.log(params);

      if (params.get('region')?.toString() != null)
      {
        http.get<regionDetails[]>(baseUrl + 'countrylist/getregion/' + params.get('region')?.toString()  ).subscribe(result => {
          this.regiondetails = result;
          //this.regiondetails[0].populations =
          //this.regiondetails = params.get('region')?.toString();
       // const sum = this.regiondetails.reduce((sum, current) => sum + current.countries.population, 0);
        }, error => console.error(error));
      }

     

    });

  
  }

  //https://restcountries.com/v2/name/{name}
}

interface regionDetails {
  region: string;
  countries: Country[];
  populations: number;
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
