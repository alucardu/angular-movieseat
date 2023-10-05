-- CreateTable
CREATE TABLE "Movie" (
    "id" SERIAL NOT NULL,
    "tmdb_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "original_title" TEXT NOT NULL,
    "poster_path" TEXT,
    "backdrop_path" TEXT,
    "release_date" TEXT,
    "overview" TEXT,
    "runtime" TEXT,
    "vote_average" INTEGER,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);
