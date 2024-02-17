-- CreateTable
CREATE TABLE "practice_guide" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "content" TEXT,
    "publication_date" TIMESTAMP(3),
    "author_id" INTEGER NOT NULL,

    CONSTRAINT "practice_guide_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "author" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "organization" TEXT,

    CONSTRAINT "author_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "practice_guide_title_key" ON "practice_guide"("title");

-- CreateIndex
CREATE UNIQUE INDEX "author_email_key" ON "author"("email");

-- AddForeignKey
ALTER TABLE "practice_guide" ADD CONSTRAINT "practice_guide_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "author"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
