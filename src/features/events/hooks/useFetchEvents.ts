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
    take: 3,
    own: false,
  },
) => {
  const { callRequest } = useRequest();

  const fetchEvents = async (): Promise<{
    events: IEvent[];
    meta: IPaginationMeta;
  }> => {
    let url = `/api/v1/events${args.own ? '/own' : ''}?page=${args.page || 0}&take=${
      args.take || 3
    }`;
    if (args.search) {
      url += `&search=${args.search}`;
    }
    return await callRequest('GET', url);
  };

  const query = useQuery<{
    events: IEvent[];
    meta: IPaginationMeta;
  }>({
    queryKey: ['events', args],
    queryFn: fetchEvents,
  });

  return query;
};

export default useFetchEvents;
