import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
import joblib

# Load data
data = pd.read_csv('refund_data.csv')

# Preprocessing
data['InternationalFlight'] = data['InternationalFlight'].map({'Yes': 1, 'No': 0})
X = data[['DelayDuration', 'InternationalFlight']]
y = data['RefundGranted']

# Train/test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model = LogisticRegression()
model.fit(X_train, y_train)

# Save model
joblib.dump(model, 'refund_model.pkl')