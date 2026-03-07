import urllib.request
import json

class MockLLM:
    def generate_tutorial(self, topic: str):
        return f"# How to master {topic}\n\nStep 1: Understand {topic}...\nStep 2: Practice."

class ScribeAgent:
    def __init__(self, host="127.0.0.1"):
        self.llm = MockLLM()
        # connecting to port 8090 of the current host
        self.pb_url = f"http://{host}:8090"
        
    def generate_tutorial_and_persist(self, topic: str):
        markdown_content = self.llm.generate_tutorial(topic)
        data = {
            "title": f"Tutorial: {topic}",
            "markdown_body": markdown_content,
            "status": "drafting"
        }
        try:
            req = urllib.request.Request(
                f"{self.pb_url}/api/collections/content_pipeline/records",
                data=json.dumps(data).encode('utf-8'),
                headers={'Content-Type': 'application/json'},
                method='POST'
            )
            with urllib.request.urlopen(req) as response:
                response.read()
        except Exception as e:
            print(f"Failed to persist tutorial: {e}")
        return markdown_content
