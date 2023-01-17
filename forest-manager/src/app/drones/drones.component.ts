import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Drone, DronesService } from './drones.service';

@Component({
  selector: 'app-drones',
  templateUrl: './drones.component.html',
  styleUrls: ['./drones.component.css'],
})
export class DronesComponent implements OnInit {
  public drones?: Drone[];
  constructor(public dronesService: DronesService, private router: Router) {}

  ngOnInit(): void {
    this.dronesService.getDrones().subscribe((data) => {
      this.drones = data;
    });
  }

  public navigateToDetails(droneId: number) {
    this.router.navigate(['/drones', droneId]);
  }
}
