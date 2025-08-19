import { Page, Locator, expect, FrameLocator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage{

    // Locators
    private readonly productFrame: FrameLocator;
    private readonly productTitle: Locator;
    private readonly product: Locator;
    private readonly firstFeaturedProduct: Locator;
  
    

    constructor(page: Page){
    super(page);
    this.productFrame = this.getMainFrame();
    this.product = this.productFrame.locator('.product-title a');
    this.firstFeaturedProduct = this.productFrame.locator('.js-product, .product-miniature, .product-item');
   
    }

    async openFirstProduct() {
    const firstProduct = this.product.first();
    await firstProduct.waitFor({state: "visible", timeout: 15000});
    await firstProduct.click();
 }

 async clickFirstProduct(){
    const firstProduct = this.firstFeaturedProduct.first();
    await firstProduct.waitFor({state: "visible", timeout: 15000});
    await firstProduct.click();
 }
}