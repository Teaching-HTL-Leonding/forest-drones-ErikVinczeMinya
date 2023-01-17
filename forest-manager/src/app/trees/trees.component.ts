import { Component } from '@angular/core';
import { DamagedTree, DronesService } from '../drones/drones.service';

@Component({
  selector: 'app-trees',
  templateUrl: './trees.component.html',
  styleUrls: ['./trees.component.css'],
})
export class TreesComponent {
  public damagedTrees: DamagedTree[];
  constructor(public dronesService: DronesService) {
    this.damagedTrees = this.dronesService.damagedTrees;
  }

  public examineTree(x: number, y: number) {
    this.dronesService.examineTree(x, y).subscribe();
    //splice the tree with the given coordinates from the damagedTrees array
    for (let i = 0; i < this.dronesService.damagedTrees.length; i++) {
      if (
        this.dronesService.damagedTrees[i].x == x &&
        this.dronesService.damagedTrees[i].y == y
      ) {
        this.dronesService.damagedTrees.splice(i, 1);
      }
    }
  }
}
