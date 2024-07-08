# Storj Docs

Source code for <https://storj.dev>

The docs are built using [Tailwind CSS](https://tailwindcss.com) and [Next.js](https://nextjs.org).

## Contributing

If you're interested in contributing to Storj docs, please start by reading our CONTRIBUTING.md guide.

## Running docs locally

To get started, first install the npm dependencies:

```bash
npm install
```

Next, run the development server:

```bash
npm run dev
```

Finally, open <http://localhost:3000> in your browser to view the website.

## Customizing

You can start editing by modifying the files in the `/src` folder. The site will auto-update as you edit these files.

## Global search

The docs include a global search that's powered by the [FlexSearch](https://github.com/nextapps-de/flexsearch) library. It's available by clicking the search input or by using the `⌘K` shortcut.

This feature requires no configuration, and works out of the box by automatically scanning your documentation pages to build its index. You can adjust the search parameters by editing the `/src/markdoc/search.mjs` file.

## Learn more

To learn more about the technologies used in this site template, see the following resources:

- [Tailwind UI](https://tailwindui.com) base site template
- [Tailwind CSS](https://tailwindcss.com/docs) - the official Tailwind CSS documentation
- [Next.js](https://nextjs.org/docs) - the official Next.js documentation
- [Headless UI](https://headlessui.dev) - the official Headless UI documentation
- [Markdoc](https://markdoc.io) - the official Markdoc documentation
- [Algolia Autocomplete](https://www.algolia.com/doc/ui-libraries/autocomplete/introduction/what-is-autocomplete/) - the official Algolia Autocomplete documentation
- [FlexSearch](https://github.com/nextapps-de/flexsearch) - the official FlexSearch documentation
