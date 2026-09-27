import { test, expect } from "@playwright/test";
test.setTimeout(120_000);

test("responsive hero and demo have no overflow", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const width of [360, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 960 });
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Best in pricing.",
    );
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Powerful in functions.",
    );
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Simple by design.",
    );
    await expect(page.getByText("Just experience it below.")).toBeVisible();
    for (const tab of ["Billing", "Tables", "Inventory", "Reports", "Orders"]) {
      await page.getByRole("tab", { name: tab, exact: true }).click();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
    }
    await page.getByRole("tab", { name: "Billing", exact: true }).click();
    await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
    await page.screenshot({ path: `test-results/hero-${width}.png` });
    await page.screenshot({
      path: `test-results/page-${width}.png`,
      fullPage: true,
    });
  }
  expect(errors).toEqual([]);
});

test("try opens the demo immediately, with optional keyboard-accessible walkthrough", async ({
  page,
}) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page
    .locator("#home")
    .getByRole("button", { name: "Try Kadalas POS" })
    .click();
  await expect(page.locator("#demo")).toBeFocused();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await page.getByRole("button", { name: "See How It Works" }).click();
  await expect(page.getByText("01 · Make a sale")).toBeVisible();
  await page.getByRole("button", { name: "Next", exact: true }).click();
  await expect(
    page.getByRole("tab", { name: "Tables", exact: true }),
  ).toHaveAttribute("aria-selected", "true");
  await page.getByRole("button", { name: "Next", exact: true }).click();
  await expect(
    page.getByRole("tab", { name: "Reports", exact: true }),
  ).toHaveAttribute("aria-selected", "true");
  await page.getByRole("button", { name: "Explore freely" }).click();
  await expect(page.locator(".live-tour")).toHaveCount(0);
  await page.getByRole("tab", { name: "Reports", exact: true }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(
    page.getByRole("tab", { name: "Orders", exact: true }),
  ).toBeFocused();
  await expect(
    page.getByRole("tab", { name: "Orders", exact: true }),
  ).toHaveAttribute("aria-selected", "true");
});

test("sales update inventory, orders and reports; reset restores the demo", async ({
  page,
}) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.getByLabel("Search menu items").fill("burger");
  await expect(
    page.getByRole("button", { name: "Add Cappuccino", exact: true }),
  ).toHaveCount(0);
  await page
    .getByRole("button", { name: "Add Classic Burger", exact: true })
    .click();
  await expect(page.locator(".live-total")).toContainText("504.00");
  await page.getByRole("button", { name: "Complete demo sale" }).click();
  await expect(page.getByRole("status")).toContainText("Sale #1042 complete");
  await expect(
    page.getByRole("button", { name: "Complete demo sale" }),
  ).toBeDisabled();
  await page.getByRole("tab", { name: "Inventory", exact: true }).click();
  const coffee = page
    .locator(".live-stock-row")
    .filter({ hasText: "Cappuccino" });
  await expect(coffee).toContainText("23 in stock");
  await coffee.getByRole("button", { name: "Restock Cappuccino" }).click();
  await expect(coffee).toContainText("33 in stock");
  await page.getByRole("tab", { name: "Reports", exact: true }).click();
  await expect(page.locator(".live-stats")).toContainText("1,302.00");
  await page.getByRole("tab", { name: "Orders", exact: true }).click();
  const order = page.locator(".live-order-card").filter({ hasText: "#1042" });
  await expect(order).toContainText("3 items");
  await order.getByRole("button", { name: "Mark ready" }).click();
  await order.getByRole("button", { name: "Mark served" }).click();
  await expect(
    order.getByRole("button", { name: "Served", exact: true }),
  ).toBeDisabled();
  await page.getByRole("button", { name: "Reset demo" }).click();
  await expect(page.locator(".live-total")).toContainText("273.00");
  await page.getByLabel("Search menu items").fill("no-match");
  await page.getByRole("button", { name: "Reset demo" }).click();
  await expect(page.getByLabel("Search menu items")).toHaveValue("");
  await expect(
    page.getByRole("button", { name: "Add Cappuccino", exact: true }),
  ).toBeVisible();
  await page.getByRole("tab", { name: "Reports", exact: true }).click();
  await expect(page.locator(".live-stats")).toContainText("798.00");
});

test("table selection preserves a cart and stock cannot be oversold", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page
    .getByRole("button", { name: "Add Chocolate Cake", exact: true })
    .click({ clickCount: 3, delay: 100 });
  await expect(
    page.getByRole("button", { name: "Add Chocolate Cake", exact: true }),
  ).toBeDisabled();
  await page.getByRole("tab", { name: "Tables", exact: true }).click();
  await page.getByRole("button", { name: "Select Table 03" }).click();
  await expect(page.locator(".live-cart-heading")).toContainText("Table 03");
  await expect(page.locator(".live-cart")).toContainText("Chocolate Cake");
  await page.getByRole("button", { name: "Complete demo sale" }).click();
  await page.getByRole("tab", { name: "Inventory", exact: true }).click();
  await expect(
    page.locator(".live-stock-row").filter({ hasText: "Chocolate Cake" }),
  ).toContainText("0 in stock");
});

test("pricing, resources, mobile menu and support still work after the demo", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.getByRole("button", { name: "Get pricing" }).click();
  await page.getByLabel("Your name").fill("Alex Test");
  await page.getByLabel("Email address").fill("alex@example.com");
  await page.getByLabel("Business name").fill("Test Cafe");
  await page
    .getByLabel("Tell us a little more")
    .fill("Pricing for one outlet.");
  await page.getByRole("button", { name: "Prepare enquiry" }).click();
  await expect(page.getByText("Your enquiry is ready.")).toBeVisible();
  await page.keyboard.press("Escape");
  await page
    .getByRole("button", { name: /ANSWERS, WITHOUT THE WAIT FAQs/ })
    .click();
  await expect(
    page.getByRole("dialog").getByRole("heading", { name: "FAQs" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "Open menu" }).click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "Support" })
    .click();
  await expect(page).toHaveURL(/#support$/);
  await expect(
    page.getByRole("navigation", { name: "Mobile navigation" }),
  ).toHaveCount(0);
  await page
    .getByRole("button", { name: "Contact Support", exact: true })
    .click();
  await expect(
    page.getByRole("dialog").getByRole("heading", { name: "How can we help?" }),
  ).toBeVisible();
});
