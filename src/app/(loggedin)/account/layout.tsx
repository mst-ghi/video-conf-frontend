'use client';

import { Box, Tabs } from '@mantine/core';
import { usePathname, useRouter } from 'next/navigation';
import {
  IconCalendarPlus,
  IconCube,
  IconCubePlus,
  IconUserEdit,
} from '@tabler/icons-react';

const ProfileLinks = [
  { label: 'Profile', href: '/account', icon: <IconUserEdit /> },
  {
    label: 'Own Communities',
    href: '/account/own-communities',
    icon: <IconCube />,
  },
  {
    label: 'New Community',
    href: '/account/new-community',
    icon: <IconCubePlus />,
  },
  {
    label: 'New Event',
    href: '/account/new-event',
    icon: <IconCalendarPlus />,
  },
];

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Box>
      <Tabs
        mb="xl"
        w="100%"
        variant="outline"
        value={pathname}
        onChange={(value) => value && router.push(value)}
      >
        <Tabs.List>
          {ProfileLinks.map((link) => {
            return (
              <Tabs.Tab
                key={`profile-link-${link.href}`}
                value={link.href}
                leftSection={link.icon}
              >
                {link.label}
              </Tabs.Tab>
            );
          })}
        </Tabs.List>
      </Tabs>

      {children}
    </Box>
  );
}
