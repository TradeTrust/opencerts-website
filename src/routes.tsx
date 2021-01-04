import { EmailSuccessPage } from "./pages/emailSuccess";
import { FaqPage } from "./pages/faq";
import { HomePageContainer } from "./pages/home";
import { MediaPage } from "./pages/media";
import { ResourcesPage } from "./pages/resources";
import { SettingsPage, SettingsAddressBookPage, SettingsAddressResolverPage } from "./pages/settings";
import { ViewerPage } from "./pages/viewer";

export const routes = [
  { path: "/", exact: true, component: HomePageContainer },
  { path: "/viewer", exact: true, component: ViewerPage },
  { path: "/faq", exact: true, component: FaqPage },
  { path: "/settings", exact: true, component: SettingsPage },
  { path: "/settings/address-resolver", exact: true, component: SettingsAddressResolverPage },
  { path: "/settings/address-book", exact: true, component: SettingsAddressBookPage },
  { path: "/email/success", exact: true, component: EmailSuccessPage },
  { path: "/resources", exact: true, component: ResourcesPage },
  { path: "/media", exact: true, component: MediaPage },
];
