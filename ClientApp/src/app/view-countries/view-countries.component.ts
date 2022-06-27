import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServiceApiService } from 'src/app/services/service-api.service';

@Component({
  selector: 'app-view-countries',
  templateUrl: './view-countries.component.html'
})
export class CountryListComponent {
  public countries: CountryList[] = [];
  public allCountries: CountryList[] = [];

  //////////////////////////
  currentIndex = -1;
  name = '';
  page = 1;
  count = 0;
  pageSize = 10;
  pageSizes = [10, 20, 50, 100, 400];
  //////////////////////////

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private rCountryService: ServiceApiService) {
    http.get<CountryList[]>(baseUrl + 'countrylist').subscribe(result => {
      this.countries = result;
      this.allCountries = this.countries;
    }, error => console.error(error));
  }




  /////////////////////////
  getRequestParams(searchTitle: string, page: number, pageSize: number): any {
    let params: any = {};
    if (searchTitle) {
      params[`name`] = searchTitle;
    }
    if (page) {
      params[`page`] = page - 1;
    }
    if (pageSize) {
      params[`size`] = pageSize;
    }
    return params;
  }
  ////////////////////////

  //////////////////
  retrieveCountries(): void {
    const params = this.getRequestParams(this.name, this.page, this.pageSize);
    this.rCountryService.getAll(params)
      .subscribe(
        response => {
          const { countries, totalItems } = response;
          this.countries = countries;
          this.allCountries = countries;
          this.count = totalItems;
          
          //console.log(response);
        },
        error => {
          console.log(error);
        });
  }
  //////////////////

  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveCountries();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveCountries();
  }

  searchTitle(): void {
    this.page = 1;
    //this.retrieveCountries();
    if (this.name != "") {
      this.countries = this.allCountries.filter(((cn: { name: string }) => cn.name.toLowerCase().includes(this.name.toLowerCase()))
        && ((rg: { region: string }) => rg.region.toLowerCase().includes(this.name.toLowerCase()))
        && ((subrg: { subregion: string }) => subrg.subregion.toLowerCase().includes(this.name.toLowerCase()))
      );
    }
    else {
      //this.retrieveCountries();
      this.countries = this.allCountries;
     // console.log(this.allCountries)
    }
              
  }

  search(value: string): void {
    if (value != "") {
      this.countries = this.allCountries.filter(((cn: {name:string}) => cn.name.toLowerCase().includes(value.toLowerCase()))
        && ((rg: { region: string }) => rg.region.toLowerCase().includes(value.toLowerCase()))
        && ((subrg: { subregion: string }) => subrg.subregion.toLowerCase().includes(value.toLowerCase()))
      );
    }
    else {
      this.countries = this.allCountries;
    }
  }


}

interface CountryList {
  name: string;
  region: string;
  subregion: string;
}
