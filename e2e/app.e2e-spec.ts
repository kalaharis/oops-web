import { OopsWebsitePage } from './app.po';

describe('oops-website App', () => {
  let page: OopsWebsitePage;

  beforeEach(() => {
    page = new OopsWebsitePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
