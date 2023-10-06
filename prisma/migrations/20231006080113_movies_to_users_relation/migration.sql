-- CreateTable
CREATE TABLE "_MoviesToUsers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MoviesToUsers_AB_unique" ON "_MoviesToUsers"("A", "B");

-- CreateIndex
CREATE INDEX "_MoviesToUsers_B_index" ON "_MoviesToUsers"("B");

-- AddForeignKey
ALTER TABLE "_MoviesToUsers" ADD CONSTRAINT "_MoviesToUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MoviesToUsers" ADD CONSTRAINT "_MoviesToUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
