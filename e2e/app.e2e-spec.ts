import { UserServicesPage } from './app.po';

describe('user-services App', () => {
  let page: UserServicesPage;

  beforeEach(() => {
    page = new UserServicesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
