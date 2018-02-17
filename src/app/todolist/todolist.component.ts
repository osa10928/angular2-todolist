import { Component, OnInit } from '@angular/core';

import { ListItem } from '../listitem';
import { TodolistService } from '../todolist.service';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {

  list: ListItem[];
  length: number;
  cssClass: {};

  constructor(private todolistService: TodolistService) { }

  checkCompleted(task: ListItem) {
    return task.isComplete;
  }

  getCss(task: ListItem) {
    //console.log(task);
    if (task.isComplete) {
      this.cssClass = {
        'completed': true
      }
    } else {
      this.cssClass = {
        'completed' : false
      }
    }
    return this.cssClass;
  }

  getList(): void {
    this.list = this.todolistService.getList();
    this.list ? this.length = this.list.length : this.length = 0;
  }

  addTask(task: string): void {
    task = task.trim();
    if (!task) { return; }
    this.todolistService.addTask(task)
    this.getList();
  }

  deleteTask(task: ListItem): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.todolistService.deleteTask(task);
    }
  }

  deleteCompleted(): void {
    if (confirm('Are you sure you want to delete ALL completed tasks?')) {
      this.todolistService.deleteCompleted();
    }
    this.getList();
  }

  toggleTask(task: ListItem): void {
    if (task) {
      this.todolistService.toggleTask(task);
      this.getList();
    }
  }

  ngOnInit() {
    this.getList();
  }

}
