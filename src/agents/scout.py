import urllib.request
import json

class TwitterClient:
    def search(self, query: str):
        # Mocked twitter search
        return [{"text": f"Found something about {query}", "author": "user123"}]

class ScoutAgent:
    def __init__(self, host="127.0.0.1"):
        self.twitter = TwitterClient()
        # connecting to port 8090 of the current host
        self.pb_url = f"http://{host}:8090"
        
    def search_and_persist(self, query: str):
        results = self.twitter.search(query)
        for result in results:
            data = {
                "platform": "twitter",
                "query": query,
                "draft_reply": f"Replying to {result['author']}: Thanks for mentioning!",
                "status": "pending"
            }
            try:
                req = urllib.request.Request(
                    f"{self.pb_url}/api/collections/social_mentions/records",
                    data=json.dumps(data).encode('utf-8'),
                    headers={'Content-Type': 'application/json'},
                    method='POST'
                )
                with urllib.request.urlopen(req) as response:
                    response.read()
            except Exception as e:
                print(f"Failed to persist: {e}")
        return results
