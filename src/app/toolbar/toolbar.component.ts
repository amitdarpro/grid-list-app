import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from "rxjs/Subscription";
import { DataManagerService } from "../services/data-manager.service";
import { Category } from "../models/category.interface";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit, OnDestroy {
  
  doneInitSubscription: Subscription;
  categories: Category[] = [];
  mobileSelectionIndex: number = 0;
  @Output() activeCategoryChanged: EventEmitter<any> = new EventEmitter();

  constructor(private dataManagerService: DataManagerService) {}

  ngOnInit() {
    this.doneInitSubscription = this.dataManagerService.doneInitSubject.subscribe(
      (flag: boolean) => {
        if (flag) {
          this.categories = this.dataManagerService.getCategories();
        }
      }
    );
  }

  onSelectChange(ev: Event) {
    let index = (<HTMLSelectElement>ev.target).value;
    this.activeCategoryChanged.emit(index);
  }

  onButtonClick(index: number) {
    this.activeCategoryChanged.emit(index);
  }

  ngOnDestroy() {
    this.doneInitSubscription.unsubscribe();
  }

}
