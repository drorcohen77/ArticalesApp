import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Article } from '../../models/article.model';
import { ApplicationService } from '../../services/application.service';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit{

  @Input() color!: string;
  @Input() text!: string;
  @Output() btnClick = new EventEmitter();


  constructor(private appService: ApplicationService) {}

  ngOnInit(): void {
  }


  onClick() {
    this.btnClick.emit();
  }

}
