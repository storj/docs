# Contributing to Storj Documentation

We welcome contributions to the Storj documentation! Please take a moment to read through these guidelines before submitting your pull request (PR).

## Submitting a PR

To contribute, please follow these steps:

- Fork the repository.
- Create a new branch for your changes.
- Make your changes following the guidelines below.
- Commit your changes.
- Open a PR against the main repository.

Please provide a clear and descriptive summary of your changes in the PR.

## Guidelines

To ensure your PR is accepted, please adhere to the following guidelines.

### Markdown

Storj's documentation is written using Markdown. See Github's [basic markdown guide](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)

### Directory Structure and file naming

The directory structure of the documentation follows Next.js [app directory routing](https://nextjs.org/docs/app/building-your-application/routing/defining-routes) conventions. This means that the URL path for a page corresponds to its location in the directory structure.

For example, a page located at `dcs/guide/page.md` would be accessible at `https://storj.dev/docs/guide`.

Every documentation page must be named `page.md`.

### Frontmatter

The front matter is a section at the beginning of each Markdown file (page.md) that contains metadata about the page. It's enclosed between two triple-dash lines (---). Here's an explanation of each field in the front matter:

**title:** The title of the article or page. This is typically displayed at the top of the page.

**docId:** A unique identifier for the document. This can be used for internal tracking and linking. See [Internal Linking](/CONTRIBUTING.md#internal-linking). If you're making a new page, generate a new unique ID with `pwgen -1 16` or something similar.

`docid` Recommendations:
- Online password generators such as [https://pwgen.io/](https://pwgen.io/) work well.
- A length of 16 characters is preferred
- Avoid special characters or symbols. Use only UPPER, lower and numbers (0-9).

**redirects:** A list of URLs that should redirect to this page. This is useful for maintaining links when a page's URL changes or for creating aliases for a page.

**metadata:**

&nbsp;&nbsp;**title:** The text that should be displayed in the browser's title bar for this page.

&nbsp;&nbsp;**description:** A brief summary or overview of the page's content. This description can be used in search results and previews.

The metadata fields are converted to a nextjs export. Additional metadata fields that may work can be found [here](https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadata-fields)

### Internal Linking

**Linking by docId**

You can link to other documents using their docId. The link name will be the title of the linked document. Linking by docId ensures that the links remain valid even if the URL structure changes.

**Syntax**

To create an internal link using docId, use the following syntax:

```markdown
[](docId:your-doc-id-here)
```

Replace `your-doc-id-here` with the docId of the target document.

You can optionally add a fragment to link to certain section of the page by adding a `#` after the docId followed by the fragment.

```markdown
[](docId:your-doc-id-here#fragment)
```

**Override Link Name**

You can specify custom link text by inserting it between the square brackets []. Here's an example:

```
[Custom Link Name](docId:3gNhGvPOi3DFDya6NyVb0)
```

This will render as a link with the text "Custom Link Name," pointing to the document with the `docId` `3gNhGvPOi3DFDya6NyVb0`.

### Markdoc

Markdown is parsed and rendered using [Markdoc](https://markdoc.io). It allows for custom components see `src/markdoc/tags.js`

### Image handling

Images must be stored within the "Website Assets" internal project at Storj with the prefix of
`https://link.us1.storjshare.io/raw/jua7rls6hkx5556qfcmhrqed2tfa/docs/images`

## Style Guidelines

Ensure that your contribution adheres to the project's style guidelines, including language, tone, and formatting. You may refer to existing articles for examples.

## Review Process

Once you submit your PR, it will be reviewed by the project maintainers. If you work at Storj, you can self-review your own PR. Please address any feedback provided to ensure your contribution can be merged.

## Conclusion

Thank you for contributing to Storj's documentation! Your efforts help make this project more accessible and informative for everyone. If you have any questions or need further assistance, please don't hesitate to ask.
