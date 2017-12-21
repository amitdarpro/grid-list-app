import { Component, OnInit, OnDestroy, OnChanges, DoCheck } from '@angular/core';
import { DataManagerService } from "./services/data-manager.service";
import { Subscription } from "rxjs/Subscription";
import { Article } from "./models/article.interface";
import { setTimeout } from 'timers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy, OnChanges, DoCheck{
  
  private today: any = new Date()
  isLoaded: boolean = true;
  loadingStatus = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('stable');
    },3000);
  });

  doneInitSubscription: Subscription;
  articles: Article[] = [];
  activeCategoryIndex = 0;
  currentView: string = "list";
  
  filterValue: string = '';
  filterTypeOptions: string[] = ['title', 'description'];
  filterType: string = this.filterTypeOptions[0];
  

  constructor(private dataManagerService: DataManagerService) {}

  ngOnInit() {
    this.dataManagerService.initData();

    this.doneInitSubscription = this.dataManagerService.doneInitSubject.subscribe(
      (flag: boolean) => {
        // console.log("in app-root: FLAG="+flag);
        if (flag) {
          this.isLoaded = true;
          this.reloadArticles();
        }
        else {
          this.isLoaded = false;
        }
      }
    );    
  }

  ngOnChanges() {
    // console.log("ngOnChanges():filterType="+this.filterType);
  }

  ngDoCheck() {
    // console.log("ngDoCheck():filterType="+this.filterType);
  }

  changeView(view) {
    this.currentView = view;
  }

  onCategoryChanged(index: number) {
    this.activeCategoryIndex = index;
    this.reloadArticles();
  }

  reloadArticles() {
    this.articles = this.dataManagerService.getArticlesByCategoryIndex(this.activeCategoryIndex);
  }

  getImgDisplayStatus(url: any): string {
    let display = (url == null)? 'none':'block';
    return display;
  }

  ngOnDestroy() {
    this.doneInitSubscription.unsubscribe();
  }
}
