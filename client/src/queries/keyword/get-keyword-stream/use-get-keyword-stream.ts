import { KeywordStreamApi } from '@queries';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export function useGetKeywordStream(id?: string) {
  const queryClient = useQueryClient();
  const [data, setData] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) return;

    const eventSource = KeywordStreamApi.getKeywordStream({ id });

    eventSource.onmessage = (event) => {
      setData(event.data);
      queryClient.setQueryData(['keywordStream', id], event.data);
    };

    eventSource.onerror = (err) => {
      setError(new Error(`GetKeywordStream: ${JSON.stringify(err)}`));
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [id, queryClient]);

  return { data, error };
}
