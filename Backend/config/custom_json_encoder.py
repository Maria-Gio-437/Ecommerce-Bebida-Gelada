import json
from datetime import date, datetime

class CustomJSONEncoder(json.JSONEncoder):
    """Codificador JSON customizado para lidar com objetos de data e hora."""
    def default(self, o):
        if isinstance(o, (datetime, date)):
            return o.isoformat()
        return super().default(o)