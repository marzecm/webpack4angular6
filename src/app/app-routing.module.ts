import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: 'a', loadChildren: './components/compo-a/a.module#AModule'},
  {path: 'b', loadChildren: './components/compo-b/b.module#BModule'},
  {path: '**', redirectTo: 'a'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
