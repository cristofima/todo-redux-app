import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Todo } from '../models/todo.model';
import * as actions from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() todo!: Todo;
  @ViewChild('inputElement') txtInputElement!: ElementRef;

  chkCompleted!: FormControl;
  txtInput!: FormControl;
  editing = false;

  constructor(private store: Store<AppState>) {

  }

  ngOnInit(): void {
    this.chkCompleted = new FormControl(this.todo.completed);
    this.txtInput = new FormControl(this.todo.text, Validators.required);
    this.chkCompleted.valueChanges.subscribe(value => {
      this.store.dispatch(actions.toggle({id: this.todo.id}));
    });
  }

  edit(){
    this.editing = true;
    this.txtInput.setValue(this.todo.text);
    setTimeout(() => {
      this.txtInputElement.nativeElement.select();
    }, 1);
  }

  endEdition(){
    this.editing = false;

    if(this.txtInput.invalid || this.txtInput.value == this.todo.text) return;

    this.store.dispatch(actions.edit({id: this.todo.id, text: this.txtInput.value}));
  }

  delete(){
    this.store.dispatch(actions.remove({id: this.todo.id}));
  }

}
