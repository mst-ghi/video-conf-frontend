import { useFetchMessages } from '../hooks';
import { Fragment } from 'react';
import { Box, Center, Loader, Text } from '@mantine/core';
import { Messages } from '.';

const RoomMessages = () => {
  const { data, isFetching, room } = useFetchMessages();

  return (
    <Box
      bg="gray.1"
      h={room.activeId ? 606 : 660}
      style={{
        borderRadius: 'var(--mantine-radius-md)',
        padding: 'var(--mantine-spacing-sm)',
      }}
    >
      {!room.activeId && (
        <Center w="100%" h="100%">
          <Text size="lg" c="gray">
            Click one of rooms
          </Text>
        </Center>
      )}

      {room.activeId && (
        <Fragment>
          <Messages initMessages={data?.messages} />

          {isFetching && (
            <Center w="100%">
              <Loader />
            </Center>
          )}
        </Fragment>
      )}
    </Box>
  );
};

export default RoomMessages;