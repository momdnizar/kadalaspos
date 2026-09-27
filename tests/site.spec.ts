import { test, expect } from "@playwright/test";
test.setTimeout(120_000);
test("responsive layouts have no horizontal overflow", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const width of [360, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "An all-in-one tech solution for small and growing F&Bs.",
    );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    await page.screenshot({
      path: `test-results/site-${width}.png`,
      fullPage: true,
    });
  }
  expect(errors).toEqual([]);
});
test("navigation, enquiry forms, resources and interactive billing", async ({
  page,
}) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page
    .getByRole("button", { name: "Get Started", exact: true })
    .first()
    .click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.getByLabel("Your name").fill("Alex Test");
  await page.getByLabel("Email address").fill("alex@example.com");
  await page.getByLabel("Business name").fill("Test CafÃ©");
  await page
    .getByLabel("Tell us a little more")
    .fill("One cafÃ©, looking for a billing system.");
  await page.getByRole("button", { name: "Prepare enquiry" }).click();
  await expect(page.getByText("Your enquiry is ready.")).toBeVisible();
  await expect(
    page.getByText("Nothing has been sent.", { exact: false }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await page
    .getByRole("button", { name: /ANSWERS, WITHOUT THE WAIT FAQs/ })
    .click();
  await expect(
    page.getByRole("dialog").getByRole("heading", { name: "FAQs" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Close dialog" }).click();
  const hero = page.locator("#home");
  await hero.getByLabel("Search menu items").fill("burger");
  await expect(
    hero.getByRole("button", { name: "Add Classic Burger" }),
  ).toBeVisible();
  await expect(
    hero.getByRole("button", { name: "Add Cappuccino" }),
  ).toHaveCount(0);
  await hero.getByRole("button", { name: "Add Classic Burger" }).click();
  await expect(hero.locator(".order-total")).toContainText("504.00");
  await hero.getByRole("button", { name: "Proceed to payment" }).click();
  await expect(
    hero.getByRole("button", { name: "Demo payment complete" }),
  ).toBeDisabled();
  await page.getByRole("link", { name: "Explore Product" }).click();
  await expect(page).toHaveURL(/#product$/);
});
test("carousel controls, autoplay and hover pause", async ({ page }) => {
  await page.clock.install();
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const carousel = page.locator(".carousel");
  await page.mouse.move(0, 0);
  await page.clock.fastForward(6700);
  await expect(
    carousel.getByRole("button", { name: "Smarter service", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await carousel.hover();
  await page.clock.fastForward(7000);
  await expect(
    carousel.getByRole("button", { name: "Smarter service", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Next slide" }).click();
  await expect(carousel.getByText("Good things are growing.")).toBeVisible();
  await page.getByRole("button", { name: "Previous slide" }).click();
  await carousel
    .getByRole("button", { name: "Table 01", exact: false })
    .click();
  await expect(
    carousel.getByText("Table 01 selected", { exact: false }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Show Simple billing" }).click();
  await expect(
    carousel.getByText("Let\u2019s serve something good."),
  ).toBeVisible();
  await page.getByRole("button", { name: "Pause slideshow" }).click();
  await expect(
    page.getByRole("button", { name: "Resume slideshow" }),
  ).toBeVisible();
});
test("mobile menu, partner and support actions", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "domcontentloaded" });
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
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "Become a Partner" }).click();
  await expect(
    page
      .getByRole("dialog")
      .getByRole("heading", { name: "Let\u2019s grow together." }),
  ).toBeVisible();
});
