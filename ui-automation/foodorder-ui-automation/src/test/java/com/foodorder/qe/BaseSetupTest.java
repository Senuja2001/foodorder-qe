package com.foodorder.qe;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import org.junit.jupiter.api.Test;

import com.foodorder.qe.base.BaseTest;

public class BaseSetupTest extends BaseTest {

    @Test
    public void verifyBrowserAndApplicationOpen() {
        assertNotNull(driver);
        System.out.println("Page Title: " + driver.getTitle());
    }
}
