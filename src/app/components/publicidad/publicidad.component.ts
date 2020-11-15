import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-publicidad',
  templateUrl: './publicidad.component.html',
  styleUrls: ['./publicidad.component.scss'],
})
export class PublicidadComponent implements OnInit {
  @Input()data:any=[];

  constructor() { }

  ngOnInit() {}

}
