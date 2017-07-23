# npms-client-service

## usage

```tsx
const c = new Container();
c.bind(NpmsClientService).toSelf().inSingletonScope();
c.bind('fetch').toConstantValue(window.fetch);
c.get(NpmsClientService).search({q: "react", keywords: ["dom"], from: 0, size: 250})
.then(({total, results}) => {
});
```

implemented `search`, `suggestion`, `info`.

api endpoint: [https://api.npms.io/v2](https://api.npms.io/v2)

api docs:  [https://api-docs.npms.io/](https://api-docs.npms.io/)
