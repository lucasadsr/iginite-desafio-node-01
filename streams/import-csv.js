import fs from 'node:fs'
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'csv-parse';

const __dirname = dirname(fileURLToPath(import.meta.url));

const processFile = async () => {
  const parser = fs.
    createReadStream(`${__dirname}/data.csv`)
    .pipe(parse({
      fromLine: 2
    }))

  for await (const record of parser) {
    const [title, description] = record

    await fetch('http://localhost:3333/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        description
      })
    })
  }
}

await processFile()