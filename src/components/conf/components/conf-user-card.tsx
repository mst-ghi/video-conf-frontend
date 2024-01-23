import { Avatar, Card, CardProps, Center, Text } from '@mantine/core';

interface ConfUserCardProps extends CardProps {
  name?: string;
  avatar?: string;
}

const ConfUserCard = ({
  name,
  avatar,
  h = 120,
  w = '100%',
  ...props
}: ConfUserCardProps) => {
  return (
    <Card h={h} w={w} {...props}>
      <Center
        h="100%"
        style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
      >
        <Avatar size="lg" src={avatar} />
        {name && (
          <Text c="gray.7" size="sm" fw={500}>
            {name}
          </Text>
        )}
      </Center>
    </Card>
  );
};

export default ConfUserCard;
