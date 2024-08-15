import { IconPackage, IconMessage2, IconNotes } from '@tabler/icons';

import { uniqueId } from 'lodash';

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Apps',
  },
  {
    id: uniqueId(),
    title: 'Contacts',
    icon: IconPackage,
    chip: '2',
    chipColor: 'secondary',
    href: '/apps/contacts',
  },
  {
    id: uniqueId(),
    title: 'Chats',
    icon: IconMessage2,
    href: '/apps/chats',
  },
  {
    id: uniqueId(),
    title: 'Social Media',
    icon: IconNotes,
    href: '/apps/feed',
  },
];

export default Menuitems;
