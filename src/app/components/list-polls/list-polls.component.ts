import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PageEvent } from '@angular/material';
import { DatePipe } from '@angular/common';

import { PollsService } from 'app/services/polls.service';
import { RouteStateService } from 'app/services/route-state.service';
import { Poll } from 'app/models/poll';
import { RouteState } from 'app/models/route-state';
import { PollsPage } from 'app/models/polls-page';
import { slideDown, slideUpDown, routerTransition } from 'app/animations';

@Component({
  selector: 'app-list-polls',
  templateUrl: './list-polls.component.html',
  styleUrls: ['./list-polls.component.scss'],
  animations: [slideDown, slideUpDown, routerTransition],
  host: {
    '[@routerTransition]': '',
    '(@routerTransition.done)': 'transitionEnd()'
  }
})
export class ListPollsComponent implements OnInit, OnDestroy {
  public filterFG: FormGroup;
  private _filterFG: string = 'filterFG';

  public page: PollsPage;

  public paginator: PageEvent;
  private _paginator: string = 'paginator';

  private params: Map<string, any> = new Map();
  private _params: string = 'params';

  public filter: boolean = false;
  private _filter: string = 'filter';

  public ngxChartsData: any[][] = [];

  constructor(private fb: FormBuilder,
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    private stateService: RouteStateService,
    private pollsService: PollsService) { }

  transitionEnd() {
    this.update();
  }

  ngOnInit() {
    console.time('on init')
    this.initFilterFG();
    this.initPaginator();
    this.load();
    console.timeEnd('on init')
  }

  ngOnDestroy() {
    this.save();
  }

  private initPaginator() {
    this.paginator = new PageEvent();
    this.paginator.pageIndex = 0;
    this.paginator.pageSize = 10;
  }

  private initFilterFG() {
    this.filterFG = this.fb.group({
      open: false,
      tags: '',
      start: '',
      end: ''
    })
  }

  private filterList() {
    this.params.set('state', this.filterFG.controls.open.value ? 'OPEN' : '');
    this.params.set('tags', this.filterFG.controls.tags.value);

    let start: string = this.transformDate(new Date(this.filterFG.controls.start.value));
    let end: string = this.transformDate(new Date(this.filterFG.controls.end.value));
    this.params.set('start', start);
    this.params.set('end', end);

    this.update();
  }

  //duplicate in new poll
  private transformDate(date: Date): string {
    if (date.getTime()) {
      return this.datePipe.transform(date, "yyyy-MM-ddTHH:mm:ss'Z'");
    } else {
      return '';
    }
  }

  private load() {
    let data = this.stateService.getState(this.route.component.toString());
    if (data) {
      this.filter = data.get(this._filter);
      this.filterFG = data.get(this._filterFG);
      this.paginator = data.get(this._paginator);
      this.params = data.get(this._params);
    }
  }

  private save() {
    let name = this.route.component.toString();
    let data = new Map<string, any>();
    data.set(this._filter, this.filter);
    data.set(this._filterFG, this.filterFG);
    data.set(this._paginator, this.paginator);
    data.set(this._params, this.params);

    this.stateService.saveState(name, data)
  }

  private updateView(page: PollsPage) {
    console.log('updating view')
    this.page = page;
    this.updateCharts(page.content);
  }

  private updateCharts(polls: Poll[]) {
    console.log('updating charts')
    for (var i: number = 0; i < polls.length; i++) {
      this.ngxChartsData[i] = [];
      if (i % 2 == 0) {
      }
      for (let option of polls[i].options) {
        this.ngxChartsData[i].push({
          "name": option.name,
          "value": option.votesCount
        });
      }
    }
  }

  private update() {
    let params = new Map<string, any>();
    params.set('page', this.paginator.pageIndex);
    params.set('size', this.paginator.pageSize);
    params.set('sort', 'totalVotes,desc');
    this.params.forEach((value: any, key: string) => { params.set(key, value) });

    this.pollsService.getPolls(params).subscribe(resp => {
      console.log(resp);
      this.updateView(resp.body)
    });
  }

  private showFilter() {
    this.filter = !this.filter;
  }

  private clearStart() {
    this.filterFG.controls.start.setValue('');
  }

  private clearEnd() {
    this.filterFG.controls.end.setValue('');
  }

  private pageChanged(event: PageEvent) {
    console.log('page changed')
    console.log(event)
    this.paginator = event;
    this.update();
  }

}
