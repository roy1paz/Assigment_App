// import { bootstrapApplication, provideProtractorTestingSupport } from '@angular/platform-browser';
// import { AppComponent } from './app/app.component';
// import { provideRouter } from '@angular/router';
// import routeConfig from './app/app.routes';
// import { AppModule } from './app/app.module';


// bootstrapApplication(AppModule, {
//   providers: [provideProtractorTestingSupport(), provideRouter(routeConfig)]
// }).catch((err) => console.error(err));



import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';  // Update the path based on your project structure


// Bootstrap the AppModule
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
