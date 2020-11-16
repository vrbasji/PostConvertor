import { PostConvertorPage } from './app.po';

describe('post-convertor App', function() {
  let page: PostConvertorPage;

  beforeEach(() => {
    page = new PostConvertorPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
