import { ChartTheStockMarketPage } from './app.po';

describe('chart-the-stock-market App', function() {
  let page: ChartTheStockMarketPage;

  beforeEach(() => {
    page = new ChartTheStockMarketPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
