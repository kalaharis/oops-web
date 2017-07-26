import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

import { PollsService } from 'app/services/polls.service'
import { slideUpDown, routerTransition } from 'app/animations';

@Component({
  selector: 'app-new-poll',
  templateUrl: './new-poll.component.html',
  styleUrls: ['./new-poll.component.scss'],
  animations: [slideUpDown, routerTransition],
  host: { '[@routerTransition]': '' }
})
export class NewPollComponent implements OnInit {
  public creationFG: FormGroup;
  public advanced: boolean = false;
  public editingTags: boolean = false;

  constructor(
    private datePipe: DatePipe,
    private router: Router,
    private fb: FormBuilder,
    private changeDetector: ChangeDetectorRef,
    private pollsService: PollsService) { }

  ngOnInit() {
    this.creationFG = this.fb.group({
      question: ['', Validators.required],
      tags: this.fb.array([]),
      options: this.fb.array([
        this.fb.control('', Validators.required),
        this.fb.control('', Validators.required),
        this.fb.control('')
      ]),
      private: false,
      multioptions: false,
      expire: '',
    })
  }

  private addOption() {
    console.log('adding option...')
    let options = <FormArray>this.creationFG.controls.options
    options.push(this.fb.control(''));
  }


  private clearDate(dateInput: HTMLInputElement) {
    dateInput.value = '';
  }

  private editTag() {
    this.editingTags = !this.editingTags;
    console.log(`after flip: ${this.editingTags}`)
    this.changeDetector.detectChanges();
  }

  private removeTag(i: number) {
    console.log(`removing tag ${i}`)
    let tags = <FormArray>this.creationFG.controls.tags
    tags.removeAt(i);
  }

  private saveTag(tagInput: HTMLInputElement) {
    console.log('adding tag...')
    let inputText = tagInput.value;
    let tags = <FormArray>this.creationFG.controls.tags
    if (inputText.trim()) {
      console.log(`input text: ${inputText}`)
      tags.push(this.fb.control(inputText));
      tagInput.value = '';
    } else {
      console.log(`input text is empty`)
    }
    this.editingTags = false;
  }

  private create() {
    console.log(`form value:`);
    console.log(this.creationFG.value);

    let name: string = this.creationFG.controls.question.value;
    let options: string[] = this.trimOpions(this.creationFG.controls.options.value);
    let tags: string[] = this.creationFG.controls.tags.value;
    let hidden: boolean = this.creationFG.controls.private.value;
    let multi: boolean = this.creationFG.controls.multioptions.value;

    let date = new Date(this.creationFG.controls.expire.value);
    let expire: string = date.getTime() ? this.datePipe.transform(date, "yyyy-MM-ddTHH:mm:ss'Z'") : '';

    let poll = {
      name: name,
      options: options,
      tags: tags,
      expireDate: expire,
      hidden: hidden,
      multiOptions: multi
    };

    this.pollsService.startPoll(poll).subscribe(resp => {
      console.log(resp);
      this.router.navigate(['/view', resp.body.id])
    });

    /*this.pollsService.startPoll(poll)
      .then(poll => this.router.navigate(['/view', poll.id]));*/

  }

  private trimOpions(allOptions: string[]) {
    let options: string[] = [];
    for (let option of allOptions) {
      if (option.trim()) {
        options.push(option);
      }
    }
    return options;
  }

  private onFocus(i: number) {
    let options = <FormArray>this.creationFG.controls.options
    if (i === options.length - 1)
      this.addOption();
  }

  private showAdvanced() {
    this.advanced = !this.advanced;
    let expire = this.creationFG.controls.expire;
    console.log(expire.value)
  }

}
