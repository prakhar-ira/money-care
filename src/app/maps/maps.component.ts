import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { AddSubAdminComponent } from 'app/dialogs/add-sub-admin/add-sub-admin.component';
import { PanelServices } from '../services/panel.services';

interface Marker {
lat: number;
lng: number;
label?: string;
draggable?: boolean;
}
@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {
  allAdmins: any;
  constructor(
    public matDialog: MatDialog,
    public ps: PanelServices,
    ) { }


  ngOnInit() {
  }

  getAllAdmin() {
    this.ps.getAdmin().subscribe( data => {
      this.allAdmins = data;
    })
  }

  openDialog() {
    this.matDialog.open(AddSubAdminComponent, {
      width: "500px",
      autoFocus: false,
    })
  }

}
