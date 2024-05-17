import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-deleteme',
  templateUrl: './deleteme.component.html',
  styleUrls: ['./deleteme.component.css']
})
export class DeletemeComponent implements OnInit {

  constructor(public back: BackendService) { }

  ngOnInit(): void {
  }

}
