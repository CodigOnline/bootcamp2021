import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-opiniones',
  templateUrl: './opiniones.component.html',
  styleUrls: ['./opiniones.component.css']
})
export class OpinionesComponent implements OnInit {

  //recuperación en realtime de datos
  constructor() { }

  ngOnInit(): void {
    //recuperación de datos en realtime
    console.log("Iniciando componente opiniones");
  }

}
