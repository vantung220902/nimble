import { GoogleCrawlerOption } from '@modules/crawler/crawler.enum';
import { CrawledGoogleResponse } from '@modules/crawler/interfaces';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { Browser, Page } from 'puppeteer';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import UserAgent from 'user-agents';
puppeteer.use(StealthPlugin());

@Injectable()
export class CrawlerService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(CrawlerService.name);

  private browser: Browser;

  public async crawlGoogle(keyword: string): Promise<CrawledGoogleResponse> {
    if (!this.browser) {
      throw new InternalServerErrorException('Cannot launch browser!');
    }

    const generateUserAgent = new UserAgent();

    const page = await this.browser.newPage();

    try {
      await page.setUserAgent(generateUserAgent.toString());
      await page.setViewport(GoogleCrawlerOption.viewPort);
      await page.setExtraHTTPHeaders({
        'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
      });

      await page.goto(GoogleCrawlerOption.link, {
        waitUntil: 'networkidle2',
      });

      await this.detectCaptcha(page);

      await this.resolveCookieButton(page);

      await this.typeKeywordIntoSearchField(page, keyword);

      try {
        await page.waitForSelector(GoogleCrawlerOption.selector);
      } catch (selectorError) {
        await this.detectCaptcha(page);

        throw selectorError;
      }

      await page.evaluate(
        () =>
          new Promise((resolve) =>
            setTimeout(resolve, 2000 + Math.random() * 3000),
          ),
      );

      const [ads, links, htmlContent] = await Promise.all([
        page.$$eval(GoogleCrawlerOption.primaryAdElement, (adElements) =>
          adElements.map((ad) => ad.innerHTML),
        ),
        page.$$eval('a', (linkElements) =>
          linkElements.map((link) => link.href),
        ),
        page.content(),
      ]);

      await page.close();

      return {
        content: htmlContent,
        totalAds: ads.length,
        totalLinks: links.length,
      };
    } catch (error) {
      await page.close();
      this.logger.error(`CrawlerService crawlGoogle Error: ${error}`);
      throw new InternalServerErrorException(
        `Crawl ${keyword} keyword failed: ${error.message}`,
      );
    }
  }

  async onModuleDestroy() {
    if (this.browser) {
      await this.browser.close();
    }
  }

  async onModuleInit() {
    this.browser = await puppeteer.launch({
      headless: 'new',
      args: ['--disable-setuid-sandbox'],
      ignoreHTTPSErrors: true,
    });
  }

  private async detectCaptcha(page: Page) {
    const isCaptchaPresent = await page.evaluate(
      () =>
        document.querySelector('form[action*="captcha"]') !== null ||
        document.querySelector('.g-recaptcha') !== null,
    );
    if (isCaptchaPresent) {
      this.logger.warn('CAPTCHA detected!');
      await page.close();
      throw new InternalServerErrorException('Google CAPTCHA detected');
    }
  }

  private async resolveCookieButton(page: Page) {
    const acceptCookieButton = await page.$(
      GoogleCrawlerOption.cookieButtonElement,
    );
    if (acceptCookieButton) {
      await acceptCookieButton.click();
      await page.evaluate(
        () =>
          new Promise((resolve) =>
            setTimeout(resolve, 2000 + Math.random() * 1000),
          ),
      );
    }
  }

  private async typeKeywordIntoSearchField(page: Page, keyword: string) {
    for (const char of keyword) {
      await page.type(GoogleCrawlerOption.searchInputElement, char, {
        delay: 50 + Math.random() * 150,
      });
      await page.evaluate(
        () =>
          new Promise((resolve) =>
            setTimeout(resolve, 10 + Math.random() * 50),
          ),
      );
    }

    await page.keyboard.press('Enter');
  }
}
