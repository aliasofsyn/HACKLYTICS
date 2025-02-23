import pandas as pd
import random

airlines = ['Delta', 'United', 'American', 'Southwest', 'JetBlue', 'Alaska']
statuses = ['Canceled', 'Delayed']
classes = ['Economy', 'Business', 'First']

def generate_row():
    delay = random.randint(0, 300)  # Delay between 0-300 mins
    international = random.choice(['Yes', 'No'])
    refund_granted = 1 if delay > 180 or (international == 'Yes' and delay > 120) else 0
    return [
        random.choice(airlines),
        delay,
        random.choice(statuses),
        international,
        random.choice(classes),
        refund_granted
    ]

data = [generate_row() for _ in range(500)]
columns = ['Airline', 'DelayDuration', 'FlightStatus', 'InternationalFlight', 'TicketClass', 'RefundGranted']

df = pd.DataFrame(data, columns=columns)
df.to_csv('refund_data.csv', index=False)

print("✅ Mock dataset generated with 500 rows.")
