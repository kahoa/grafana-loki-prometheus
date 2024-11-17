## 1. Schritt: Einrichten der EC2-Instanzen //erledigt mit Repo https://github.com/tarasowski/grafana-tutorials/blob/main/*intro.md
- Erstelle zwei EC2-Instanzen, eine für Grafana, eine für die Anwendung (mit Loki und Promtail).
- Erstelle eine dritte EC2-Instanz für Prometheus.
- Alle sollen ein Ubuntu Image verwenden.
### Grafana //erledigt mit Repo https://github.com/tarasowski/grafana-tutorials/blob/main/*intro.md
- Erstelle eine EC2-Instanz mit einem Ubuntu Image.
- Installiere Grafana auf der Instanz.
Grafana Install
```
#!/bin/bash
sudo apt-get update
sudo apt-get upgrade -yS
sudo apt-get install -y software-properties-common wget
sudo add-apt-repository "deb https://packages.grafana.com/oss/deb stable main"
wget -q -O - https://packages.grafana.com/gpg.key | sudo apt-key add -
sudo apt-get update
sudo apt-get install grafana -y
sudo apt-get update
sudo systemctl start grafana-server
sudo systemctl enable grafana-server
```
- Öffne den Port 3000 für die Grafana-Oberfläche.
- Erstelle eine Security Group, die den Port 3000 freigibt.
- Starte Grafana und öffne die Oberfläche im Browser (public-ip:3000).
### Anwendung //erledigt mit Repo https://github.com/tarasowski/grafana-tutorials/blob/main/*intro.md
- Erstelle eine EC2-Instanz mit einem Ubuntu Image.
- Installiere Loki und Promtail auf der Instanz.
- Installiere nodejs und npm. 
- Kopiere die Anwendung auf die EC2-Instanz
- Erstelle ein neues Node-Projekt und installiere die Abhängigkeiten.
- Starte die Anwendung mit `node app.js`.
- Öffne den Port 3000 für die Anwendung.
- Erstelle eine Security Group, die den Port 3000 freigibt.
### Prometheus
- Erstelle eine EC2-Instanz mit einem Ubuntu Image.
- Installiere Prometheus auf der Instanz.
- Öffne den Port 9090 für die Prometheus-Oberfläche.
- Erstelle eine Security Group, die den Port 9090 freigibt.
- Konfiguriere Prometheus, um die Metriken der Anwendung zu sammeln. Nutze die `prometheus.yml` Datei.
- Starte die Anwendung und überprüfe, ob die Metriken in Prometheus angezeigt werden (`prometheus --config.file=prometheus.yml`)
- Starte Prometheus und öffne die Oberfläche im Browser (public-ip:9090).
### Loki und Promtail
- Installiere Loki und Promtail auf der Anwendung-Instanz.
- Öffne den Port 3100 für die Loki-Oberfläche.
- Konfiguriere Promtail, um die Logs der Anwendung zu sammeln. Nutze die `promtail.yml` Datei.
- Starte Promtail und überprüfe, ob die Logs in Loki angezeigt werden (`promtail --config.file=promtail.yml`)
- Starte Loki und öffne die Oberfläche im Browser (public-ip:3100).
## 2. Schritt: Einrichten von Grafana
- Öffne die Grafana-Oberfläche im Browser (public-ip:3000).
- Logge dich mit den Standard-Anmeldedaten ein (admin:admin).
- Füge Prometheus als Datenquelle hinzu. Nutze die URL `http://prometheus-public-ip:9090`.
- Richte ein Dashboard ein, um die Metriken der Anwendung anzuzeigen.
- Füge Loki als Datenquelle hinzu. Nutze die URL `http://loki-public-ip:3100`. (das ist die Anwendungsinstanz)
- Richte ein Dashboard ein, um die Logs der Anwendung anzuzeigen.
- Speichere das Dashboard und überprüfe, ob die Metriken und Logs korrekt angezeigt werden.
## 3. Schritt: Testen der Anwendung
