import subprocess
import time
import os
import sys

# ==============================================================================
# CLINIC OS : THE MONOPOLY ENGINE
# One script to start the entire ecosystem:
# 1. Master API Gateway (Port 8000)
# 2. Webhook Engine (Port 8001)
# 3. Next.js Frontend (Port 3000)
# 4. Orchestrator Server (Port 8005)
# ==============================================================================

def start_services():
    print("🚀 INITIALIZING CLINIC OS MONOPOLY ARCHITECTURE...")
    
    # Check for Groq Key
    if not os.environ.get("GROQ_API_KEY"):
        print("⚠️  WARNING: GROQ_API_KEY not set. AI Architect will be disabled.")
        print("   Set it with: $env:GROQ_API_KEY='your_key' (Windows)")
    
    processes = []
    
    try:
        # 1. Master API
        print("[1/4] Starting Master API Gateway...")
        p_api = subprocess.Popen([sys.executable, "api/public_api/main.py"])
        processes.append(p_api)
        
        # 2. Webhook Engine
        print("[2/4] Starting Webhook Engine...")
        p_webhook = subprocess.Popen([sys.executable, "api/webhook_engine/handler.py"])
        processes.append(p_webhook)
        
        # 3. Orchestrator
        print("[3/4] Starting Orchestrator Server...")
        p_orch = subprocess.Popen([sys.executable, "api/public_api/monopoly_orchestrator.py"])
        processes.append(p_orch)
        
        # 4. Frontend (Wait a bit for backend to warm up)
        time.sleep(2)
        print("[4/4] Starting Next.js Intelligence HUD...")
        # Note: on Windows, npm might need shell=True
        p_front = subprocess.Popen(["npm", "run", "dev"], cwd="frontend", shell=True)
        processes.append(p_front)
        
        print("\n✅ ALL SYSTEMS ONLINE.")
        print("   - Dashboard:   http://localhost:3000")
        print("   - Intake Form: http://localhost:3000/intake")
        print("   - Master API:  http://localhost:8000")
        print("\nPress Ctrl+C to shutdown the Monopoly.")
        
        while True:
            time.sleep(1)
            
    except KeyboardInterrupt:
        print("\n🛑 SHUTTING DOWN...")
        for p in processes:
            p.terminate()
        print("Monopoly safely dismantled.")

if __name__ == "__main__":
    start_services()
