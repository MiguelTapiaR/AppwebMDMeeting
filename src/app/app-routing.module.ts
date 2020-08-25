import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { DetailComponent } from './pages/detail/detail.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { UserComponent } from './pages/user/user.component';

const app_routes: Routes = [
    {path: 'inicio', component: InicioComponent},
    {path: 'about', component: AboutComponent},
    {path: 'contact', component: ContactComponent},
    {path: 'detail', component: DetailComponent},
    {path: 'schedule', component: ScheduleComponent},
    {path: 'user', component: UserComponent},
    {path: '**', pathMatch: 'full', redirectTo: 'inicio'}
];

@NgModule({
    imports: [
        RouterModule.forRoot( app_routes, {useHash: true} )
    ],

    exports: [
            RouterModule
    ]
})
export class AppRoutingModule {

}
