import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-select-tab',
  templateUrl: './select-tab.component.html',
  styleUrls: ['./select-tab.component.scss']
})
export class SelectTabComponent implements OnInit {
  bankAssigned;
  paramsData;
  constructor(public activatedRoute : ActivatedRoute,
    public router : Router) {
        this.activatedRoute.queryParams.subscribe((success)=>{
            console.log(success);
            this.paramsData = success.value;
        })
   }

  ngOnInit() {
  }

  onGoToPage(pageName){
    this.router.navigate([pageName]);
  }

}
