import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, AbstractControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { PollsService } from 'app/services/polls.service';
import { Poll } from 'app/models/poll';
import { routerTransition } from 'app/animations';

@Component({
  selector: 'app-view-poll',
  templateUrl: './view-poll.component.html',
  styleUrls: ['./view-poll.component.scss'],
  animations: [routerTransition],
  host: { '[@routerTransition]': '' }
})
export class ViewPollComponent implements OnInit {
  public poll: Poll;
  public optionsFG: FormGroup;
  public results: boolean = false;
  public voted: boolean = false;

  public ngxChartData: any[];

  constructor(
    private fb: FormBuilder,
    private pollsService: PollsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    console.log(`view poll: ${id}`);

    this.pollsService.getPollById(id).subscribe(resp => {
      console.log(resp);
      let poll = resp.body;
      this.poll = poll;
      this.initOptionsFG(poll);
      this.update(poll);
    });
  }

  private initOptionsFG(poll: Poll) {
    if (poll.multiOptions) {
      let controls = [];
      for (let option of poll.options) {
        controls.push(false);
      }
      console.log('poll allows multiple choices')
      this.optionsFG = this.fb.group({
        selected: this.fb.array(controls, this.validateMultipleOptions)
      });
    } else {
      console.log('poll allows ONLY single coice')
      this.optionsFG = this.fb.group({
        selected: ['', [Validators.required, this.validateSingleOptions]]
      });
    }
  }

  public viewResults(): void {
    this.results = true;
  }

  public hideResults(): void {
    this.results = false;
  }

  private update(poll: Poll) {
    if (poll.state === 'CLOSED') {
      this.results = true;
    }
    this.updateChart(poll);
  }

  private updateChart(poll: Poll) {
    this.ngxChartData = [];
    for (let option of poll.options) {
      this.ngxChartData.push(
        {
          name: option.name,
          value: option.votesCount
        }
      );
    }
  }

  public refresh() {
    this.pollsService.getPollById(this.poll.id).subscribe(resp => {
      console.log(resp);
      this.poll = resp.body;
    });
  }

  public vote(): void {
    let selected: number[] = [];
    if (this.poll.multiOptions) {
      let selectedArr = this.optionsFG.controls.selected.value;
      for (let i = 0; i < selectedArr.length; i++) {
        if (selectedArr[i] === true) {
          selected.push(i);
        }
      }
    } else {
      selected.push(this.optionsFG.controls.selected.value);
    }
    this.pollsService.vote(this.poll.id, selected).subscribe(resp => {
      console.log(resp);
      let poll = resp.body;
      this.poll = poll;
      this.update(resp.body)
      this.results = true;
    });
    this.voted = true;
  }

  public getProgress(optionIndex: number): number {
    let optionVotes = this.poll.options[optionIndex].votesCount;
    let totalVotes = this.poll.totalVotes;
    return (optionVotes / totalVotes) * 100;
  }

  public getRoundedProgress(i) {
    return Math.round(this.getProgress(i));
  }

  private validateSingleOptions(control: AbstractControl) {
    if (!control.value) {
      return { validOptions: true };
    }
    return null;
  }

  private validateMultipleOptions(control: AbstractControl) {
    let options: boolean[] = control.value;
    let sum = 0;
    for (let option of options) {
      sum += option ? 1 : 0;
    }
    if (sum === 0) {
      return { validOptions: true };
    }
    return null;
  }

  public get tooltip(): string {
    if (this.optionsFG.valid) {
      return '';
    } else {
      return 'Please choose vote option'
    }
  }

}

