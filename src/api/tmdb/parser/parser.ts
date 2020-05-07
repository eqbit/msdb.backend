import lineReader from 'line-reader';
import fs from 'fs';

interface Movie {
  adult: boolean;
  id: number;
  original_title: string;
  popularity: number;
  video: boolean;
}


export const parser = () => {
  const MIN_POPULARITY = 15;
  const movies: Movie[] = [];
  const startTime = new Date().getTime();
  
  const parserLogic = (line: string, last: boolean): any => {
    const movie: Movie = JSON.parse(line);
    
    if (movie.popularity >= MIN_POPULARITY) {
      if (/^([a-zA-Z0-9 _-]+)$/.test(movie.original_title)) {
        movies.push(movie);
      }
    }
    
    if (last) {
      fs.writeFile(
        `${__dirname}/../output/output.json`,
        JSON.stringify(movies, null, ' '),
        (err) => {
          console.error(err);
        }
      );
      
      const endTime = new Date().getTime();
      console.log(`Done in ${Math.floor((endTime - startTime) / 100) / 10} seconds`);
      
      return false;
    }
  };
  
  const errorHandler = (error: Error) => {
    console.error(error);
  };
  
  lineReader.eachLine(`${__dirname}/../source/source.json`, parserLogic as any, errorHandler as any);
};
