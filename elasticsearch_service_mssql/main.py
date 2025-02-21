from fastapi import FastAPI, HTTPException
from elasticsearch import Elasticsearch, exceptions
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

es = Elasticsearch(
    ["https://elastic:elastic123@es01:9200"],
    verify_certs=False
)

@app.get("/metrics/mssql/all")
async def get_metrics():
    try:
        response = es.search(
            index="zabbix_sqlserver_metrics_30mint",
            body={
                "query": {
                    "match_all": {}
                }
            }
        )
        return response['hits']['hits']
    except exceptions.NotFoundError:
        raise HTTPException(status_code=404, detail="Index not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

@app.get("/metrics/mssql/Total_server_memory")
async def get_metrics():
    try:
        response = es.search(
            index="zabbix_metrics_mssql_",
            body={
                "size":50,
                "query": {
                    "match": {
                            "Name": "MSSQL: Total server memory"
    }
  }
            }
        )
        return response['hits']['hits']
    except exceptions.NotFoundError:
        raise HTTPException(status_code=404, detail="Index not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/metrics/mssql/DB_state_test1")
async def get_metrics():
    try:
        response = es.search(
            index="zabbix_metrics_mssql_",
            body={
                "size":100,
                "query": {
                    "match": {
                            "Name.keyword": "MSSQL DB 'test1': State"
    }
  }
            }
        )
        return response['hits']['hits']
    except exceptions.NotFoundError:
        raise HTTPException(status_code=404, detail="Index not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/metrics/mssql/DB_state_test2")
async def get_metrics():
    try:
        response = es.search(
            index="zabbix_sqlserver_metrics_30mint",
            body={
                "size":23,
                "query": {
                    "match": {
                            "Name.keyword": "MSSQL DB 'test2': State"
    }
  }
            }
        )
        return response['hits']['hits']
    except exceptions.NotFoundError:
        raise HTTPException(status_code=404, detail="Index not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/mssql/errors")
async def get_metrics():
    try:
        response = es.search(
            index="zabbix_problems_mssql",
            body={
                "query": {
                    "match_all": {}
                }
            }
        )
        return response['hits']['hits']
    except exceptions.NotFoundError:
        raise HTTPException(status_code=404, detail="Index not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8003)
