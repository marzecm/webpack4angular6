import { NgModule } from "@angular/core";
import { BComponent } from "./b.component";
import { CommonModule } from "@angular/common";
import { BRoutingModule } from "./b.routing.module";

@NgModule({
  declarations: [BComponent],
  imports: [CommonModule, BRoutingModule],
  exports: [BComponent]
})
export class BModule {
}
