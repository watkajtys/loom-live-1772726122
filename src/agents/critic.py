import urllib.request
import json

class MockAnalyzer:
    def analyze_failure(self, error_log: str):
        return f"Suggested fix for: {error_log}\n\n1. Check the logs.\n2. Apply the patch."

class CriticAgent:
    def __init__(self, host="127.0.0.1"):
        self.analyzer = MockAnalyzer()
        # connecting to port 8090 of the current host
        self.pb_url = f"http://{host}:8090"
        
    def analyze_and_persist(self, error_log: str):
        suggested_fix = self.analyzer.analyze_failure(error_log)
        data = {
            "error_log": error_log,
            "suggested_fix": suggested_fix,
            "status": "pending"
        }
        try:
            req = urllib.request.Request(
                f"{self.pb_url}/api/collections/ax_reports/records",
                data=json.dumps(data).encode('utf-8'),
                headers={'Content-Type': 'application/json'},
                method='POST'
            )
            with urllib.request.urlopen(req) as response:
                response.read()
        except Exception as e:
            print(f"Failed to persist analysis: {e}")
        return suggested_fix
