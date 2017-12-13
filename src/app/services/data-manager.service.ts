import { Injectable } from '@angular/core';
import { Http, Response }from '@angular/Http';
import 'rxjs/Rx';
import { Subject } from "rxjs/Subject";
import { Category, ExCategory } from "../models/category.interface";
import { Article } from "../models/article.interface";

@Injectable()
export class DataManagerService {
  
  data: any[] = [];
  exCategories: ExCategory[] = [];

  doneInitSubject = new Subject();
  
  constructor(private http: Http) { }
  
  initData() {
    this.http.get('./assets/data4.json')
    .map((response: Response) => response.json()).subscribe(data => {
      this.data = data;
      this.buildExCategories();
      this.doneInitSubject.next(true);
    })
  }
  
  buildExCategories() {
    for (let i=0; i<this.data.length; i++) {
      let sourceId = this.data[i].source.id;
      let sourceName = this.data[i].source.name;
      let article = {
        author: this.data[i].author,
        title: this.data[i].title,
        description: this.data[i].description,
        url: this.data[i].url,
        urlToImage: this.data[i].urlToImage,
        publishedAt: this.data[i].publishedAt
      };
      let index = this.exCategories.map((o) => o.sourceId).indexOf(sourceId);
      if (index === -1) {
        this.exCategories.push({ sourceId: this.data[i].source.id, sourceName: this.data[i].source.name, articles: [article] });
      } else {
        this.exCategories[index].articles.push(article)
      }
    }
  }

  getCategories(): Category[] {
    let categories = [];
    categories = this.exCategories.map((o) => {
      return { sourcId: o.sourceId, sourceName: o.sourceName }
    });
    return categories;
  }

  getArticlesByCategoryId(categoryId: string): Article[] {
    let exCategory;
    exCategory = this.exCategories.filter((o) => {
      return o.sourceId === categoryId
    });
    return exCategory[0].articles;
  }

  getArticlesByCategoryIndex(index): Article[] {
    return this.exCategories[index].articles;
  } 

}
