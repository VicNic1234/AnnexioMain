import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ServerModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';

@NgModule({
  imports: [AppModule, ServerModule, ModuleMapLoaderModule, RouterModule],
    bootstrap: [AppComponent]
})
export class AppServerModule { }
