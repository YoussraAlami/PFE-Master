# This script continuously fetches problem data from Zabbix for multiple hosts,

import requests
import json
import time
from elasticsearch import Elasticsearch, RequestsHttpConnection

# Zabbix API URL
url = 'http://192.168.1.15/zabbix/api_jsonrpc.php'

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

# Function to authenticate with Zabbix API and get auth token
def get_zabbix_auth_token():
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
    response = requests.post(url, json=login_payload)
    data = response.json()
    if 'result' in data:
        return data['result']
    else:
        print("Failed to authenticate with Zabbix API")
        return None

# Function to fetch problems for a specific host from Zabbix
def fetch_problems_for_host(auth_token, host):
    # Get host ID for the given host name
    host_payload = {
        "jsonrpc": "2.0",
        "method": "host.get",
        "params": {
            "output": ["hostid"],
            "filter": {
                "host": host
            }
        },
        "auth": auth_token,
        "id": 1
    }
    response = requests.post(url, json=host_payload)
    host_data = response.json()
    if not host_data['result']:
        return []
    host_id = host_data['result'][0]['hostid']

    # Get problems for the host
    problem_payload = {
        "jsonrpc": "2.0",
        "method": "problem.get",
        "params": {
            "output": "extend",
            "selectAcknowledges": "extend",
            # "selectTags": "extend",
            "selectSuppressionData": "extend",
            "hostids": host_id,
        },
        "auth": auth_token,
        "id": 1
    }
    response = requests.post(url, json=problem_payload)
    data = response.json()
    return data.get('result', [])

# Function to process and store data in Elasticsearch
def process_and_store_data(data, index_name, host):
    result_data = []
    for problem in data:
        timestamp = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(int(problem['clock'])))
        result_data.append({
            "Problem ID": problem['eventid'],
            "Severity": problem['severity'],
            "Host": host,
            "Description": problem['name'],
            "Timestamp": timestamp,
            "Acknowledged": problem['acknowledged'],
            # "Tags": problem.get('tags', []),
            "Suppression Data": problem.get('suppressiondata', {}),
        })

    # Indexing data into Elasticsearch
    for metric in result_data:
        es.index(index=index_name, body=metric)

# Main function to fetch and store data for multiple hosts every 30 seconds
def fetch_and_store_data():
    while True:
        auth_token = get_zabbix_auth_token()
        if not auth_token:
            time.sleep(30)
            continue

        hosts = ["oracle", "mysql", "mssql"]  # Update with your actual host names
        index_name = 'zabbix_problems'

        for host in hosts:
            data = fetch_problems_for_host(auth_token, host)
            process_and_store_data(data, f"{index_name}_{host}", host)

        # Wait for 30 seconds before fetching data again
        time.sleep(30)

# Call the function to start fetching and storing data
fetch_and_store_data()
