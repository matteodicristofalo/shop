import { mergeTests } from "@playwright/test";
import { nextFixture } from "./next";
import { shopifyFixture } from "./shopify";
import { pageObjectsFixture } from "./page-objects";

export const test = mergeTests(pageObjectsFixture, nextFixture, shopifyFixture);
