package main

import (
	"flag"
	"fmt"
	"io/fs"
	"maps"
	"os"
	"path/filepath"
	"slices"
	"sort"
	"strings"
)

func main() {
	flag.Parse()

	imageExt := map[string]bool{
		".png":  true,
		".jpg":  true,
		".jpeg": true,
	}

	imageByName := map[string][]string{}

	rootdir := filepath.Join("app", "(blog)")
	filepath.WalkDir(rootdir, func(path string, d fs.DirEntry, err error) error {
		if _, ok := imageExt[strings.ToLower(filepath.Ext(path))]; !ok {
			return nil
		}
		name := filepath.Base(path)
		imageByName[name] = append(imageByName[name], path)
		return nil
	})

	names := slices.Collect(maps.Keys(imageByName))

	var foundDuplicates bool

	sort.Strings(names)
	for _, name := range names {
		paths := imageByName[name]
		sort.Strings(paths)
		if len(paths) > 1 {
			foundDuplicates = true
			fmt.Fprintf(os.Stderr, "%v:\n", name)
			for _, path := range paths {
				fmt.Fprintf(os.Stderr, "\t%v\n", path)
			}
		}
	}

	if foundDuplicates {
		fmt.Fprintf(os.Stderr, "found duplicates")
		os.Exit(1)
	}
}
