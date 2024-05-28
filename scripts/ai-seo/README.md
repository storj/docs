source https://blog.hadenes.io/post/generating-blog-post-summaries-with-chatgpt/

```bash
python3 -m venv .venv
source .venv/bin/activate
pip3 install -r requirements.txt

OPENAI_ORG=<org_id> OPENAI_API_KEY=<key> ./generate_summaries ../../app/dcs/**/page.md
```
