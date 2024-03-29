import { Avatar, Box, Card, Flex, Text, Title } from '@mantine/core';

const UserHeroCard = ({ user }: { user?: IUserShort }) => {
  if (!user) {
    return null;
  }

  return (
    <Card w="100%">
      <Flex direction="row" align="center" gap="lg">
        <Box>
          <Avatar size={84} src="/user.png" />
        </Box>

        <Flex direction="column">
          <Title order={2}>{user?.name}</Title>
          <Text>{user?.email}</Text>
        </Flex>
      </Flex>
    </Card>
  );
};

export default UserHeroCard;
