import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { FetchRegionComponent } from './fetch-region/fetch-region.component';
import { FetchSubRegionComponent } from './fetch-subregion/fetch-subregion.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { CountryListComponent } from './view-countries/view-countries.component';

import { ServiceApiService } from 'src/app/services/service-api.service';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    FetchDataComponent,
    FetchRegionComponent,
    FetchSubRegionComponent,
    CountryListComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    
   
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'fetch-data/:ctype/:cval', component: FetchDataComponent },
      { path: 'view-countries', component: CountryListComponent },
      { path: 'view-region/:region', component: FetchRegionComponent },
      { path: 'view-subregion/:subregion', component: FetchSubRegionComponent },
      //{ path: 'product/:id', component: ProductDetailComponent }
    ]),

    FormsModule,
    NgxPaginationModule
  ],
  providers: [ServiceApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
