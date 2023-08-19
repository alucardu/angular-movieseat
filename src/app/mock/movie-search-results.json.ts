export interface IResult {
  description: string,
  director: string,
  poster_path: string,
  score: number,
  release_year: number,
  title: string,
}

export const searchResults: IResult[] = [
  {
    title: 'Mission: Impossible – Dead Reckoning Part One',
    description: 'Ethan Hunt and his IMF team embark on their most dangerous mission yet: To track down a terrifying new weapon that threatens all of humanity before it falls into the wrong hands. With control of the future and the worlds fate at stake and dark forces from Ethans past closing in, a deadly race around the globe begins. Confronted by a mysterious, all-powerful enemy, Ethan must consider that nothing can matter more than his mission—not even the lives of those he cares about most.',
    director: 'C. McQuarrie',
    poster_path: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/NNxYkU70HPurnNCSiCjYAmacwm.jpg',
    score: 54,
    release_year: 2023
  },
  {
    title: 'Mission: Impossible – Ghost Protocol',
    description: 'When an IMF mission ends badly, the world is faced with dire consequences. As Ethan Hunt takes it upon himself to fulfill his original briefing, the CIA begin to question his loyalty and his motives. The IMF team find themselves in a race against time, hunted by assassins while trying to prevent a global catastrophe.',
    director: 'C. McQuarrie',
    poster_path: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/NNxYkU70HPurnNCSiCjYAmacwm.jpg',
    score: 73,
    release_year: 2019
  },
  {
    title: 'Mission: Impossible – Rogue Nation',
    description: 'Ethan Hunt and his team are racing against time to track down a dangerous terrorist named Hendricks, who has gained access to Russian nuclear launch codes and is planning a strike on the United States. An attempt to stop him ends in an explosion causing severe destruction to the Kremlin and the IMF to be implicated in the bombing, forcing the President to disavow them. No longer being aided by the government, Ethan and his team chase Hendricks around the globe, although they might still be too late to stop a disaster.',
    director: 'C. McQuarrie',
    poster_path: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/psiWp3VTjznfokmGQG9uqiiknQQ.jpg',
    score: 95,
    release_year: 2018
  },
]
