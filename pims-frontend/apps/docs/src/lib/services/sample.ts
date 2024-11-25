import { sampleApiInitializer } from '@pims-frontend/apis/lib/features/pms/sample/controller';
import { api } from './api';

const sampleApi = sampleApiInitializer(api);

export const { useGetSampleQuery } = sampleApi;
