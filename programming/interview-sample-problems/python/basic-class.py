"""
Sample Class Definition

Create me a class that returns made-up client config with the arguments/values for:

endpoint
username

The class should have basic function that returns the client config in JSON

The class should accept an optional parameter/value not known to the class named "secret_token". If the user passes this to the class, a non-readonly client will be created
"""

class MyClass:
    def __init__(self, username, endpoint, **kwargs):
        self.username = username
        self.endpoint = endpoint
        self.secret_token = kwargs.get("secret_token", None)

    # Sample Function to Create Instances with Arguments
    def create_client(self):
        # Create an instance of MyClass with the provided arguments
        if self.secret_token:
            return {"username": self.username, "endpoint": self.endpoint, "secret_token": self.secret_token}
        else:
            return {"username": self.username, "endpoint": self.endpoint}

# Sample Usage
# Create an instance using the function
readonly_client = MyClass("john", "https://example.com").create_client()
print(readonly_client)

client_authenticated = MyClass("john", "https://example.com", secret_token="abc123").create_client()
print(client_authenticated)