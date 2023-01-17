import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Drone {
  id: number
  isActive: boolean
  position: {
    x: number
    y: number
  }
}

export interface scanResponse {
  Position: Position
  damagedTrees: DamagedTree[]
}

export interface Position {
  x: number
  y: number
}

export interface DamagedTree {
  x: number
  y: number
}

@Injectable({
  providedIn: 'root'
})
export class DronesService implements OnInit {
  public drones: Drone[];
  public damagedTrees: DamagedTree[];
  public myPosition: Position;
  public nearestTree: DamagedTree;
  public nearestTreeDistance: Position;

  constructor(private http: HttpClient) {
    this.nearestTreeDistance = {x: 0, y: 0};
    this.nearestTree = {x: 0, y: 0};
    this.myPosition = {x: 0, y: 0};
    this.drones = [];
    this.damagedTrees = [];
  }

  ngOnInit(): void {
    this.http.get<Drone[]>('http://localhost:5110/drones',{

    }).subscribe(data => this.drones = data)
  }

  public addDamagedTrees(damagedTrees: DamagedTree[]) {
    console.log(damagedTrees);
    for(let i = 0; i < damagedTrees.length; i++) {
      let alreadyInArray = false;
      for(let j = 0; j < this.damagedTrees.length; j++) {
        if(this.damagedTrees[j].x == damagedTrees[i].x && this.damagedTrees[j].y == damagedTrees[i].y) {
          alreadyInArray = true;
        }
      }
      if(!alreadyInArray){
        this.damagedTrees.push(damagedTrees[i]);
      }
    }
  }

  public getNearestTree(x: number, y: number) {
    let nearestTreeDistance: number = Number.MAX_SAFE_INTEGER;
    for (let i = 0; i < this.damagedTrees.length; i++) {
      let distance: number =
        Math.abs(this.damagedTrees[i].x - x) +
        Math.abs(this.damagedTrees[i].y - y);
      if (distance < nearestTreeDistance) {
        nearestTreeDistance = distance;
        this.nearestTree = this.damagedTrees[i];
        console.log(this.damagedTrees[i]);
      }
    }
    this.calcPathToNearestTree();
  }

  public calcPathToNearestTree() {
    this.nearestTreeDistance = {
      x: this.nearestTree.x - this.myPosition.x,
      y: this.nearestTree.y - this.myPosition.y,
    };
  }

  public getDrones(): Observable<Drone[]> {
    const url = `http://localhost:5110/drones`;
    return this.http.get<Drone[]>(url);
  }

  public activateDrone(id: number): Observable<Drone> {
    const url = `http://localhost:5110/drones/${id}/activate`;
    return this.http.post<Drone>(url, {});
  }

  public shutdownDrone(id: number): Observable<Drone> {
    const url = `http://localhost:5110/drones/${id}/shutdown`;
    return this.http.post<Drone>(url, {});
  }

  public flyTo(id: number, x: number, y: number): Observable<Drone> {
    const url = `http://localhost:5110/drones/${id}/flyTo`;
    return this.http.post<Drone>(url, {x, y});
  }

  public scan(id: number): Observable<scanResponse> {
    const url = `http://localhost:5110/drones/${id}/scan`;
    return this.http.get<scanResponse>(url, {});
  }

  public examineTree(x: number, y: number): Observable<Drone> {
    const url = `http://localhost:5110/trees/markAsExamined    `;
    return this.http.post<Drone>(url, {x, y});
  }
}
