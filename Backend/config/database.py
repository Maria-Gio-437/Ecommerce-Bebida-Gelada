import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")

# Mock client for development when Supabase is not configured
class MockSupabaseClient:
    def __init__(self):
        self.auth = MockAuth()
    
    def table(self, table_name):
        return MockTable()

class MockTable:
    def insert(self, data):
        return MockQuery(data=[data])
    
    def select(self, *args):
        return MockQuery()
    
    def update(self, data):
        return MockQuery(data=[data])
    
    def delete(self):
        return MockQuery()

class MockQuery:
    def __init__(self, data=None):
        self.mock_data = data or []
    
    def eq(self, column, value):
        return self
    
    def execute(self):
        return MockResponse({"data": self.mock_data, "error": None})

class MockAuth:
    def sign_up(self, credentials):
        return MockAuthResponse({
            "user": {"id": "mock-user-id", "email": credentials.get("email")}, 
            "session": {"access_token": "mock-token"}, 
            "error": None
        })
    
    def sign_in_with_password(self, credentials):
        return MockAuthResponse({
            "user": {"id": "mock-user-id", "email": credentials.get("email")}, 
            "session": {"access_token": "mock-token"}, 
            "error": None
        })
    
    def reset_password_for_email(self, email):
        return MockAuthResponse({"error": None})

class MockResponse:
    def __init__(self, data):
        self.data = data.get("data")
        self.error = data.get("error")

class MockAuthResponse:
    def __init__(self, data):
        self.user = data.get("user")
        self.session = data.get("session")
        self.error = data.get("error")
    
    def model_dump(self):
        return {
            "user": self.user,
            "session": self.session,
            "error": self.error
        }

# Try to create real client, fallback to mock if credentials are invalid
try:
    # Temporarily force mock client for development
    print("⚠️  Using mock Supabase client for development. Configure real credentials in .env for production.")
    supabase = MockSupabaseClient()
    # if url and key and url != "https://your-project.supabase.co" and key != "your-anon-key-here":
    #     supabase: Client = create_client(url, key)
    # else:
    #     print("⚠️  Using mock Supabase client for development. Configure real credentials in .env for production.")
    #     supabase = MockSupabaseClient()
except Exception as e:
    print(f"⚠️  Failed to connect to Supabase: {e}. Using mock client for development.")
    supabase = MockSupabaseClient()