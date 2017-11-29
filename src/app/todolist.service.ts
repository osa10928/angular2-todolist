import { Injectable } from '@angular/core';
import { ListItem } from './listitem';

@Injectable()
export class TodolistService {
list: ListItem[]
  constructor() { }

  getList(): ListItem[] {
    if (localStorage.ng2TodoList) {
      return JSON.parse(localStorage.ng2TodoList)
    } else {
      return
    }
  }

  toggleTask(task: ListItem): void {
    let taskId: number = task.id;
    let item: string;
    this.list = JSON.parse(localStorage.getItem('ng2TodoList'));
    for (item in this.list) {
      if (this.list[item].id == taskId) {
        this.list[item].isComplete ? this.list[item].isComplete = false : this.list[item].isComplete = true;
      }
    }
    localStorage.setItem('ng2TodoList', JSON.stringify(this.list));
  }

  addTask(task: string): void {
    if (localStorage.ng2TodoList !== undefined) {
      let newTask: ListItem = {
        task: task,
        id: localStorage.ng2TodoList.split('').length,
        isComplete: false
      }
      this.list = JSON.parse(localStorage.getItem('ng2TodoList'));
      this.list.push(newTask)
      localStorage.setItem('ng2TodoList', JSON.stringify(this.list));
    } else {
      let newTask: ListItem = {
        task: task,
        id: 0,
        isComplete: false
      }
      this.list = [newTask];
      localStorage.setItem('ng2TodoList', JSON.stringify(this.list));
    }
  }

  deleteTask(task: ListItem): void {
    this.list = JSON.parse(localStorage.getItem('ng2TodoList'));
    let count: number = 0;
    this.list = this.list.filter((x) => {
      if (x.id === task.id) {
        return false
      } else {
        x.id = count;
        count++;
        return true;
      }
    })
    localStorage.setItem('ng2TodoList', JSON.stringify(this.list));
  }

  deleteCompleted(): void {
    this.list = JSON.parse(localStorage.getItem('ng2TodoList'));
    let count: number = 0;
    this.list = this.list.filter((x) => {
      if (x.isComplete === true) {
        return false
      } else {
        x.id = count;
        count++;
        return true;
      }
    })
    localStorage.setItem('ng2TodoList', JSON.stringify(this.list));
  }

}
