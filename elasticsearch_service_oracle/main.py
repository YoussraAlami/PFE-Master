import datetime
from fastapi import FastAPI, HTTPException, logger
from elasticsearch import Elasticsearch, exceptions
from fastapi.middleware.cors import CORSMiddleware  # Import CORSMiddleware
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Set to * to allow all origins, or specify specific origins
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],  # Add OPTIONS method
    allow_headers=["*"],
)
# # Configuration de la connexion Elasticsearch
# es = Elasticsearch(
#     ["https://elastic:elastic123@localhost:9201"],
#     verify_certs=False
# )

# Configuration de la connexion Elasticsearch
es = Elasticsearch(
    ["https://elastic:elastic123@es01:9200"],
    verify_certs=False
)
@app.get("/metrics/oracle/all")
async def get_metrics():
    try:
        response = es.search(
            index="zabbix_oracle_metrics_30mint",
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
#Oracle: PGA, Global memory bound
@app.get("/metrics/oracle/pga/global_memory_bound")
async def get_metrics():
    try:
        response = es.search(
            index="zabbix_metrics_oracle_",
            body={
                "size": 50, 
                "query": {
                    "match": {
                        "Name.keyword": "Oracle: PGA, Global memory bound"
    }
  }
            }
        )
        return response['hits']['hits']
    except exceptions.NotFoundError:
        raise HTTPException(status_code=404, detail="Index not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

#Oracle: PGA, Total allocated
@app.get("/metrics/oracle/pga/total_allocated")
async def get_metrics():
    try:
        response = es.search(
            index="zabbix_metrics_oracle_",
            body={
                "size": 50, 
                "query": {
                    "match": {
                        "Name.keyword": "Oracle: PGA, Total allocated"
            }
        }
            }
        )
        return response['hits']['hits']
    except exceptions.NotFoundError:
        raise HTTPException(status_code=404, detail="Index not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
#Oracle: PGA, Total freeable
@app.get("/metrics/oracle/pga/total_freeable")
async def get_metrics():
    try:
        response = es.search(
            index="zabbix_metrics_oracle_",
            body={
                "size": 50, 
                "query": {
                    "match": {
                        "Name.keyword": "Oracle: PGA, Total freeable"
    }
  }
            }
        )
        return response['hits']['hits']
    except exceptions.NotFoundError:
        raise HTTPException(status_code=404, detail="Index not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
#Oracle: PGA, Total inuse
@app.get("/metrics/oracle/pga/total_inuse")
async def get_metrics():
    try:
        response = es.search(
            index="zabbix_metrics_oracle_",
            body={
                "size": 50, 
                "query": {
                     "match": {
                        "Name.keyword": "Oracle: PGA, Total inuse"
    }
  }
            }
        )
        return response['hits']['hits']
    except exceptions.NotFoundError:
        raise HTTPException(status_code=404, detail="Index not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
#SGA Oracle: SGA, buffer cache
@app.get("/metrics/oracle/sga/buffer_cache")
async def get_metrics():
    try:
        response = es.search(
            index="zabbix_metrics_oracle_",
            body={
                "size": 50, 
                "query": {
                "match": {
                    "Name.keyword": "Oracle: SGA, buffer cache"
    }
  }
            }
        )
        return response['hits']['hits']
    except exceptions.NotFoundError:
        raise HTTPException(status_code=404, detail="Index not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
#Oracle: SGA, fixed
@app.get("/metrics/oracle/sga/fixed")
async def get_metrics():
    try:
        response = es.search(
            index="zabbix_metrics_oracle_",
            body={
                 "size": 50, 
                "query": {
                 "match": {
                        "Name.keyword": "Oracle: SGA, fixed"
    }
  }
            }
        )
        return response['hits']['hits']
    except exceptions.NotFoundError:
        raise HTTPException(status_code=404, detail="Index not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
#Oracle: SGA, log buffer 
@app.get("/metrics/oracle/sga/log_buffer")
async def get_metrics():
    try:
        response = es.search(
            index="zabbix_metrics_oracle_",
            body={
                  "size": 50, 
                    "query": {
                    "match": {
                             "Name.keyword": "Oracle: SGA, log buffer"
    }
  }
            }
        )
        return response['hits']['hits']
    except exceptions.NotFoundError:
        raise HTTPException(status_code=404, detail="Index not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
#Oracle: SGA, shared pool
@app.get("/metrics/oracle/sga/shared_pool")
async def get_metrics():
    try:
        response = es.search(
            index="zabbix_metrics_oracle_",
            body={
                  "size": 50, 
                    "query": {
                    "match": {
                            "Name.keyword": "Oracle: SGA, shared pool"
    }
  }
            }
        )
        return response['hits']['hits']
    except exceptions.NotFoundError:
        raise HTTPException(status_code=404, detail="Index not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

#TableSPACES
#Oracle TBS 'SYSAUX': Tablespace free, bytes
@app.get("/metrics/oracle/tbs/free_SYSAUX")
async def get_metrics():
    try:
        response = es.search(
            index="zabbix_metrics_oracle_",
            body={
                  "size": 50, 
                    "query": {
                    "match": {
                            "Name.keyword": "Oracle TBS 'SYSAUX': Tablespace free, bytes"
    }
  }
            }
        )
        return response['hits']['hits']
    except exceptions.NotFoundError:
        raise HTTPException(status_code=404, detail="Index not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Oracle TBS 'SYSAUX': Tablespace allocated, bytes
@app.get("/metrics/oracle/tbs/allocated_SYSAUX")
async def get_allocated_sysaux():
    try:
        response = es.search(
            index="zabbix_metrics_oracle_",
            body={
                "size": 50,
                "query": {
                    "match": {
                        "Name.keyword": "Oracle TBS 'SYSAUX': Tablespace allocated, bytes"
                    }
                }
            }
        )
        return response['hits']['hits']
    except exceptions.NotFoundError:
        raise HTTPException(status_code=404, detail="Index not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Oracle TBS 'SYSAUX': Tablespace used, bytes
@app.get("/metrics/oracle/tbs/used_SYSAUX")
async def get_used_sysaux():
    try:
        response = es.search(
            index="zabbix_metrics_oracle_",
            body={
                "size": 50,
                "query": {
                    "match": {
                        "Name.keyword": "Oracle TBS 'SYSAUX': Tablespace used, bytes"
                    }
                }
            }
        )
        return response['hits']['hits']
    except exceptions.NotFoundError:
        raise HTTPException(status_code=404, detail="Index not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
#Oracle TBS 'SYSTEM': Tablespace free, bytes
@app.get("/metrics/oracle/tbs/free_SYSTEM")
async def get_metrics():
    try:
        response = es.search(
            index="zabbix_metrics_oracle_",
            body={
                 "size": 50, 
                "query": {
                "match": {
                            "Name.keyword": "Oracle TBS 'SYSTEM': Tablespace free, bytes"
    }
  }
            }
        )
        return response['hits']['hits']
    except exceptions.NotFoundError:
        raise HTTPException(status_code=404, detail="Index not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Oracle TBS 'SYSTEM': Tablespace allocated, bytes
@app.get("/metrics/oracle/tbs/allocated_SYSTEM")
async def get_allocated_system():
    try:
        response = es.search(
            index="zabbix_metrics_oracle_",
            body={
                "size": 50,
                "query": {
                    "match": {
                        "Name.keyword": "Oracle TBS 'SYSTEM': Tablespace allocated, bytes"
                    }
                }
            }
        )
        return response['hits']['hits']
    except exceptions.NotFoundError:
        raise HTTPException(status_code=404, detail="Index not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Oracle TBS 'SYSTEM': Tablespace used, bytes
@app.get("/metrics/oracle/tbs/used_SYSTEM")
async def get_used_system():
    try:
        response = es.search(
            index="zabbix_metrics_oracle_",
            body={
                "size": 50,
                "query": {
                    "match": {
                        "Name.keyword": "Oracle TBS 'SYSTEM': Tablespace used, bytes"
                    }
                }
            }
        )
        return response['hits']['hits']
    except exceptions.NotFoundError:
        raise HTTPException(status_code=404, detail="Index not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

#Oracle TBS 'TEMP': Tablespace free, bytes
@app.get("/metrics/oracle/tbs/free_TEMP")
async def get_metrics():
    try:
        response = es.search(
            index="zabbix_metrics_oracle_",
            body={
                  "size": 50, 
                    "query": {
                    "match": {
                        "Name.keyword": "Oracle TBS 'TEMP': Tablespace free, bytes"
             }
        }
            }
        )
        return response['hits']['hits']
    except exceptions.NotFoundError:
        raise HTTPException(status_code=404, detail="Index not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Oracle TBS 'TEMP': Tablespace allocated, bytes
@app.get("/metrics/oracle/tbs/allocated_TEMP")
async def get_allocated_temp():
    try:
        response = es.search(
            index="zabbix_metrics_oracle_",
            body={
                "size": 50,
                "query": {
                    "match": {
                        "Name.keyword": "Oracle TBS 'TEMP': Tablespace allocated, bytes"
                    }
                }
            }
        )
        return response['hits']['hits']
    except exceptions.NotFoundError:
        raise HTTPException(status_code=404, detail="Index not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Oracle TBS 'TEMP': Tablespace used, bytes
@app.get("/metrics/oracle/tbs/used_TEMP")
async def get_used_temp():
    try:
        response = es.search(
            index="zabbix_metrics_oracle_",
            body={
                "size": 50,
                "query": {
                    "match": {
                        "Name.keyword": "Oracle TBS 'TEMP': Tablespace used, bytes"
                    }
                }
            }
        )
        return response['hits']['hits']
    except exceptions.NotFoundError:
        raise HTTPException(status_code=404, detail="Index not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

#Oracle TBS 'UNDOTBS1': Tablespace free, bytes
@app.get("/metrics/oracle/tbs/free_UNDOTBS1")
async def get_metrics():
    try:
        response = es.search(
            index="zabbix_metrics_oracle_",
            body={
                  "size": 50, 
                    "query": {
                    "match": {
                            "Name.keyword": "Oracle TBS 'UNDOTBS1': Tablespace free, bytes" 
    }
  }
            }
        )
        return response['hits']['hits']
    except exceptions.NotFoundError:
        raise HTTPException(status_code=404, detail="Index not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Oracle TBS 'UNDOTBS1': Tablespace allocated, bytes
@app.get("/metrics/oracle/tbs/allocated_UNDOTBS1")
async def get_allocated_undotbs1():
    try:
        response = es.search(
            index="zabbix_metrics_oracle_",
            body={
                "size": 50,
                "query": {
                    "match": {
                        "Name.keyword": "Oracle TBS 'UNDOTBS1': Tablespace allocated, bytes"
                    }
                }
            }
        )
        return response['hits']['hits']
    except exceptions.NotFoundError:
        raise HTTPException(status_code=404, detail="Index not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Oracle TBS 'UNDOTBS1': Tablespace used, bytes
@app.get("/metrics/oracle/tbs/used_UNDOTBS1")
async def get_used_undotbs1():
    try:
        response = es.search(
            index="zabbix_metrics_oracle_",
            body={
                "size": 50,
                "query": {
                    "match": {
                        "Name.keyword": "Oracle TBS 'UNDOTBS1': Tablespace used, bytes"
                    }
                }
            }
        )
        return response['hits']['hits']
    except exceptions.NotFoundError:
        raise HTTPException(status_code=404, detail="Index not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
#Oracle TBS 'USERS': Tablespace free, bytes
@app.get("/metrics/oracle/tbs/free_USERS")
async def get_metrics():
    try:
        response = es.search(
            index="zabbix_metrics_oracle_",
            body={
                  "size": 50, 
                    "query": {
                        "match": {
                                "Name.keyword": "Oracle TBS 'USERS': Tablespace free, bytes" 
    }
  }
            }
        )
        return response['hits']['hits']
    except exceptions.NotFoundError:
        raise HTTPException(status_code=404, detail="Index not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Oracle TBS 'USERS': Tablespace allocated, bytes
@app.get("/metrics/oracle/tbs/allocated_USERS")
async def get_allocated_users():
    try:
        response = es.search(
            index="zabbix_metrics_oracle_",
            body={
                "size": 50,
                "query": {
                    "match": {
                        "Name.keyword": "Oracle TBS 'USERS': Tablespace allocated, bytes"
                    }
                }
            }
        )
        return response['hits']['hits']
    except exceptions.NotFoundError:
        raise HTTPException(status_code=404, detail="Index not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Oracle TBS 'USERS': Tablespace used, bytes
@app.get("/metrics/oracle/tbs/used_USERS")
async def get_used_users():
    try:
        response = es.search(
            index="zabbix_metrics_oracle_",
            body={
                "size": 50,
                "query": {
                    "match": {
                        "Name.keyword": "Oracle TBS 'USERS': Tablespace used, bytes"
                    }
                }
            }
        )
        return response['hits']['hits']
    except exceptions.NotFoundError:
        raise HTTPException(status_code=404, detail="Index not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
#Instance Status
@app.get("/metrics/oracle/instance_status")
async def get_metrics():
    try:
        response = es.search(
            index="zabbix_metrics_oracle_",
            body={
                  "size": 100, 
                    "query": {
                    "match": {
                            "Name.keyword": "Oracle: Instance status"
    }
  }
            }
        )
        return response['hits']['hits']
    except exceptions.NotFoundError:
        raise HTTPException(status_code=404, detail="Index not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
#LOCK RATE
@app.get("/metrics/oracle/lock_rate")
async def get_metrics():
    try:
        response = es.search(
            index="zabbix_metrics_oracle_",
            body={
                  "size": 100, 
                    "query": {
                    "match": {
                            "Name.keyword": "Oracle: Sessions lock rate"
    }
  }
            }
        )
        return response['hits']['hits']
    except exceptions.NotFoundError:
        raise HTTPException(status_code=404, detail="Index not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
#"Oracle: Archiver state"
@app.get("/metrics/oracle/archiver_state")
async def get_metrics():
    try:
        response = es.search(
            index="zabbix_metrics_oracle_",
            body={
                  "size": 100, 
                    "query": {
                    "match": {
                            "Name.keyword": "Oracle: Archiver state"
    }
  }
            }
        )
        return response['hits']['hits']
    except exceptions.NotFoundError:
        raise HTTPException(status_code=404, detail="Index not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

#Problems
@app.get("/oracle/errors")
async def get_metrics():
    try:
        response = es.search(
            index="zabbix_problems_oracle",
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
    
#password : lajn olqh iaww iach


# Configuration de l'email
EMAIL_HOST = "smtp.gmail.com"
EMAIL_PORT = 587
EMAIL_HOST_USER = "mailpfe24@gmail.com"
EMAIL_HOST_PASSWORD = "lajnolqhiawwiach"
EMAIL_ADMIN = "mailpfe24@gmail.com"

def send_email(subject: str, body: str, to: str):
    msg = MIMEMultipart()
    msg['From'] = EMAIL_HOST_USER
    msg['To'] = to
    msg['Subject'] = subject

    msg.attach(MIMEText(body, 'plain'))

    try:
        server = smtplib.SMTP(EMAIL_HOST, EMAIL_PORT)
        server.starttls()
        server.login(EMAIL_HOST_USER, EMAIL_HOST_PASSWORD)
        text = msg.as_string()
        server.sendmail(EMAIL_HOST_USER, to, text)
        server.quit()
        logger.info(f"Email sent to {to} with subject: {subject}")
    except Exception as e:
        logger.error(f"Failed to send email: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to send email: {str(e)}")

# New route to get the latest problem and send an email to the administrator
@app.get("/problems/alert/latest")
async def get_latest_problem():
    try:
        response = es.search(
            index="zabbix_problems_oracle_v2",
            body={
                    "size": 1,
                    "query": {
                    "match_all": {}
                    },
                    "sort": [
                        {
                            "Timestamp": {
                            "order": "desc"
            }
        }
  ]
            }
        )
        if response['hits']['hits']:
            latest_problem = response['hits']['hits'][0]
            problem_details = latest_problem['_source']

             # Récupérer les détails du problème
            timestamp = problem_details.get('Timestamp', 'N/A')
            problem_id = problem_details.get('ProblemID', 'N/A')
            severity = problem_details.get('Severity', 'N/A')
            host = problem_details.get('Host', 'N/A')
            description = problem_details.get('Description', 'N/A')
            acknowledged = problem_details.get('Acknowledged', 'N/A')

            # Parse the timestamp to extract the hour
            try:
                timestamp_obj = datetime.datetime.strptime(timestamp, "%Y-%m-%d %H:%M:%S")
                hour_minutes_seconds = timestamp_obj.strftime("%H:%M:%S")
            except ValueError:
                hour_minutes_seconds = "N/A"
                
            # Formater le corps de l'e-mail
            email_body = f"""Dear Administrator,

This email is to inform you about the latest problem detected in our Zabbix monitoring system.

Problem Details:
Timestamp: {hour_minutes_seconds}

Severity: {severity} (Moderate)
Host: {host}
Description: {description}


Please take appropriate actions to investigate and resolve this issue promptly.

Thank you.
"""
            
            # Envoyer l'email
            send_email(
                subject="Latest Zabbix Alert Problem",
                body=email_body,
                to=EMAIL_ADMIN
            )

            return latest_problem
        else:
            raise HTTPException(status_code=404, detail="No problems found")
    except exceptions.NotFoundError:
        raise HTTPException(status_code=404, detail="Index not found")
    except Exception as e:
        logger.error(f"Error retrieving latest problem: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8002)  # Changer le port ici à 8002
