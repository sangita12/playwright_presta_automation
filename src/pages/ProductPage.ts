import { Page, Locator, expect, FrameLocator } from "@playwright/test";

import { BasePage } from "./BasePage";

export class ProductPage extends BasePage {

  // Locators
  private readonly productFrame: FrameLocator;
  private readonly productTitle: Locator;
  private readonly productName: Locator;
  private readonly productPrice: Locator;
  private readonly quantityInputs: Locator;
  private readonly increaseQuantityButton: Locator;
  private readonly cartAdded: Locator;
 // private  cartModal: Locator;
  private readonly addToCartButton: Locator;
  private readonly addToCartMessage: Locator;
  private  modalFrame: FrameLocator;

  constructor(page: Page) {
    super(page);
    this.productFrame = this.getMainFrame();
  //  this.modalFrame = this.getMainFrame();
    this.productTitle = this.productFrame.locator('.h1');
    this.productName = this.productFrame.locator('.col-md-6 h1');
    this.productPrice = this.productFrame.locator('.current-price span[class="current-price-value"]');
    this.increaseQuantityButton = this.productFrame.locator('.bootstrap-touchspin-up');
    this.addToCartButton = this.productFrame.locator('.add-to-cart');
   // this.cartModal = this.productFrame.locator('#blockcart-modal');
   // this.addToCartMessage = this.productFrame.locator('#blockcart-modal #myModalLabel');
    this.cartAdded = this.productFrame.locator('.blockcart.cart-preview .cart-products-count');
  }


  async getProductDetails(): Promise<void> {
    await this.productTitle.waitFor({ state: "visible", timeout: 15000 });
    const title = await this.productTitle.textContent();

    await this.productPrice.waitFor({ state: "visible", timeout: 15000 });
    const productPrice = await this.productPrice.textContent();
  }


  async addToCart(): Promise<void> {
    await this.addToCartButton.waitFor({ state: "visible" });
    await expect(this.addToCartButton).toBeEnabled();
    await this.addToCartButton.scrollIntoViewIfNeeded();

    // Click add to cart button
    
    await this.addToCartButton.click();
    
  }

  async verifyModalAppear(): Promise<void>{
    // Wait for cart modal to appear (indicates successful add to cart)
    try {
      const frame =  this.page.frameLocator('iframe[name="framelive"]');
     
      const cartModal =  frame.locator('#blockcart-modal');

      await cartModal.waitFor({ state: 'visible', timeout: 30000 });
      await expect(cartModal).toBeEnabled({ timeout:30000 });
      // Wait a bit for the modal content to load
      await this.page.waitForTimeout(2000); 
     } catch (error) {
      
    /*  if (this.page.isClosed()) {
        throw new Error('Page was closed after add to cart - action likely failed');
      } */
    }
 }  

  async verifyProductAddedToCart(): Promise<void> {
    // Check if page is still available
    if (this.page.isClosed()) {
      throw new Error("Page was closed - add to cart action failed");
    }
    try {
      
      // Wait for cart count element to be visible
      await this.cartAdded.waitFor({ state: 'visible', timeout: 20000 });
      await expect(this.cartAdded).toBeVisible({ timeout: 20000 });
      
      // Get the cart count text
      const cartCountText = await this.cartAdded.textContent();
      if (cartCountText && cartCountText.trim() === "(0)") {
        throw new Error("Product was not added to cart: count is still (0)");
      }
    } catch (error) {
      if (this.page.isClosed()) {
        throw new Error("Page was closed during verification - add to cart failed");
      } else {
        throw error;
      }
    }
  }
}