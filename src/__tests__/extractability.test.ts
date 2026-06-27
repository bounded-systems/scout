import { test } from "bun:test";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { assertSeam } from "@bounded-systems/seam-check";

const SRC = resolve(dirname(fileURLToPath(import.meta.url)), "..");

// scout: content-addressed surface reads (file/grep/files) with anchored-chain
// provenance. Prod files touch node:fs/path and the cas + anchored-chain
// substrates only. The harness proves that edge and the no-ambient thesis.
test("@bounded-systems/scout upholds its seam claim", () => {
  assertSeam({
    root: SRC,
    prod: ["node:fs", "node:path", "@bounded-systems/cas", "@bounded-systems/anchored-chain"],
    test: [
      "@bounded-systems/scout",
      "@bounded-systems/seam-check",
      "@bounded-systems/anchored-chain-sqlite",
    ],
  });
});
