import { newSpecPage } from '@stencil/core/testing';
import { CountTo } from '../count-to';

describe('count-to', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CountTo],
      html: `<count-to></count-to>`,
    });
    expect(page.root).toEqualHtml(`
      <count-to>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </count-to>
    `);
  });
});
