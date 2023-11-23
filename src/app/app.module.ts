import { Injectable, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersonsComponent } from './pages/persons/persons.component';
import { PersonComponent } from './pages/person/person.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { testInterceptor } from './services/Test.interceptor';

export class Test{
  myMethod(){}
}

@NgModule({
  declarations: [
    AppComponent,
    PersonsComponent,
    PersonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LeafletModule,
  ],
  providers: [
    { provide: 'test', useValue: 42  },
    { provide: 'test2', useFactory: () => ({ val: localStorage.getItem('test2') }), multi: true },
    { provide: 'test2', useValue: {val: 2}, multi: true },
    { provide: 'test2', useClass: Test, multi: true },
    //{ provide: Test, useClass: Test }
    Test,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


