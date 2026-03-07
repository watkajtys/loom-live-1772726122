import time
from agents.scout import ScoutAgent
from agents.scribe import ScribeAgent
from agents.ingester import IngesterAgent
from agents.critic import CriticAgent

class AdvoloomOrchestrator:
    def __init__(self, host="127.0.0.1"):
        self.scout = ScoutAgent(host)
        self.scribe = ScribeAgent(host)
        self.ingester = IngesterAgent(host)
        self.critic = CriticAgent(host)
        
    def run_loop(self):
        print("Advoloom Orchestrator started. Entering infinite loop...")
        while True:
            try:
                # 1. Scout
                print("\n[Scout] Searching for mentions...")
                self.scout.search_and_persist("pocketbase")
                
                # 2. Scribe
                print("[Scribe] Generating tutorial...")
                self.scribe.generate_tutorial_and_persist("PocketBase relations")
                
                # 3. Ingester
                print("[Ingester] Ingesting docs...")
                self.ingester.ingest_and_persist("https://pocketbase.io/docs/")
                
                # 4. Critic
                print("[Critic] Analyzing mock error...")
                self.critic.analyze_and_persist("ClientResponseError 400")
                
            except Exception as e:
                print(f"Error in orchestrator loop: {e}")
                
            print("Cycle complete. Sleeping for 10 seconds...")
            time.sleep(10)

if __name__ == "__main__":
    orchestrator = AdvoloomOrchestrator()
    orchestrator.run_loop()
