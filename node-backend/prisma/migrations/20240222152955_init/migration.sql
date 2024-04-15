-- CreateTable
CREATE TABLE "agent" (
    "id" SERIAL NOT NULL,
    "agentName" TEXT,
    "businessRegistrationNumber" TEXT,
    "agentAddress" TEXT,
    "agentTelephone" INTEGER NOT NULL,
    "agentEmail" TEXT,
    "agentUsername" TEXT,
    "agentPassword" TEXT,

    CONSTRAINT "agent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vendor" (
    "id" SERIAL NOT NULL,
    "nic" TEXT NOT NULL,
    "vendor_name" TEXT,
    "vendor_address" TEXT,
    "agent_id" INTEGER NOT NULL,

    CONSTRAINT "vendor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "purchaser" (
    "id" SERIAL NOT NULL,
    "nic" TEXT NOT NULL,
    "purchaser_name" TEXT,
    "purchaser_address" TEXT,
    "dob" TIMESTAMP(3) NOT NULL,
    "is_first_property" BOOLEAN NOT NULL,
    "is_sri_lankan_resident" BOOLEAN NOT NULL,
    "is_company" BOOLEAN NOT NULL,
    "agent_id" INTEGER NOT NULL,

    CONSTRAINT "purchaser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transaction" (
    "id" SERIAL NOT NULL,
    "property_address" TEXT,
    "type" TEXT NOT NULL,
    "consideration" DECIMAL(65,30) NOT NULL,
    "effective_date" TIMESTAMP(3) NOT NULL,
    "vendor_id" INTEGER NOT NULL,
    "purchaser_id" INTEGER NOT NULL,

    CONSTRAINT "transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "return" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "tax_due" DECIMAL(65,30) NOT NULL,
    "submit_date" TIMESTAMP(3) NOT NULL,
    "deadline_date" TIMESTAMP(3) NOT NULL,
    "is_penalty_added" BOOLEAN NOT NULL,
    "status" TEXT NOT NULL,
    "transaction_id" INTEGER NOT NULL,
    "agent_id" INTEGER NOT NULL,

    CONSTRAINT "return_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment" (
    "id" SERIAL NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "status" TEXT NOT NULL,
    "paid_date" TIMESTAMP(3) NOT NULL,
    "return_id" INTEGER NOT NULL,

    CONSTRAINT "payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "penalty" (
    "id" SERIAL NOT NULL,
    "reason" TEXT,
    "amount" DECIMAL(65,30) NOT NULL,
    "imposed_date" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "return_id" INTEGER NOT NULL,

    CONSTRAINT "penalty_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "agent_businessRegistrationNumber_key" ON "agent"("businessRegistrationNumber");

-- CreateIndex
CREATE UNIQUE INDEX "agent_agentEmail_key" ON "agent"("agentEmail");

-- CreateIndex
CREATE UNIQUE INDEX "agent_agentUsername_key" ON "agent"("agentUsername");

-- CreateIndex
CREATE UNIQUE INDEX "vendor_nic_key" ON "vendor"("nic");

-- CreateIndex
CREATE UNIQUE INDEX "purchaser_nic_key" ON "purchaser"("nic");

-- CreateIndex
CREATE UNIQUE INDEX "return_transaction_id_key" ON "return"("transaction_id");

-- CreateIndex
CREATE UNIQUE INDEX "payment_return_id_key" ON "payment"("return_id");

-- AddForeignKey
ALTER TABLE "vendor" ADD CONSTRAINT "vendor_agent_id_fkey" FOREIGN KEY ("agent_id") REFERENCES "agent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchaser" ADD CONSTRAINT "purchaser_agent_id_fkey" FOREIGN KEY ("agent_id") REFERENCES "agent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_vendor_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "vendor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_purchaser_id_fkey" FOREIGN KEY ("purchaser_id") REFERENCES "purchaser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "return" ADD CONSTRAINT "return_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "return" ADD CONSTRAINT "return_agent_id_fkey" FOREIGN KEY ("agent_id") REFERENCES "agent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_return_id_fkey" FOREIGN KEY ("return_id") REFERENCES "return"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "penalty" ADD CONSTRAINT "penalty_return_id_fkey" FOREIGN KEY ("return_id") REFERENCES "return"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
