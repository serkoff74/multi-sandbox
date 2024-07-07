import '@plex/theme-default/dist/index.css';
import { HomeCallsModule } from './packages';
import { SchedulesModule } from './packages';
import { renderModuleDevelopmentApplication } from '@mis/portal-module-development-app';

renderModuleDevelopmentApplication('#app', new HomeCallsModule(), new SchedulesModule())
