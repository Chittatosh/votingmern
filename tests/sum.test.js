import sum from './index';

test('adds 1 + 2 to equal 3', () => {
  expect(sum(2, 4)).toBe(6);
});

/*
import http from 'http';
import fetch from 'cross-fetch';

const url = 'http://localhost:3000';

test('http 200', done => {
  http.get(url, res => {
    expect(res.statusCode).toBe(200);
    done();
  });
});

test('status 200 Promise', () => {
  expect.assertions(1);
  return fetch(url)
    .then(res => {
      expect(res.status).toBe(200);
    });
});

test('status 200 resolves ', () => {
  expect.assertions(1);
  return expect(fetch(url).then(res => res.status)).resolves.toBe(200);
});

test('status 200 async/await', async () => {
  expect.assertions(1);
  const res = await fetch(url);
  expect(res.status).toBe(200);
});

test('status 200 async/await with resolves', async () => {
  expect.assertions(1);
  await expect(fetch(url).then(res => res.status)).resolves.toBe(200);
});
*/
