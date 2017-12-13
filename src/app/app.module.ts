import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/Http";
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DataManagerService } from "./services/data-manager.service";
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ShortenPipe } from "./pipes/shorten.pipe";
import { FilterPipe } from "./pipes/filter.pipe";


@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    ShortenPipe,
    FilterPipe,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
  ],
  providers: [DataManagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
