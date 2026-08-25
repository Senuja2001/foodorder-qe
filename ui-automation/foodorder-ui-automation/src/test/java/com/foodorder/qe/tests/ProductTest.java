package com.foodorder.qe.tests;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

import com.foodorder.qe.base.BaseTest;

public class ProductTest extends BaseTest {

    @Test
    public void verifyProductsAreDisplayed() {

        List<WebElement> products = driver.findElements(
                By.cssSelector(".product-card")
        );

        assertFalse(products.isEmpty(),
                "Products should be displayed on the page");
    }

    @Test
    public void verifyProductSearch() {

        WebElement searchInput = driver.findElement(
                By.cssSelector("input[placeholder='Search']")
        );

                searchInput.clear();
                searchInput.sendKeys("Chicken");

        List<WebElement> products = driver.findElements(
                By.cssSelector(".product-card")
        );

        assertFalse(products.isEmpty(),
                "Search should return at least one product");

                for (WebElement product : products) {
                        String productName = product.getText().toLowerCase();

                        assertTrue(
                                        productName.contains("chicken"),
                                        "Displayed product should match the search term"
                        );
                }
        }
}