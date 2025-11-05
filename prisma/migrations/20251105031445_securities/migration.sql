-- CreateTable
CREATE TABLE "Security" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ticker" TEXT NOT NULL,
    "isin" TEXT NOT NULL,
    "cusip" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "assetClass" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Price" (
    "securityId" TEXT NOT NULL,
    "asOf" DATETIME NOT NULL,
    "value" REAL NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',

    PRIMARY KEY ("securityId", "asOf"),
    CONSTRAINT "Price_securityId_fkey" FOREIGN KEY ("securityId") REFERENCES "Security" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Position" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "portfolioId" TEXT NOT NULL,
    "securityId" TEXT NOT NULL,
    "quantity" REAL NOT NULL,
    "marketValue" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Position_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolio" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Position_securityId_fkey" FOREIGN KEY ("securityId") REFERENCES "Security" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Position" ("createdAt", "id", "marketValue", "portfolioId", "quantity", "securityId", "updatedAt") SELECT "createdAt", "id", "marketValue", "portfolioId", "quantity", "securityId", "updatedAt" FROM "Position";
DROP TABLE "Position";
ALTER TABLE "new_Position" RENAME TO "Position";
CREATE INDEX "Position_portfolioId_idx" ON "Position"("portfolioId");
CREATE INDEX "Position_securityId_idx" ON "Position"("securityId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Security_ticker_key" ON "Security"("ticker");

-- CreateIndex
CREATE UNIQUE INDEX "Security_isin_key" ON "Security"("isin");

-- CreateIndex
CREATE UNIQUE INDEX "Security_cusip_key" ON "Security"("cusip");

-- CreateIndex
CREATE INDEX "Price_asOf_idx" ON "Price"("asOf");

-- CreateIndex
CREATE INDEX "Price_currency_idx" ON "Price"("currency");
