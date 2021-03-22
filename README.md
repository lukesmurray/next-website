# NextJS + Markdown + Prisma + Graphql

This is a proof of concept static blogging concept which parses markdown files into a sqlite database and serves those files using graphql and next js.

## Proof of Concept Almost Done

## Backend Architecture Decisions

- The file parsing is contained in [`./lib/fileTreeParser.ts`](./lib/fileTreeParser.ts).
- Files are added to the database in [`./prisma/seed.ts`](./prisma/seed.ts)
- The database schema is defined in [`/prisma/schema.prisma`](./prisma/schema.prisma)
  - This means the Page type is duplicated in the parsing and schema but that's alright for now
- The graphql api is exposed in [`./pages/api/graphql.ts`](./pages/api/graphql.ts)
  - The graphql server is an apollo server and the playground can be viewed at `/api/graphql` in a browser during local development and in deployment
  - The graphql schema is created from the prisma schema using [typegraphql-prisma](https://www.npmjs.com/package/typegraphql-prisma) integration
    - The final graphql schema is written to [`./prisma/schema.gql`](./prisma/schema.gql)
- Graphql types are automatically generated for the graphql queries using [graphql-codegenerator](http://graphql-code-generator.com/)

## Front End Decisions

- All pages are routed through a file [`[[...slug]].tsx`](./pages/[[...slug]].tsx).
  - This is a very flexible way of defining content since all pages are run through the same code
  - Any page can be overriden by creating a page for it's slug
  - For example blog pages could be overriden by creating a page `blog/[[...slug]].tsx`
- The pages are styled with `emotion` and `twin.macro`
- We use mdx (from [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote)) to parse the markdown into mdx
  - in order to place images next to markdown we use webpack file-loader and require the images dynamically in the mdx components
    - see [this stack overflow post](https://stackoverflow.com/a/65681762/11499360) for instructions

## Development

- `yarn generate` to generate content and graphql schema types
- `yarn generate:watch` to generate content and graphql schema code in watch mode
- `yarn dev` to start the next js dev server (in watch mode)

Most of the time you want to run `yarn generate:watch` and `yarn dev` in separate terminals.

## Todos

- hot reloading
  - when you edit prisma.schema `prisma/schema.gql` should update but it doesn't since it only updates when the server changes and the server is a singleton. We can use chokidar to watch files and update schema.gql when the prisma schema changes
  - would be nice to run all code through one command but it doesn't work because the generated types sometimes don't get generated and next breaks. Have to restart next separately. The solution is to run `yarn dev` and `yarn watch` in two terminals
  - upadting markdown content uses [next-remote-watch](https://github.com/hashicorp/next-remote-watch). but next-remote-watch is broken on dev and we really don't need to seed the whole database we could update individual pages
