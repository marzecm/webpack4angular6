import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AComponent } from "./a.component";


const aRoutes: Routes = [
  { path: '', component: AComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forChild(aRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ARoutingModule{
}
