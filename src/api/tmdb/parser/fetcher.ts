import request from 'request-promise';
import fs from 'fs';
import gunzip from 'gunzip-file';

export const fetcher = async () => {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  
  const day = date.getDay() > 9 ? date.getDay() : `0${date.getDay()}`;
  const month = date.getMonth() > 9 ? date.getMonth() : `0${date.getMonth()}`;
  
  const dateString = `${day}_${month}_${date.getFullYear()}`;
  const url = `http://files.tmdb.org/p/exports/movie_ids_${dateString}.json.gz`;
  
  const res = await request({
    uri: url,
    gzip: true,
    resolveWithFullResponse: true,
    encoding: null
  });
  
  await fs.writeFile(`${__dirname}/source/source.json.gz`, res.body, (e) => {
    if (e) {
      console.log(e);
    }
  });
  
  gunzip(`${__dirname}/source/source.json.gz`, `${__dirname}/source/source.json`, () => {
    console.log('done');
  });
};
