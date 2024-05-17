import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { DetailComponent } from './pages/detail/detail.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { UserComponent } from './pages/user/user.component';
import { TranslationComponent } from './translation/translation.component';
import { SelectedCategorieComponent } from './pages/selected-categorie/selected-categorie.component';
import { SelectedTypeComponent } from './pages/selected-type/selected-type.component';
import { LoginComponent } from './pages/login/login.component';
import { DeletemeComponent } from './pages/deleteme/deleteme.component';
import { PrivacypolicyComponent } from './pages/privacypolicy/privacypolicy.component';

const appRoutes: Routes = [
    {path: 'inicio', component: InicioComponent},
    {path: 'about', component: AboutComponent},
    {path: 'contact', component: ContactComponent},
    {path: 'deleteme', component: DeletemeComponent},
    {path: 'privacy', component: PrivacypolicyComponent},
    {path: 'detail/:id', component: DetailComponent},
    {path: 'selected-categorie/:id/:name/:nombre', component: SelectedCategorieComponent},
    {path: 'selected-type/:id/:name/:nombre', component: SelectedTypeComponent},
    {path: 'schedule', component: ScheduleComponent},
    {path: 'user', component: UserComponent},
    {path: 'login', component: LoginComponent},
    {path: 'tr', component: TranslationComponent},
    {path: '**', pathMatch: 'full', redirectTo: 'inicio'}
];

@NgModule({
    imports: [
        RouterModule.forRoot( appRoutes, {useHash: true} )
    ],

    exports: [
            RouterModule
    ]
})
export class AppRoutingModule {

}
