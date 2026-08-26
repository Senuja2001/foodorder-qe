package com.foodorder.qe.tests;

import com.foodorder.qe.base.BaseTest;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class CartTest extends BaseTest {

    @Test
    public void verifyProductCanBeAddedToCart() {

        List<WebElement> addToCartButtons = driver.findElements(
                By.xpath("//button[contains(text(), 'Add to Cart')]")
        );

        assertFalse(
                addToCartButtons.isEmpty(),
                "Add to Cart button should be available"
        );

        addToCartButtons.get(0).click();
    }

    @Test
    public void verifyProductAppearsInCart() {

        List<WebElement> addToCartButtons = driver.findElements(
                By.xpath("//button[contains(text(), 'Add to Cart')]")
        );

        assertFalse(
                addToCartButtons.isEmpty(),
                "Add to Cart button should be available"
        );

        addToCartButtons.get(0).click();

        List<WebElement> cartItems = driver.findElements(
                By.cssSelector(".cart-item")
        );

        assertFalse(
                cartItems.isEmpty(),
                "Product should appear in the cart after adding"
        );
    }

    @Test
    public void verifyCartItemQuantityCanBeIncreasedAndDecreased() {

        List<WebElement> addToCartButtons = driver.findElements(
                By.xpath("//button[contains(text(), 'Add to Cart')]")
        );

        assertFalse(
                addToCartButtons.isEmpty(),
                "Add to Cart button should be available"
        );

        addToCartButtons.get(0).click();

        WebElement cartItem = driver.findElement(
                By.cssSelector(".cart-item")
        );

        WebElement increaseButton = cartItem.findElement(
                By.cssSelector("button[data-testid^='increase-']")
        );

        increaseButton.click();

        WebElement quantityElement = cartItem.findElement(
                By.cssSelector("[data-testid^='quantity-']")
        );

        int increasedQuantity = Integer.parseInt(quantityElement.getText());

        assertTrue(
                increasedQuantity > 1,
                "Quantity should increase after clicking the increase button"
        );

        WebElement decreaseButton = cartItem.findElement(
                By.cssSelector("button[data-testid^='decrease-']")
        );

        decreaseButton.click();

        quantityElement = cartItem.findElement(
                By.cssSelector("[data-testid^='quantity-']")
        );

        int decreasedQuantity = Integer.parseInt(quantityElement.getText());

        assertTrue(
                decreasedQuantity < increasedQuantity,
                "Quantity should decrease after clicking the decrease button"
        );
    }

    @Test
    public void verifyProductCanBeRemovedFromCart() {

        List<WebElement> addToCartButtons = driver.findElements(
                By.xpath("//button[contains(text(), 'Add to Cart')]")
        );

        assertFalse(
                addToCartButtons.isEmpty(),
                "Add to Cart button should be available"
        );

        addToCartButtons.get(0).click();

        List<WebElement> cartItems = driver.findElements(
                By.cssSelector(".cart-item")
        );

        assertFalse(
                cartItems.isEmpty(),
                "Product should appear in the cart"
        );

        WebElement removeButton = driver.findElement(
                By.xpath("//button[contains(text(), 'Remove')]")
        );

        removeButton.click();

        List<WebElement> remainingCartItems = driver.findElements(
                By.cssSelector(".cart-item")
        );

        assertTrue(
                remainingCartItems.isEmpty(),
                "Product should be removed from the cart"
        );
    }

    @Test
    public void verifyCartTotalIsCalculatedCorrectly() {

        WebElement firstProduct = driver.findElement(
                By.cssSelector(".product-card")
        );

        WebElement priceElement = firstProduct.findElement(
                By.cssSelector("strong")
        );

        double price = Double.parseDouble(
                priceElement.getText().replaceAll("[^0-9.]", "")
        );

        WebElement addToCartButton = firstProduct.findElement(
                By.xpath(".//button[contains(text(), 'Add to Cart')]")
        );

        addToCartButton.click();

        WebElement cartItem = driver.findElement(
                By.cssSelector(".cart-item")
        );

        WebElement quantityElement = cartItem.findElement(
                By.cssSelector("[data-testid^='quantity-']")
        );

        WebElement totalElement = driver.findElement(
                By.cssSelector("[data-testid='cart-total']")
        );

        int quantity = Integer.parseInt(
                quantityElement.getText().replaceAll("[^0-9]", "")
        );

        double actualTotal = Double.parseDouble(
                totalElement.getText().replaceAll("[^0-9.]", "")
        );

        double expectedTotal = price * quantity;

        assertEquals(
                expectedTotal,
                actualTotal,
                0.01,
                "Cart total should equal price × quantity"
        );
    }
}
