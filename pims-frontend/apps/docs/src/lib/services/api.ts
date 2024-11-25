import { apiInitializer } from '@pims-frontend/apis/lib/api';

export const api = apiInitializer(
  {
    baseUrl: 'http://localhost:8081',
  },
  {
    reducerPath: 'dev/api',
    tagTypes: ['sample', 'project', 'project-code'],
    endpoints: () => ({}),
  },
);
