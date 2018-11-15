import { NgModule } from "@angular/core";
import { AComponent } from "./a.component";
import { CommonModule } from "@angular/common";
import { ARoutingModule } from "./a.routing.module";

@NgModule({
  declarations: [AComponent],
  imports: [CommonModule, ARoutingModule],
  exports: [AComponent]
})
export class AModule {
}
