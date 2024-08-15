import ddIcon1 from 'src/assets/images/svgs/icon-dd-chat.svg';
import ddIcon5 from 'src/assets/images/svgs/icon-dd-mobile.svg';

const notifications = [];
const profile = [];
const appsLink = [
  {
    href: '/apps/chats',
    title: 'Chat Application',
    subtext: 'Messages & Emails',
    avatar: ddIcon1,
  },

  {
    href: '/apps/contacts',
    title: 'Contact Application',
    subtext: 'Account settings',
    avatar: ddIcon5,
  },
  {
    href: '/apps/feed',
    title: 'Feeds',
    subtext: 'Social media',
    avatar: ddIcon5,
  },
];

const pageLinks = [];

export { notifications, profile, pageLinks, appsLink };
