import { InjectableApi } from '../../../api';

export const sampleApiInitializer = (api: InjectableApi) =>
  api.injectEndpoints({
    endpoints: (build) => ({
      getSample: build.query<{ sample: string }, void>({
        query: () => {
          return { url: '/sample', method: 'GET' };
        },
        providesTags: ['sample'],
      }),
    }),
  });
