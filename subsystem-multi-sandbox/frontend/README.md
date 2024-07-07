**### Для установки проекта, после выкачивания из гита, нужно запустить команду

```
yarn install
```

### Запуск проекта в режиме разработчика с апи локально(для этого надо поднять бэкенд проекта в докере)

```
yarn run dev
```

### Запуск тестов

```
yarn run test
```

### Запуск проверки типов

```
yarn run type-check
```

### Запуск проверки синтаксиса кода согласно правилам eslint

```
yarn run lint:fix
```

### Публикация проекта в npm репозиторий, чтобы он был доступен другим командам.

```
yarn run publish:package
```

### Добавление сторонних зависимостей в package.json

Все зависимости на сторонние библиотеки, которые нужны для запуска модуля в проде, должны быть объявлены в
peerDependencies и devDependencies секциях. Версии на @mis/ пакеты обязательно должны содержать ^ вначале версии(соответствует увеличению
minor-версии https://habr.com/ru/companies/domclick/articles/509440/)
Вариант добавления зависимостей на сторонние библиотеки.

```
"devDependencies": {
    "@mis/application-core": "^0.2.25"
  }
"peerDependencies": {
    "@mis/application-core": "^0.2.25"
  }
```

### Структура папок согласно FSD (https://feature-sliced.design/ru/docs/get-started/overview)

1. app — точка связи с приложением. в файле modules.ts находится класс модуля, который осуществляет связь модуля производственной команды с главным приложением.
1. pages (страницы) — композиционный слой для сборки полноценных страниц из сущностей, фич и виджетов.
1. widgets (виджеты) — композиционный слой для соединения сущностей и фич в самостоятельные блоки. (например, IssuesList, UserProfile).
1. features (фичи) — взаимодействия с пользователем, действия, которые несут бизнес-ценность для пользователя. (например, SendComment, AddToCart, UsersSearch).
1. entities (сущности) — бизнес-сущности. (например, User, Product, Order).
1. shared — переиспользуемый код, не имеющий отношения к специфике приложения/бизнеса. (например, UIKit, libs, API).


### Разработка модуля, который можно будет использовать в портале и другим командам

В папке app есть файл modules.ts. Он содержит класс модуля, который будет всстраиваться в приложение при его запуске.
В этом классе можно
добавлять сервисы для работы с апи,
```
addAPIServices({
    someService: SomeServiceClass
})
```
добавлять сервисы по работе со словарями,
```
addDictionaries({
    someDictionary: SomeDictionaryClass
})
```
регистрировать свои компоненты,
```
registerComponent('componentName', SomeVueComponent)
```
регистрировать директивы для vue
```
registerDirective('directiveName', SomeVueDirective)
```
управлять страницами
```
managePages((pages) => {
   pages.addPage('pathToPage', SomePage);
});
```

Подробный пример
```
export class PatientModule extends ApplicationModule {
  install(env: IApplicationModuleEnvironment) {
    return this.addAPIServices({
      medicalCards: MedicalCardsRemoteBackendService,
      medicalCardSections: MedicalCardSectionsLocalBackendService,
      medicalCardHistory: MedicalCardHistoryRemoteService,
      infoAgreement: InfoAgreementMockedBackendService,
      anthropometry: AnthropometryMockedBackendService,
      fluorography: FluorographyRemoteApiService,
      patientMarkers: PatientMarkersRemoteBackendService
    }).managePages((pages) => {
      pages.addPage('patients/new', NewPatientPage);
    });
  }
}
```


### Работа с api

Работа с сервисами api осуществляется с помощью сторов pinia. Сторы должны создаваться в папке stores соответствующей сущности в папке entities
Пример файла стора somethingStore.ts для производственного модуля

```
import type { AjaxStoreParams } from '@plex/ui';
import { defineModuleStore } from '../../../shared/stores/helpers';

const useSomeStore = defineModuleStore((context) => {

  async function doSomething() {
    return {};
  }

  return {
    doSomething
  };
});

export default useSomeStore;

```

context в методе defineModuleStore предлагает различные методы для работы с данными. Основные из них
```
useAPIServices;
useDictionaries;
```

через useAPIServices можно получить доступ для любого сервиса, который был объявлен в модуле через addAPIServices.

Делается это следующим образом в сторе
```
context.useAPIServices().<имя модуля производственной команды>.<имя сервиса>
```


Пример, если у нас имя производственной команды test и мы имеем такой модуль в системе
```
class TestModule extends ApplicationModule<'test'> {
  constructor() {
    super('test');
  }

  install(env: IApplicationModuleEnvironment) {
    return this.addAPIServices({
      files: FilesUploadService
    });
  }
}
```
где FilesUploadService какой-то сервис с методами
```
uploadFile
uploadFileWithProgress
```
то для того, чтобы начать с ним работать в сторе надо сделать следующее

```
import type { AjaxStoreParams } from '@plex/ui';
import { defineModuleStore } from '../../../shared/stores/helpers';

const useFilesStore = defineModuleStore((context) => {

  async function uploadFile() {
    return context.useAPIServices().test.files.uploadFile();
  }

  return {
    uploadFile
  };
});

export default useFilesStore;
```