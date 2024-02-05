import useRequest from '@/hooks/useRequest';
import { useQuery } from '@tanstack/react-query';

const useFetchEvents = (
  args: {
    page?: number | string;
    take?: number | string;
    search?: string;
    own?: boolean;
  } = {
    page: 0,
    take: 20,
    own: false,
  },
) => {
  const { callRequest } = useRequest();

  const fetchConversations = async (): Promise<{
    events: IEvent[];
  }> => {
    let url = `/api/v1/events${args.own ? '/own' : ''}?page=${args.page || 0}&take=${
      args.take || 20
    }`;
    if (args.search) {
      url += `&search=${args.search}`;
    }
    return await callRequest('GET', url);
  };

  const query = useQuery<{
    events: IEvent[];
  }>({
    queryKey: ['events', args],
    queryFn: fetchConversations,
  });

  return query;
};

export default useFetchEvents;