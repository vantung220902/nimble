import { UseQueryOptions } from '@tanstack/react-query';

export type QueryOptions<T> = Omit<UseQueryOptions, 'QueryKey'> & { QueryKey: T };
