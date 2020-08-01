# Hacker News Client

A simple [Hacker News](https://news.ycombinator.com/) client built with Angular.

[Visit the site!](https://hackernews.mattmorton.info)

## Details

- Pulls data from the [Hacker News API](https://github.com/HackerNews/API)
- Includes @angular/pwa implementation
- Bootstrap styling - mobile responsive

## Build

1. Create an environment.ts and environment.prod.ts file in src/environments and populate with firebase config for analytics to work.
2. Run `ng build` to build the project. The build artifacts will be stored in the `dist/hn-client` directory. Use the `--prod` flag for a production build.