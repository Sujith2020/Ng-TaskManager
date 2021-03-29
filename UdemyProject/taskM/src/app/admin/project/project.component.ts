import { Component, ContentChild, ContentChildren, EventEmitter, Input, OnChanges, OnInit, Output, QueryList, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { Project } from 'src/app/project';
import { ProjectsService } from 'src/app/projects.service';
import { CheckBoxPrinterComponent } from '../check-box-printer/check-box-printer.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit, OnChanges {
  @Input("currentProject") project: Project;
  @Input("recordIndex") i: number;

  @Output() editClick = new EventEmitter();
  @Output() deleteClick = new EventEmitter();
  hideDetails: boolean = false;
  MySubscription: Subscription;

  // @ContentChild("selectionBox") selectionBox: CheckBoxPrinterComponent;
  @ContentChildren("selectionBox") selectionBoxs: QueryList<CheckBoxPrinterComponent>;

  constructor(public projectsService: ProjectsService) {
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    console.info("--------------ngOnChanges called");

    for (let propName in simpleChanges) {
      let chng = simpleChanges[propName];
      let cur = JSON.stringify(chng.currentValue);
      let prev = JSON.stringify(chng.previousValue);
      //console.log(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
    }
  }
  ngAfterViewInit() {
    console.info("--------------ngAfterViewInit called");
    //console.log(this.selectionBoxs.toArray());
  }

  ngAfterViewChecked() {
    console.info("--------------ngAfterViewChecked called");
    //console.log(this.selectionBoxs.toArray());
  }

  ngAfterContentInit() {
    console.info("--------------ngAfterContentInit called");
    //console.log(this.selectionBoxs.toArray());
  }

  ngAfterContentChecked() {
    console.info("--------------ngAfterContentChecked called");
    //console.log(this.selectionBoxs.toArray());
  }

  ngDoCheck() {
    console.info("--------------ngDoCheck called");
  }

  ngOnInit() {
    console.info("--------------ngOnIt called");

    this.MySubscription = this.projectsService.MySubject.subscribe((hide) => {
      this.hideDetails = hide;
    });
  }


  isAllCheckedChange(b: boolean) {
    let selectionBoxss = this.selectionBoxs.toArray();

    if (b) {
      for (let i = 0; i < selectionBoxss.length; i++) {
        selectionBoxss[i].check();
      }
      //this.selectionBox.check();
    }
    else {
      for (let i = 0; i < selectionBoxss.length; i++) {
        selectionBoxss[i].unCheck();
      }
      //this.selectionBox.unCheck();
    }
  }

  onEditClick(event, i) {
    this.editClick.emit({ event, i });
  }

  onDeleteClick(event, i) {
    this.deleteClick.emit({ event, i });
  }

  ngOnDestroy() {
    this.MySubscription.unsubscribe();
    console.info("--------------ngOnDestroy called");
  }
  // toggleDetails() {
  //   this.hideDetails = !this.hideDetails;
  // }
}
