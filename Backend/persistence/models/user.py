class User:
    def __init__(self, user_id, name, email, cpf, phone, address):
        self.user_id = user_id
        self.name = name
        self.email = email
        self.cpf = cpf
        self.phone = phone
        self.address = address

    def to_dict(self):
        return {
            "user_id": self.user_id,
            "name": self.name,
            "email": self.email,
            "cpf": self.cpf,
            "phone": self.phone,
            "address": self.address
        }