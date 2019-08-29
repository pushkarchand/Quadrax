import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ConfigService } from './service/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit {

  // store current tenant
  public activeTenant: string;

  constructor(private router: Router, private configService: ConfigService) { }



  ngOnInit() {

    const tenants = ['jitsingfow',
      'eqtribe',
      'mysite'];
    const defaultTenant = 'mysite';
    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationStart))
      .subscribe((event: NavigationStart) => {
        const url = event.url === '/' ? '' : event.url;
        const urlAndQuery = url.split('?');
        const pathMap = urlAndQuery[0].split('/');
        // first element is an empty string, second element of the path segments is the tenant
        const firstPathPart = pathMap[1];
        // firstPathPart
        this.configService.setCurrentSunDomain(firstPathPart);
        // a known tenant is in the url path (in case of a direct page load)
        if (tenants.includes(firstPathPart) || firstPathPart === defaultTenant) {

          // if tenant has changed, store it
          if (firstPathPart !== this.activeTenant) {
            this.activeTenant = firstPathPart;
          }

        } else {
          // no tenant in the path, so add the stored activeTenant or default
          let prefix;
          if (this.activeTenant) {
            prefix = this.activeTenant;
          } else {
            prefix = defaultTenant;
          }

          // finally build url of tenant prefix, path and query params
          const redirectUrl = '/' + prefix + this.addPath(urlAndQuery) + this.addQuery(urlAndQuery);
          console.log(redirectUrl);
          this.router.navigate([redirectUrl]);
        }
      });
  }



  private addPath = (urlAndQuery: string[]) => urlAndQuery[0] ? '/' + urlAndQuery[0] : '';
  private addQuery = (urlAndQuery: string[]) => urlAndQuery[1] ? '?' + urlAndQuery[1] : '';
}
