import urllib.request
import json
from datetime import datetime

class MockDocsParser:
    def parse_source(self, url: str):
        return f"Parsed documentation from {url}"

class IngesterAgent:
    def __init__(self, host="127.0.0.1"):
        self.parser = MockDocsParser()
        # connecting to port 8090 of the current host
        self.pb_url = f"http://{host}:8090"
        
    def ingest_and_persist(self, url: str, source_type: str = "docs_url"):
        parsed_content = self.parser.parse_source(url)
        data = {
            "source_type": source_type,
            "url": url,
            "vectorization_status": "pending",
            "last_synced": datetime.utcnow().isoformat() + "Z"
        }
        try:
            req = urllib.request.Request(
                f"{self.pb_url}/api/collections/knowledge_sources/records",
                data=json.dumps(data).encode('utf-8'),
                headers={'Content-Type': 'application/json'},
                method='POST'
            )
            with urllib.request.urlopen(req) as response:
                response.read()
        except Exception as e:
            print(f"Failed to persist knowledge source: {e}")
        return parsed_content
