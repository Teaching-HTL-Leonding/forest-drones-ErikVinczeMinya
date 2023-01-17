import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DroneComponent } from './drone/drone.component';
import { DronesComponent } from './drones/drones.component';
import { TreesComponent } from './trees/trees.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'drones'},
  { path: 'drones', component: DronesComponent },
  { path: 'drones/:id', component: DroneComponent },
  { path: 'trees', component: TreesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
