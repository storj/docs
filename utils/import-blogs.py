#!/usr/bin/env python3

import os
import sys
import yaml
import hashlib
import requests

from dateutil.parser import parse as dateparse
from bs4 import BeautifulSoup
from markdownify import MarkdownConverter, ATX

MAX_AUTO_DESCRIPTION_LENGTH = 300


def download(url):
  print("downloading", url, file=sys.stderr)
  resp = requests.get(url)
  if resp.status_code == 404:
    print("error 404: %r" % url, file=sys.stderr)
    return b""
  resp.raise_for_status()
  return resp.content


def cached_download(url):
  cache = os.path.join("cache", hashlib.sha256(url.encode("utf8")).hexdigest())
  if not os.path.exists(cache):
    os.makedirs("cache", exist_ok=True)
    data = download(url)
    with open(cache, "wb") as fh:
      fh.write(data)
    with open(cache + ".url", "wb") as fh:
      fh.write(url.encode("utf8"))
  with open(cache, "rb") as fh:
    return fh.read()


def filtered_cached_download(url):
  if any(
      url.lower().startswith(prefix)
      for prefix in (
          "https://www.storj.io/blog/",
          "https://www.storj.io/category/",
          "https://www.storj.io/blog-posts/",
          "https://blog.storj.io/")):
    return cached_download(url)
  return ""


def handleblog(url, parsed):
  if url not in (
      # definite
      "https://www.storj.io/blog/go-integration-tests-with-postgres",
      "https://www.storj.io/blog/finding-and-tracking-resource-leaks-in-go",
      "https://www.storj.io/blog/production-concurrency",
      "https://www.storj.io/blog/finding-goroutine-leaks-in-tests",
      "https://www.storj.io/blog/demystifying-technical-debt",
      "https://www.storj.io/blog/a-tale-of-two-copies",
      "https://www.storj.io/blog/introducing-drpc-our-replacement-for-grpc",

      # maybe
      "https://www.storj.io/blog/how-developers-can-easily-connect-storj-to-compute-for-presigned-urls",
      "https://www.storj.io/blog/how-to-generate-presigned-urls-for-temporary-object-access",
      "https://www.storj.io/blog/storj-open-development-part-2-whats-new",
      "https://www.storj.io/blog/use-storj-dcs-from-cloud-native-environments-using-sidecar-pattern",
      "https://www.storj.io/blog/cloud-based-mutlimedia-library-transformation",
      "https://www.storj.io/blog/february-2022-product-update",
      "https://www.storj.io/blog/january-2021-product-update",
      "https://www.storj.io/blog/december-2021-storj-product-update",
      "https://www.storj.io/blog/the-complexity-of-amazon-s3-and-the-simplicity-of-decentralization",
      "https://www.storj.io/blog/november-2021-storj-product-update",
      "https://www.storj.io/blog/storj-open-development-announcement",
      "https://www.storj.io/blog/the-10-most-common-questions-about-decentralized-cloud-storage",
      "https://www.storj.io/blog/september-2021-development-update",
      "https://www.storj.io/blog/using-storj-dcs-with-github-actions",
      "https://www.storj.io/blog/open-source-and-open-data-storj-dcs-network-statistics",
      "https://www.storj.io/blog/august-2021-development-update-from-storj",
      "https://www.storj.io/blog/july-2021-development-update-from-storj",
      "https://www.storj.io/blog/automatically-store-your-tesla-sentry-mode-and-dashcam-videos-on-the-decentralized-cloud",
      "https://www.storj.io/blog/june-2021-development-update",
      "https://www.storj.io/blog/may-2021-development-update-from-storj",
      "https://www.storj.io/blog/what-is-end-to-end-encryption",
      "https://www.storj.io/blog/product-development-update-april-2021",
      "https://www.storj.io/blog/december-2020-development-update-from-storj-labs",
      "https://www.storj.io/blog/november-2020-development-update-from-storj-labs",
      "https://www.storj.io/blog/visualizing-decentralized-data-distribution-with-the-linkshare-object-map",
      "https://www.storj.io/blog/october-2020-development-update-from-storj-labs",
      "https://www.storj.io/blog/integrating-decentralized-cloud-storage-with-duplicati",
      "https://www.storj.io/blog/choosing-cockroach-db-for-horizontal-scalability",
      "https://www.storj.io/blog/july-2020-development-update-from-storj-labs",
      "https://www.storj.io/blog/development-update-37-from-storj-labs",
      "https://www.storj.io/blog/development-update-36-from-storj-labs",
      "https://www.storj.io/blog/development-update-35-from-storj-labs",
      "https://www.storj.io/blog/development-update-34-from-storj-labs",
      "https://www.storj.io/blog/development-update-33-from-storj-labs",
      "https://www.storj.io/blog/announcing-pioneer-2-and-tardigrade-io-pricing",
      "https://www.storj.io/blog/development-update-32-from-storj-labs",
      "https://www.storj.io/blog/development-update-31-from-storj-labs",
      "https://www.storj.io/blog/development-update-30-from-storj-labs",
      "https://www.storj.io/blog/storage-nodes-are-now-supported-on-windows-home",
      "https://www.storj.io/blog/development-update-29-from-storj-labs",
      "https://www.storj.io/blog/development-update-28-from-storj-labs",
      "https://www.storj.io/blog/announcing-beta-pioneer-1-v3-and-tardigrade-are-here",
      "https://www.storj.io/blog/development-update-27-from-storj-labs",
      "https://www.storj.io/blog/development-update-26-from-storj-labs",
      "https://www.storj.io/blog/announcing-beacon-alpha-file-sharing-ip-filtering-and-increased-performance",
      "https://www.storj.io/blog/development-update-25-from-storj-labs",
      "https://www.storj.io/blog/development-update-24-from-storj-labs",
      "https://www.storj.io/blog/coordination-avoidance-on-the-storj-network",
      "https://www.storj.io/blog/development-update-23-from-storj-labs",
      "https://www.storj.io/blog/flexible-file-sharing-with-macaroons",
      "https://www.storj.io/blog/development-update-22-from-storj-labs",
      "https://www.storj.io/blog/what-storage-node-operators-need-to-know-about-satellites",
      "https://www.storj.io/blog/what-happens-when-you-upload-a-file-to-a-decentralized-network",
      "https://www.storj.io/blog/development-update-21-from-storj-labs",
      "https://www.storj.io/blog/developers-and-v3-network-make-first-contact-with-vanguard-alpha",
      "https://www.storj.io/blog/development-update-20-from-storj-labs",
      "https://www.storj.io/blog/our-3-step-interview-process-for-engineering-candidates",
      "https://www.storj.io/blog/development-update-19-from-storj-labs",
      "https://www.storj.io/blog/development-update-18-from-storj-labs",
      "https://www.storj.io/blog/so-youre-ready-for-your-first-payday-as-a-storage-node-operator",
      "https://www.storj.io/blog/development-update-17-from-storj-labs",
      "https://www.storj.io/blog/product-manager-development-update-16",
      "https://www.storj.io/blog/announcing-the-storj-v3-explorer-release",
      "https://www.storj.io/blog/product-manager-development-update-15",
      "https://www.storj.io/blog/product-manager-development-update-14",
      "https://www.storj.io/blog/product-manager-development-update-13",
      "https://www.storj.io/blog/decentralized-auditing-and-repair-the-low-key-life-of-data-resurrection",
      "https://www.storj.io/blog/product-manager-development-update-12",
      "https://www.storj.io/blog/product-manager-development-update-11",
      "https://www.storj.io/blog/security-and-encryption-on-the-v3-network",
      "https://www.storj.io/blog/replication-is-bad-for-decentralized-storage-part-1-erasure-codes-for-fun-and-profit",
      "https://www.storj.io/blog/product-manager-development-update-10",
      "https://www.storj.io/blog/the-benefits-of-decentralization-go-far-beyond-ideology",
      "https://www.storj.io/blog/introducing-the-storj-v3-white-paper",
      "https://www.storj.io/blog/product-manager-development-update-9",
      "https://www.storj.io/blog/product-manager-development-update-8",
      "https://www.storj.io/blog/product-manager-development-update-7",
      "https://www.storj.io/blog/product-manager-development-update-6",
      "https://www.storj.io/blog/product-manager-development-update-5",
      "https://www.storj.io/blog/product-manager-development-update-4",
      "https://www.storj.io/blog/product-manager-development-update-3",
      "https://www.storj.io/blog/product-manager-development-update-2",
      "https://www.storj.io/blog/product-manager-development-update-1",
      "https://www.storj.io/blog/a-look-at-storj-labs-decentralized-cloud-storage-architecture-with-jt-olio",
      "https://www.storj.io/blog/lensm",
      ):
    return

  slug = url.removeprefix("https://www.storj.io/blog/")
  os.makedirs(os.path.join("output", slug), exist_ok=True)

  def persist_image(url):
    if not url.strip(): return ""
    image_data = cached_download(url)
    filename = (hashlib.sha256(url.encode("utf8")).hexdigest()[:16] + "." +
                os.path.basename(url).split(".")[-1])
    with open(os.path.join("output", slug, filename), "wb") as fh:
      fh.write(image_data)
    return "./" + filename

  date = dateparse(parsed.find_all("div", class_="blog-details")[0].string or "1970-01-01")
  author = parsed.find_all("div", class_="blog-author")[0].string or "No Author"
  title = parsed.find_all("h1", class_="blog-post-title")[0].string
  hero_image = persist_image(parsed.find_all("img", class_="blog-hero-image")[0].get("src"))
  description = parsed.find_all("meta", property="og:description")[0].get("content")
  blog_copy = parsed.find_all("div", class_="blog-copy")[0]
  if not description.strip():
    description = blog_copy.text
    if len(description) > MAX_AUTO_DESCRIPTION_LENGTH:
      description = description[:MAX_AUTO_DESCRIPTION_LENGTH-3] + "..."

  for image in blog_copy.find_all("img"):
    image["src"] = persist_image(image.get("src"))

  content = MarkdownConverter(heading_style=ATX).convert_soup(blog_copy)

  with open(os.path.join("output", slug, "page.md"), "wb") as fh:
    fh.write("---\n{frontmatter}\n---\n\n{content}".format(
      frontmatter=yaml.safe_dump({
        "layout": "blog",
        "title": str(title),
        "date": str(date),
        "author": {"name": str(author)},
        "heroimage": str(hero_image),
        "metadata": {
          "title": str(title),
          "description": str(description),
        },
      }),
      content=content).encode("utf8"))


def main():
  seen = set()
  queue = ["https://www.storj.io/blog/"]
  while queue:
    url = queue.pop(0)
    if url in seen: continue
    seen.add(url)
    text = filtered_cached_download(url)
    parsed = BeautifulSoup(text, "html.parser")
    if (text and url.startswith("https://www.storj.io/blog/") and
        len(url) > len("https://www.storj.io/blog/")):
      handleblog(url, parsed)
    links = parsed.find_all("a")
    for link in links:
      href = link.get("href")
      if not href: continue
      if href.startswith("/"):
        href = "https://www.storj.io" + href
      if href.startswith("?"):
        href = url.split("?")[0] + href
      if not href.startswith("http://") and not href.startswith("https://"):
        continue
      queue.append(href)


if __name__ == "__main__":
  main()
