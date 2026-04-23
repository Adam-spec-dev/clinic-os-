import pandas as pd
import json
import os
from typing import Dict, Any, List

# ==============================================================================
# CLINIC OS - HARDENED CSV PROCESSOR (Zero-Hallucination)
# Converts raw doctor CSVs into validated system specifications.
# ==============================================================================

class IntakeProcessor:
    def __init__(self, csv_path: str):
        self.csv_path = csv_path
        self.raw_data = None
        self.validated_spec = {}
        self.errors = []

    def load_and_validate(self) -> Dict[str, Any]:
        """
        Hard-engineered validation logic. 
        Detects missing prices, schedule gaps, and incomplete data.
        """
        if not os.path.exists(self.csv_path):
            raise FileNotFoundError(f"CSV not found: {self.csv_path}")

        # Load CSV (flexible with different headers)
        df = pd.read_csv(self.csv_path)
        self.raw_data = df.to_dict(orient='records')

        # 1. Base Clinic Data
        clinic_info = self.raw_data[0]
        self.validated_spec = {
            "clinic_name": str(clinic_info.get('clinic_name', 'Unnamed Clinic')).strip(),
            "city": str(clinic_info.get('city', 'Unknown')).strip(),
            "doctors": [],
            "services": [],
            "status": "VALIDATED"
        }

        # 2. Extract Doctors (handling missing schedules/details)
        for row in self.raw_data:
            if pd.notna(row.get('doctor_name')):
                doc = {
                    "name": row['doctor_name'],
                    "specialty": row.get('specialty', 'Generalist'),
                    "days": str(row.get('working_days', 'Not Specified')).split(','),
                    "is_complete": pd.notna(row.get('working_days'))
                }
                if doc not in self.validated_spec['doctors']:
                    self.validated_spec['doctors'].append(doc)

        # 3. Extract Services & Prices (Hard check for missing prices)
        for row in self.raw_data:
            if pd.notna(row.get('service_name')):
                service = {
                    "name": row['service_name'],
                    "price": row.get('price', 'REQUEST_PRICE_LIVE'), # No guessing!
                    "has_price": pd.notna(row.get('price'))
                }
                if service not in self.validated_spec['services']:
                    self.validated_spec['services'].append(service)

        # 4. Critical Error Detection
        if self.validated_spec['clinic_name'] == 'Unnamed Clinic':
            self.errors.append("CRITICAL: Clinic name is missing.")

        return self.validated_spec

    def save_spec(self, output_path: str = "validated_spec.json"):
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(self.validated_spec, f, indent=2, ensure_ascii=False)
        print(f"[PROCESSOR] Validated Spec saved to {output_path}")

if __name__ == "__main__":
    # Example raw CSV structure:
    # clinic_name, city, doctor_name, specialty, working_days, service_name, price
    # El Amir, Algiers, Dr. Mansouri, Dental, Mon-Wed, Cleaning, 5000
    
    # Create a dummy CSV for testing
    data = {
        'clinic_name': ['El Amir', 'El Amir'],
        'city': ['Algiers', 'Algiers'],
        'doctor_name': ['Dr. Mansouri', 'Dr. Belkacem'],
        'specialty': ['Orthodontics', 'General'],
        'working_days': ['Mon,Wed,Fri', 'Tue,Thu'],
        'service_name': ['Consultation', 'Teeth Cleaning'],
        'price': [3000, None] # One service has no price
    }
    pd.DataFrame(data).to_csv("sample_clinic_data.csv", index=False)
    
    processor = IntakeProcessor("sample_clinic_data.csv")
    spec = processor.load_and_validate()
    processor.save_spec()
    print(json.dumps(spec, indent=2))
