import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BComponent } from "./b.component";


const bRoutes: Routes = [
  { path: '', component: BComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(bRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class BRoutingModule{
}
