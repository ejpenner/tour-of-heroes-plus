import {bootstrap}    from '@angular/platform-browser-dynamic';

import {AppComponent} from './app.component';
import {HTTP_PROVIDERS} from '@angular/http';
import 'rxjs/Rx';
import {HeroService} from "./hero.service";

bootstrap(AppComponent, [HTTP_PROVIDERS]);
