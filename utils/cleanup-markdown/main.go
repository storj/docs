package main

import (
	"bytes"
	"flag"
	"fmt"
	"io/fs"
	"os"
	"path/filepath"
	"regexp"
	"strings"
)

func main() {
	flag.Parse()

	conv := Convert{}

	rootdir := filepath.Join("app", "(blog)")
	filepath.WalkDir(rootdir, func(path string, d fs.DirEntry, err error) error {
		if filepath.Ext(path) != ".md" {
			return nil
		}

		if err := conv.Process(path); err != nil {
			fmt.Fprintln(os.Stderr, err)
		}

		return nil
	})
}

type Convert struct{}

func (conv *Convert) Process(fullPath string) error {
	data, err := os.ReadFile(fullPath)
	if err != nil {
		return fmt.Errorf("failed to open %q: %w", fullPath, err)
	}

	page := ParsePage(fullPath, string(data))
	conv.Cleanup(&page)
	if bytes.Equal(data, []byte(page.Content)) {
		return nil
	}

	s, err := os.Stat(fullPath)
	if err != nil {
		return fmt.Errorf("page stat %q failed: %w", fullPath, err)
	}

	err = os.WriteFile(fullPath, []byte(page.Content), s.Mode())
	if err != nil {
		return fmt.Errorf("rewriting content failed %q: %w", fullPath, err)
	}

	return nil
}

func (conv *Convert) Cleanup(page *Page) {
	conv.FixJoiners(page)
	conv.FixTrailingSpace(page)
	conv.ReplaceMath(page)
	conv.ReplaceStarryNight(page)
	conv.ReplaceUnderlines(page)
	conv.ReplaceBoldPeriod(page)
	conv.ReplaceZeroWidth(page)
}

type Page struct {
	ContentPath string
	Content     string
}

func ParsePage(contentPath, content string) Page {
	return Page{
		ContentPath: contentPath,
		Content:     content,
	}
}

func (conv *Convert) FixJoiners(page *Page) {
	page.Content = strings.ReplaceAll(page.Content, "\\\n\u200c\\\n", "\n\n")
	page.Content = strings.ReplaceAll(page.Content, "\\\n\u200d\\\n", "\n\n")
	page.Content = strings.ReplaceAll(page.Content, "\u200c", "")
	page.Content = strings.ReplaceAll(page.Content, "\u200d", "")
}

// FixTrailingSpace fixes some weird content issues in the markdown files.
func (conv *Convert) FixTrailingSpace(page *Page) {
	page.Content = replaceAll(`&#x20;`, page.Content, "")
	page.Content = replaceAll(` *$`, page.Content, "")
}

// ReplaceMath replaces multiline $$\sqrt{}$$ with {{< katex >}}\sqrt{}{{< /katex >}}.
func (conv *Convert) ReplaceMath(page *Page) {
	page.Content = replaceAll(
		`\$\$\n(.*)\n\$\$`,
		page.Content,
		"{{< katex display >}}\n$1\n{{< /katex >}}",
	)
}

// ReplaceStarryNight replaces **** in a row, which seems a weird gitbook artifact.
func (conv *Convert) ReplaceStarryNight(page *Page) {
	page.Content = replaceAll(`( *\*\*\*\* +|( +\*\*\*\* *))`, page.Content, " ")
	page.Content = replaceAll(`\*\*\*\*`, page.Content, "")
}

// ReplaceUnderline replaces __ in a row, which seems a weird gitbook artifact.
func (conv *Convert) ReplaceUnderlines(page *Page) {
	page.Content = replaceAll(`( *__ +|( +__ *))`, page.Content, " ")
	page.Content = replaceAll(`\b__\b`, page.Content, "")
}

// ReplaceBoldPeriod replaces **.**
func (conv *Convert) ReplaceBoldPeriod(page *Page) {
	page.Content = replaceAll(`\*\*\.\*\*`, page.Content, ".")
}

// ReplaceZeroWidth replaces \u200b and \u200c
func (conv *Convert) ReplaceZeroWidth(page *Page) {
	page.Content = replaceAll("\\*\\*\u200b\\*\\*", page.Content, "")
	page.Content = replaceAll("\u200b", page.Content, "")
	page.Content = replaceAll("\u200c", page.Content, "")
}

var rxCache = map[string]*regexp.Regexp{}

func replaceAll(regex, content, newContent string) string {
	rx := mustCompile(regex)
	return rx.ReplaceAllString(content, newContent)
}

func mustCompile(s string) *regexp.Regexp {
	rx, ok := rxCache[s]
	if !ok {
		rx = regexp.MustCompile(s)
		rxCache[s] = rx
	}
	return rx
}
