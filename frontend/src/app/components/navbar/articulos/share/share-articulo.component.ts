import {Component, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {ArticuloModel} from "../../../../entities/Articulo.model";
import {faWhatsapp} from "@fortawesome/free-brands-svg-icons";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-share',
  templateUrl: './share-articulo.component.html',
  styleUrls: ['./share-articulo.component.css']
})
export class ShareArticuloComponent implements OnInit {
  faWhatsapp = faWhatsapp;
  faEnvelope = faEnvelope;

  constructor(private bottomSheetRef: MatBottomSheetRef<ShareArticuloComponent>,
              @Inject(MAT_BOTTOM_SHEET_DATA) public data: { articulo: ArticuloModel }) {
  }

  ngOnInit(): void {
  }

  openLink(event: MouseEvent): void {
    //event.preventDefault(); //CIERRA EL COMPONENTE PERO NO ANULAR EL EVENTO PRODUCIDO
    this.bottomSheetRef.dismiss();
  }
}
