#this extracts data every 30 seconds
import requests
import json
import time
from elasticsearch import Elasticsearch, RequestsHttpConnection

# Zabbix API URL
url = 'http://192.168.1.6/zabbix/api_jsonrpc.php'

# Zabbix API authentication details
auth = ('Admin', 'zabbix')

# Elasticsearch settings
host = "localhost"
port = 9201
user = "elastic"
password = "elastic123"

# Elasticsearch connection
es = Elasticsearch(
    [host],
    port=port,
    connection_class=RequestsHttpConnection,
    http_auth=(user, password),
    use_ssl=True,
    verify_certs=False  # Assuming you're not verifying SSL certificates
)

# Define a function to fetch and store data every 30 seconds
def fetch_and_store_data():
    while True:
        # Define the request payload for login
        login_payload = {
            "jsonrpc": "2.0",
            "method": "user.login",
            "params": {
                "user": auth[0],
                "password": auth[1]
            },
            "id": 1,
            "auth": None
        }

        # Send the login request
        response = requests.post(url, json=login_payload)
        data = response.json()

        # Extract the authentication token from the response
        if 'result' in data:
            auth_token = data['result']
            print("Authentication token:", auth_token)

            # Define the request payload for item retrieval for mysql host
            mysql_payload = {
                "jsonrpc": "2.0",
                "method": "item.get",
                "params": {
                    "output": [
                        "hostid",
                        "name",
                        "key_",
                        "delay",
                        "history",
                        "trends",
                        "type",
                        "lastclock",
                        "lastvalue"
                    ],
                    "host": "mysql",
                },
                "auth": auth_token,
                "id": 1
            }

            # Send the request to the Zabbix API
            response = requests.post(url, json=mysql_payload)
            data = response.json()

            # Process the response for mysql items
            result_data = {}
            if 'result' in data:
                mysql_items = data['result']
                result_data['MySQL Metrics'] = []
                for item in mysql_items:
                    last_check = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(int(item['lastclock'])))
                    last_value = item['lastvalue']
                    # Change calculation
                    change = "Calculate Change Here"  # You can calculate the change based on your specific requirements
                    result_data['MySQL Metrics'].append({
                        "Host": item['hostid'],
                        "Name": item['name'],
                        "Interval": item['delay'],
                        "History": item['history'],
                        "Trends": item['trends'],
                        "Type": item['type'],
                        "Last Check": last_check,
                        "Last Value": last_value,
                        # "Change": change
                    })

                # Indexing data into Elasticsearch
                # Loop through each metric and index it separately
                for metric in result_data['MySQL Metrics']:
                    es.index(index='zabbix_mysql_metrics_rt_30mint', body=metric)

        else:
            print("Failed to authenticate with Zabbix API")

        # Wait for 30 seconds before fetching data again
        time.sleep(30)

# Call the function to start fetching and storing data
fetch_and_store_data()
