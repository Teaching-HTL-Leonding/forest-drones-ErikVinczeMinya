import { Component, OnInit } from '@angular/core';
import { DamagedTree, Drone, DronesService } from '../drones/drones.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-drone',
  templateUrl: './drone.component.html',
  styleUrls: ['./drone.component.css'],
})
export class DroneComponent implements OnInit {
  public drone?: Drone;
  public droneId: string;
  public x: number;
  public y: number;
  public damagedTrees: DamagedTree[];
  public test: any;
  public scanDone: boolean;

  constructor(
    private route: ActivatedRoute,
    public dronesService: DronesService
  ) {
    this.droneId = '';
    this.x = 0;
    this.y = 0;
    this.damagedTrees = [];
    this.scanDone = false;
  }

  ngOnInit(): void {
    this.droneId = this.route.snapshot.paramMap.get('id')!;
    this.dronesService.getDrones().subscribe((data) => {
      this.drone = data.find((drone) => drone.id == parseInt(this.droneId));
      this.scanDone = false;
    });
  }

  public activateDrone() {
    this.dronesService
      .activateDrone(parseInt(this.droneId))
      .subscribe((data) => {
        this.drone = data;
      });
  }

  public shutdownDrone() {
    this.dronesService
      .shutdownDrone(parseInt(this.droneId))
      .subscribe((data) => {
        this.drone = data;
      });
  }

  public flyTo(x:number, y:number) {
    this.dronesService
      .flyTo(parseInt(this.droneId), x, y)
      .subscribe((data) => {
        this.drone = data;
      });
  }

  public scan() {
    this.dronesService.scan(parseInt(this.droneId)).subscribe((data) => {
      this.dronesService.addDamagedTrees(data.damagedTrees);
      this.dronesService.getNearestTree(this.dronesService.myPosition.x, this.dronesService.myPosition.y);
      this.scanDone = true;
    });
  }

  public flyToScanGetNearestTree() {
    this.flyTo(this.dronesService.myPosition.x, this.dronesService.myPosition.y);
    this.scan();
    this.dronesService.getNearestTree(this.dronesService.myPosition.x, this.dronesService.myPosition.y);
  }
}
