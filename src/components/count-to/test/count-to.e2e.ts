import { newE2EPage } from '@stencil/core/testing';

describe('count-to', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<count-to></count-to>');

    const element = await page.find('count-to');
    expect(element).toHaveClass('hydrated');
  });
});
