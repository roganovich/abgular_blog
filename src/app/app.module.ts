import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Provider } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import {SharedModule} from 'src/app/shared/shared.module'
import { AuthService } from 'src/app/shared/services/auth.service';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';
import { MainLayoutComponent } from 'src/app/shared/components/main-layout/main-layout.component';
import { HomePageComponent } from 'src/app/home-page/home-page.component';
import { PostPageComponent } from 'src/app/post-page/post-page.component';
import { PostComponent } from 'src/app/shared/components/post/post.component';
import { AuthInterceptor } from 'src/app/shared/auth.interceptor';

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
}

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HomePageComponent,
    PostPageComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [INTERCEPTOR_PROVIDER],
  bootstrap: [AppComponent]
})
export class AppModule { }
